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
        <div className="bg-bg-main min-h-screen relative overflow-hidden">
            <DashboardHeader title="COURSE" description={course.title} />

            <div className="p-8 md:p-12 lg:p-16 max-w-[1600px] mx-auto">
                {/* Back Link */}
                <Link
                    href="/dashboard"
                    className="group inline-flex items-center gap-4 mb-16"
                >
                    <div className="w-10 h-10 rounded-full border border-text-main/10 flex items-center justify-center transition-all group-hover:bg-text-main group-hover:text-bg-main shadow-sm group-hover:rotate-[-45deg]">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.4em] text-text-sub group-hover:text-text-main transition-colors italic">Back to Archives</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Course Overview Card */}
                        <div className="bg-white border border-text-main/5 rounded-[2.5rem] p-12 relative overflow-hidden group shadow-sm hover:border-text-main/10 transition-all duration-700">
                            <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                                <div className="w-full md:w-56 aspect-video rounded-2xl overflow-hidden border border-text-main/10 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-soft relative">
                                    {course.thumbnail_url && (
                                        <img
                                            src={course.thumbnail_url}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-transform duration-[2s] ease-soft group-hover:scale-110"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-text-main/5 group-hover:bg-transparent transition-colors duration-1000" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.5em] text-text-sub/40 group-hover:text-text-sub/80 transition-colors italic">{course.channel_name}</span>
                                    </div>
                                    <h2 className="font-jp font-medium text-4xl text-text-main mb-8 leading-tight italic tracking-tight">{course.title}</h2>

                                    <div className="flex flex-wrap items-center gap-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-text-main/5 border border-text-main/5 flex items-center justify-center">
                                                <VideoIcon size={14} className="text-text-main/40" />
                                            </div>
                                            <span className="text-[0.6rem] font-extrabold uppercase tracking-widest text-text-main">{course.video_count} LESSONS</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-text-main/5 border border-text-main/5 flex items-center justify-center">
                                                <Clock size={14} className="text-text-main/40" />
                                            </div>
                                            <span className="text-[0.6rem] font-extrabold uppercase tracking-widest text-text-main">{course.total_duration || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-text-main/5 border border-text-main/5 flex items-center justify-center">
                                                <CheckCircle2 size={14} className="text-text-main/40" />
                                            </div>
                                            <span className="text-[0.6rem] font-extrabold uppercase tracking-widest text-text-main">{progressPercentage}% SYNCED</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:flex-col gap-4 w-full md:w-auto mt-8 md:mt-0">
                                    <Link
                                        href={`/dashboard/courses/${course.id}/zen`}
                                        className="btn-primary flex-1 md:flex-none py-4 px-8 text-[0.65rem] font-bold uppercase tracking-[0.3em] overflow-hidden group shadow-2xl"
                                    >
                                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        <span className="relative z-10">🧘 ENTER ZEN</span>
                                    </Link>
                                    <a
                                        href={course.playlist_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary flex-1 md:flex-none py-4 px-8 text-[0.65rem] font-bold uppercase tracking-[0.3em] justify-center bg-transparent border border-text-main/10 hover:border-text-main/30"
                                    >
                                        <ExternalLink size={16} />
                                        SOURCE
                                    </a>
                                </div>
                            </div>

                            {/* Minimal Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-text-main/5 overflow-hidden">
                                <div
                                    className="h-full bg-text-main transition-all duration-[2s] ease-soft shadow-[0_0_10px_rgba(34,32,29,0.3)]"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>

                            <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
                        </div>

                        {/* Summary Viewport */}
                        {selectedVideo ? (
                            <div className="bg-white border border-text-main/5 rounded-[3rem] p-12 md:p-16 relative overflow-hidden group min-h-[700px] shadow-sm hover:border-text-main/10 transition-all duration-700">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16 relative z-10 border-b border-text-main/5 pb-12">
                                    <div className="max-w-xl">
                                        <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.5em] text-text-sub/40 italic mb-3 block">DISTILLED INTELLIGENCE</span>
                                        <h3 className="font-jp font-medium text-3xl md:text-4xl text-text-main mt-2 leading-tight italic tracking-tight">{selectedVideo.title}</h3>
                                        <div className="story-line w-24 h-px mt-8 opacity-20" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {selectedVideo.summary && (
                                            <>
                                                <CopyButton text={selectedVideo.summary} />
                                                <ShareButton />
                                                <button
                                                    onClick={handleExport}
                                                    className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-bg-main transition-all shadow-sm active:scale-90"
                                                    title="Export"
                                                >
                                                    <Download size={16} />
                                                </button>
                                                <div className="flex items-center gap-2 border-l border-text-main/10 pl-6 ml-2">
                                                    <button
                                                        onClick={() => handleFeedback('up')}
                                                        className={`w-12 h-12 rounded-full transition-all flex items-center justify-center shadow-lg active:scale-90 ${feedback === 'up' ? 'bg-text-main text-bg-main' : 'bg-bg-main border border-text-main/5 text-text-sub hover:text-text-main hover:border-text-main/20'}`}
                                                    >
                                                        <ThumbsUp size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleFeedback('down')}
                                                        className={`w-12 h-12 rounded-full transition-all flex items-center justify-center shadow-lg active:scale-90 ${feedback === 'down' ? 'bg-destructive text-white' : 'bg-bg-main border border-text-main/5 text-text-sub hover:text-destructive hover:border-destructive/20'}`}
                                                    >
                                                        <ThumbsDown size={16} />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="prose prose-stone prose-lg max-w-none text-text-main/90 font-jp leading-relaxed relative z-10 prose-headings:font-medium prose-headings:italic prose-headings:font-jp prose-p:leading-loose">
                                    {selectedVideo.summary ? (
                                        <MarkdownRenderer content={selectedVideo.summary} />
                                    ) : (
                                        <div className="py-40 text-center flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 border-2 border-text-main/5 border-t-text-main rounded-full animate-spin mb-10" />
                                            <p className="text-text-sub/60 font-jp italic text-xl tracking-wide max-w-sm mx-auto leading-relaxed">
                                                {selectedVideo.status === 'transcribing' || selectedVideo.status === 'summarizing'
                                                    ? 'Our neural engine is currently distilling the core insights from this source...'
                                                    : 'No analytical intelligence available for this extraction yet.'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Decorations */}
                                <div className="story-line absolute left-6 h-24 top-1/2 opacity-[0.05]" />
                                <div className="story-line absolute right-6 h-24 top-1/2 opacity-[0.05]" />
                                <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
                            </div>
                        ) : (
                            <div className="bg-white border border-text-main/5 rounded-[4rem] p-48 text-center relative overflow-hidden group shadow-sm">
                                <span className="text-text-sub/20 font-jp italic text-2xl tracking-[0.4em] block group-hover:tracking-[0.6em] transition-all duration-1000">SELECT SOURCE TO ACTIVATE</span>
                                <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
                            </div>
                        )}
                    </div>

                    {/* Lesson List Column */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="flex items-end justify-between px-4 pb-6 border-b border-text-main/5">
                            <div>
                                <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.4em] text-text-sub/40 italic">EXTRACTS</span>
                                <h3 className="font-jp font-medium text-2xl text-text-main mt-2 italic">Knowledge Map</h3>
                            </div>
                            <span className="text-[0.6rem] font-extrabold text-text-main/40 uppercase tracking-widest">{videos.length} ENTRIES</span>
                        </div>
                        <div className="space-y-6 max-h-[1200px] overflow-y-auto pr-4 no-scrollbar pb-20">
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
                                <div className="py-32 text-center bg-white border border-text-main/5 rounded-[2rem] shadow-sm">
                                    <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.4em] text-text-sub/40 italic">ARCHIVE EMPTY</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Decor */}
            <div className="scan absolute inset-0 opacity-[0.02] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-full noise-bg opacity-[0.03] pointer-events-none z-50" />
        </div>
    );
}
