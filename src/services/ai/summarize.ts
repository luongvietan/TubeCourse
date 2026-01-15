import { createCompletion, AI_MODELS } from '@/lib/openrouter/client';
import type { Summary } from '@/types';
import JSON5 from 'json5';
import { z } from 'zod';

const SummarySchema = z.object({
    content: z.string(),
    key_points: z.array(z.string()).default([]),
    timestamps: z.array(z.object({
        time: z.string(),
        text: z.string()
    })).default([])
});

const SUMMARY_SYSTEM_PROMPT = (language: string) => `You are an expert AI tutor and educational content summarizer. Your goal is to help students and teachers understand the video content efficiently.

Your task is to:
1. Create a concise yet comprehensive summary of the video transcript.
2. Extract KEY LEARNING OUTCOMES: What will the student be able to do or understand?
3. Synthesize MAIN TAKEAWAYS: The core concepts explained.
4. Identify IMPORTANT TIMESTAMPS: Key moments in the video.
5. Create 3-5 REVIEW QUESTIONS: To test understanding.
6. Use clear, professional, yet accessible language suitable for learners.
7. OUTPUT IN THE FOLLOWING LANGUAGE: ${language}

Format your response as JSON with the following structure:
{
  "content": "A comprehensive markdown string containing:\n## Summary\n[Main summary text]\n\n## Key Takeaways\n- [Takeaway 1]\n- [Takeaway 2]\n\n## Review Questions\n1. [Question 1]\n2. [Question 2] (in ${language})",
  "key_points": ["Takeaway 1", "Takeaway 2", ...],
  "timestamps": [{"time": "00:00", "text": "Topic discussed"}]
}`;


// Helper to split transcript into chunks
function splitTranscript(transcript: string, maxChunkLength = 12000): string[] {
    if (transcript.length <= maxChunkLength) return [transcript];

    const chunks: string[] = [];
    let currentChunk = '';
    const sentences = transcript.split('. ');

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > maxChunkLength) {
            chunks.push(currentChunk);
            currentChunk = sentence + '. ';
        } else {
            currentChunk += sentence + '. ';
        }
    }
    if (currentChunk) chunks.push(currentChunk);

    return chunks;
}

export async function summarizeVideo(
    transcript: string,
    videoTitle: string,
    targetLanguage: string = 'English'
): Promise<Omit<Summary, 'id' | 'video_id' | 'course_id' | 'created_at' | 'updated_at'>> {
    const chunks = splitTranscript(transcript);

    // If only one chunk, proceed as normal
    if (chunks.length === 1) {
        return generateSingleSummary(chunks[0], videoTitle, targetLanguage);
    }

    // Map-Reduce for multiple chunks
    console.log(`Splitting transcript into ${chunks.length} chunks for: ${videoTitle}`);

    // Map: Summarize each chunk
    const chunkSummaries = await Promise.all(
        chunks.map(async (chunk, i) => {
            const response = await createCompletion({
                model: AI_MODELS.SUMMARY,
                messages: [
                    { role: 'system', content: 'You are summarizing a PART of a video. Focus on the key information in this segment.' },
                    {
                        role: 'user',
                        content: `Part ${i + 1}/${chunks.length} of video "${videoTitle}":\n\n${chunk}`,
                    },
                ],
                temperature: 0.3,
                max_tokens: 1000,
            });
            return response.choices[0]?.message?.content || '';
        })
    );

    // Reduce: Synthesize the chunks
    const combinedSummary = chunkSummaries.join('\n\n');
    return generateSingleSummary(combinedSummary, videoTitle, targetLanguage, true);
}

// Renamed original function to internal helper
async function generateSingleSummary(
    contentToSummarize: string,
    videoTitle: string,
    targetLanguage: string,
    isRefinement = false
): Promise<Omit<Summary, 'id' | 'video_id' | 'course_id' | 'created_at' | 'updated_at'>> {
    const systemPrompt = isRefinement
        ? SUMMARY_SYSTEM_PROMPT(targetLanguage) + "\n\nNote: You are synthesizing multiple partial summaries into one cohesive final summary."
        : SUMMARY_SYSTEM_PROMPT(targetLanguage);

    const response = await createCompletion({
        model: AI_MODELS.SUMMARY,
        messages: [
            { role: 'system', content: systemPrompt },
            {
                role: 'user',
                content: `Please summarize the following ${isRefinement ? 'content' : 'video'} titled "${videoTitle}":\n\n${contentToSummarize}`,
            },
        ],
        temperature: 0.3,
        max_tokens: 2048,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
        throw new Error('No summary generated');
    }

    try {
        // Attempt to extract JSON from markdown or raw text
        // This regex is now more permissive and looks for the first { and last }
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : content;

        // Use JSON5 for lenient parsing (comments, trailing commas, unquoted keys)
        const parsed = JSON5.parse(jsonString);

        // Validate with Zod
        const validated = SummarySchema.parse(parsed);

        return {
            content: validated.content,
            key_points: validated.key_points,
            timestamps: validated.timestamps,
        };
    } catch (e) {
        console.warn('Failed to parse JSON summary', e);
        console.warn('Raw content:', content);

        // Fallback: Return raw text as content if JSON parsing fails completely
        return {
            content: content.replace(/```json/g, '').replace(/```/g, ''),
            key_points: [],
            timestamps: [],
        };
    }
}

export async function generatePlaylistOverview(
    summaries: string[],
    playlistTitle: string
): Promise<string> {
    const response = await createCompletion({
        model: AI_MODELS.ANALYSIS,
        messages: [
            {
                role: 'system',
                content: 'You are an expert at synthesizing information from multiple video summaries into a cohesive course overview.',
            },
            {
                role: 'user',
                content: `Create a comprehensive overview for the playlist "${playlistTitle}" based on these video summaries:\n\n${summaries.join('\n\n---\n\n')}`,
            },
        ],
        temperature: 0.5,
        max_tokens: 1024,
    });

    return response.choices[0]?.message?.content || 'Overview generation failed';
}
