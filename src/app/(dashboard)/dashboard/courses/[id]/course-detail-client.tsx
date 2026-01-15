"use client";

import { useState } from "react";
import {
    ArrowLeft,
    Clock,
    Video as VideoIcon,
    CheckCircle2,
    ExternalLink,
    Download,
    ThumbsUp,
    ThumbsDown,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { DashboardHeader, VideoCard } from "@/components/dashboard";
import { CopyButton } from "@/components/shared/copy-button";
import { ShareButton } from "@/components/shared/share-button";
import { Course, Video } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import MarkdownRenderer from "@/components/shared/markdown-renderer";

interface CourseDetailClientProps {
    course: Course;
    videos: Video[];
}

export default function CourseDetailClient({ course, videos }: CourseDetailClientProps) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(videos[0] || null);
    const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

    const handleExport = () => {
        if (!selectedVideo?.summary) return;
        const blob = new Blob([selectedVideo.summary], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedVideo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Summary exported successfully");
    };

    const handleFeedback = (type: 'up' | 'down') => {
        setFeedback(type);
        toast.success("Thanks for your feedback!");
    };

    const completedVideos = videos.filter((v) => v.status === "completed").length;
    const progressPercentage = videos.length > 0
        ? Math.round((completedVideos / videos.length) * 100)
        : 0;

    return (
        <div>
            <DashboardHeader title={course.title} />

            <div className="p-6">
                {/* Back Link */}
                <Link
                    href="/dashboard/courses"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Courses
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Info */}
                        <Card>
                            <CardContent>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-24 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                        {course.thumbnail_url && (
                                            <img
                                                src={course.thumbnail_url}
                                                alt={course.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-1">
                                            {course.channel_name}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <VideoIcon size={14} />
                                                {course.video_count} videos
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {course.total_duration || "N/A"}
                                            </span>
                                            <span className="flex items-center gap-1 text-green-600">
                                                <CheckCircle2 size={14} />
                                                {progressPercentage}% complete
                                            </span>
                                        </div>
                                    </div>
                                    <a
                                        href={course.playlist_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary text-sm py-2 px-3"
                                    >
                                        <ExternalLink size={16} />
                                        YouTube
                                    </a>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent transition-all duration-300"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>

                                {course.description && (
                                    <p className="text-body mt-4">{course.description}</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Selected Video Summary */}
                        {selectedVideo ? (
                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-title">Video Summary</h3>
                                        <div className="flex items-center gap-2">
                                            {selectedVideo.summary && (
                                                <>
                                                    <CopyButton text={selectedVideo.summary} />
                                                    <ShareButton />
                                                    <button
                                                        onClick={handleExport}
                                                        className="btn-ghost text-sm"
                                                        title="Download Summary"
                                                    >
                                                        <Download size={16} />
                                                        Export
                                                    </button>
                                                    <div className="flex items-center gap-1 border-l pl-2 ml-1">
                                                        <button
                                                            onClick={() => handleFeedback('up')}
                                                            className={`btn-ghost p-1.5 h-8 w-8 ${feedback === 'up' ? 'text-green-600 bg-green-50' : 'text-muted-foreground'}`}
                                                            title="Helpful"
                                                        >
                                                            <ThumbsUp size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleFeedback('down')}
                                                            className={`btn-ghost p-1.5 h-8 w-8 ${feedback === 'down' ? 'text-red-600 bg-red-50' : 'text-muted-foreground'}`}
                                                            title="Not helpful"
                                                        >
                                                            <ThumbsDown size={16} />
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <h4 className="font-medium mb-2">{selectedVideo.title}</h4>
                                    {selectedVideo.summary ? (
                                        <MarkdownRenderer content={selectedVideo.summary} />
                                    ) : (
                                        <div className="p-8 text-center bg-muted/50 rounded-lg">
                                            <p className="text-muted-foreground italic">
                                                {selectedVideo.status === 'transcribing' || selectedVideo.status === 'summarizing'
                                                    ? 'Generating summary...'
                                                    : 'No summary available yet.'}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <p className="text-muted-foreground">Select a video to view its summary.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Video List */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="text-title mb-4">Videos ({videos.length})</h3>
                                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                    {videos.map((video) => (
                                        <VideoCard
                                            key={video.id}
                                            video={video}
                                            index={video.position}
                                            isActive={selectedVideo?.id === video.id}
                                            onClick={() => setSelectedVideo(video)}
                                        />
                                    ))}
                                    {videos.length === 0 && (
                                        <p className="text-center text-muted-foreground py-8">
                                            No videos found for this course.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div >
            </div >
        </div >
    );
}
