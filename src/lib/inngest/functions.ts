import { inngest } from "./client";
import { supabaseAdmin, incrementUsage } from "@/lib/supabase/admin";
import { fetchPlaylistMetadata, fetchPlaylistVideos, fetchVideoTranscript } from "@/services/youtube/index"; // Ensure correct path
import { summarizeVideo as generateSummary } from "@/services/ai/summarize";

export const processCourse = inngest.createFunction(
    { id: "process-course" },
    { event: "course.create" },
    async ({ event, step }) => {
        const { courseId } = event.data;

        if (!courseId) return { error: "No courseId provided" };

        const course = await step.run("fetch-course-details", async () => {
            const { data, error } = await supabaseAdmin
                .from("courses")
                .select("*")
                .eq("id", courseId)
                .single();

            if (error || !data) throw new Error("Course not found");
            return data;
        });

        // Update status to processing
        await step.run("update-course-status-processing", async () => {
            await supabaseAdmin
                .from("courses")
                .update({ status: "processing" })
                .eq("id", courseId);
        });

        const metadata = await step.run("fetch-playlist-metadata", async () => {
            return await fetchPlaylistMetadata(course.playlist_id);
        });

        await step.run("update-course-metadata", async () => {
            await supabaseAdmin
                .from("courses")
                .update({
                    title: metadata.title,
                    description: metadata.description,
                    thumbnail_url: metadata.thumbnailUrl,
                    channel_name: metadata.channelTitle,
                    channel_id: metadata.channelId,
                    video_count: metadata.totalVideos,
                })
                .eq("id", courseId);
        });

        const videos = await step.run("fetch-playlist-videos", async () => {
            // Limit to 50 videos initially to be safe, or implement pagination
            return await fetchPlaylistVideos(course.playlist_id, 50);
        });

        const savedVideos = await step.run("insert-videos", async () => {
            const results = [];
            for (const video of videos) {
                // Idempotency check handled by database constraints or this check
                const { data: existing } = await supabaseAdmin
                    .from("videos")
                    .select("id")
                    .eq("course_id", courseId)
                    .eq("video_id", video.id)
                    .single();

                if (!existing) {
                    const { data } = await supabaseAdmin
                        .from("videos")
                        .insert({
                            course_id: courseId,
                            video_id: video.id,
                            title: video.title,
                            description: video.description,
                            thumbnail_url: video.thumbnailUrl,
                            position: video.position,
                            status: "pending",
                        })
                        .select("id, video_id, title") // minimal selection
                        .single();

                    if (data) results.push(data);
                } else {
                    results.push({ ...existing, video_id: video.id, title: video.title });
                }
            }
            return results;
        });

        // Fan-out: Trigger summarization for each video
        // This is much faster than processing linearly
        if (savedVideos.length > 0) {
            const events = savedVideos.map((video) => ({
                name: "video.summarize",
                data: {
                    courseId,
                    videoId: video.id,
                    youtubeVideoId: video.video_id,
                    videoTitle: video.title,
                    targetLanguage: course.target_language || 'en',
                },
            }));

            await step.sendEvent("fan-out-video-summaries", events);
        }

        // We don't mark course as completed here. 
        // It will be marked completed when the last video finishes, 
        // OR the UI can show "Processing" until 100% of videos are done.

        return { success: true, videos_count: savedVideos.length };
    }
);

export const summarizeVideo = inngest.createFunction(
    {
        id: "summarize-video",
        concurrency: {
            limit: 5, // Avoid hitting Rate Limits (OpenAI/YouTube)
        }
    },
    { event: "video.summarize" },
    async ({ event, step }) => {
        const { courseId, videoId, youtubeVideoId, videoTitle, targetLanguage } = event.data;

        await step.run("update-video-transcribing", async () => {
            await supabaseAdmin
                .from("videos")
                .update({ status: "transcribing" })
                .eq("id", videoId);
        });

        // Capture specific error message for DB
        let errorMessage = "No transcript available";

        const transcript = await step.run("fetch-transcript", async () => {
            try {
                return await fetchVideoTranscript(youtubeVideoId);
            } catch (e: any) {
                // If it's one of our typed errors, capture it
                if (e.message === 'TRANSCRIPT_AGE_RESTRICTED') {
                    errorMessage = "Video is age-restricted and requires sign-in";
                } else if (e.message === 'TRANSCRIPT_DISABLED') {
                    errorMessage = "Transcripts are disabled for this video";
                } else if (e.message) {
                    errorMessage = e.message;
                }
                return null;
            }
        });

        if (!transcript) {
            await step.run("mark-video-failed-no-transcript", async () => {
                await supabaseAdmin
                    .from("videos")
                    .update({
                        status: "failed",
                        description: errorMessage // Save the specific reason
                    })
                    .eq("id", videoId);
            });
            return { error: errorMessage };
        }

        await step.run("update-video-summarizing", async () => {
            await supabaseAdmin
                .from("videos")
                .update({ status: "summarizing", transcript: transcript }) // Optional: don't save full transcript if too huge
                .eq("id", videoId);
        });

        try {
            const summary = await step.run("generate-summary", async () => {
                return await generateSummary(transcript, videoTitle, targetLanguage || 'en');
            });

            await step.run("save-summary", async () => {
                await supabaseAdmin.from("summaries").insert({
                    video_id: videoId,
                    course_id: courseId,
                    content: summary.content,
                    key_points: summary.key_points,
                    timestamps: summary.timestamps,
                });

                await supabaseAdmin
                    .from("videos")
                    .update({
                        status: "completed",
                        summary: summary.content // Denormalize
                    })
                    .eq("id", videoId);
            });

            // TRACK USAGE
            await step.run("track-usage", async () => {
                const { data: course } = await supabaseAdmin
                    .from("courses")
                    .select("user_id")
                    .eq("id", courseId)
                    .single();

                if (course?.user_id) {
                    await incrementUsage(course.user_id, {
                        videos_summarized: 1,
                        // Estimate tokens: transcript len / 4 + summary len / 4
                        // This is a rough heuristic since we don't have exact stats from the naive AI service yet
                        tokens_used: Math.ceil((transcript.length + (summary.content?.length || 0)) / 4)
                    });
                }
            });

            // Optional: Check if all videos are complete to mark course as completed
            await step.run("check-course-completion", async () => {
                const { count } = await supabaseAdmin
                    .from("videos")
                    .select("*", { count: "exact", head: true })
                    .eq("course_id", courseId)
                    .neq("status", "completed")
                    .neq("status", "failed"); // Exclude failed ones from blocking? Or include?

                // If 0 pending/processing videos, mark course as completed
                if (count === 0) {
                    await supabaseAdmin
                        .from("courses")
                        .update({ status: "completed" })
                        .eq("id", courseId);
                }
            });

        } catch (error) {
            await step.run("mark-video-failed-error", async () => {
                await supabaseAdmin
                    .from("videos")
                    .update({ status: "failed" })
                    .eq("id", videoId);
            });
            throw error;
        }

        return { success: true, videoId };
    }
);
