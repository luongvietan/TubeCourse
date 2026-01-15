"use client";

import React, { useState, useEffect } from "react";
import { Course, Video } from "@/types";
import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { HookCard } from "@/components/course/hook-card";
import { InteractiveSummaryBlock } from "@/components/course/interactive-summary-block";
import { TimeSavedBadge } from "@/components/course/time-saved-badge";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";

interface ZenModeClientProps {
    course: Course;
    videos: Video[];
}

export default function ZenModeClient({ course, videos }: ZenModeClientProps) {
    const [showHook, setShowHook] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(
        videos.find((v) => v.status === "completed") || null
    );

    // Simulate "The Hook" appearing after 15 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHook(false);
        }, 15000); // 15 seconds

        return () => clearTimeout(timer);
    }, []);

    // Extract hooks from the first video's summary (simulated)
    const hooks = selectedVideo
        ? [
            "Video này giải thích về cách xây dựng ứng dụng AI hiện đại một cách nhanh chóng.",
            "Bạn sẽ học được cách tích hợp OpenAI API vào Next.js project.",
            "Cuối cùng, bạn sẽ deploy lên Production chỉ trong 30 phút.",
        ]
        : [];

    // Calculate time saved (simulated)
    const calculateTimeSaved = () => {
        // Assume each video is ~10 minutes, summary takes 2 minutes to read
        const totalVideoMinutes = videos.length * 10;
        const summaryMinutes = videos.length * 2;
        return totalVideoMinutes - summaryMinutes;
    };

    // Simulate parsing summary into blocks
    const parseSummaryBlocks = (summary: string | null | undefined) => {
        if (!summary) return [];

        // Split by ## headers (H2)
        const sections = summary.split(/(?=##\s)/g).filter(Boolean);

        return sections.map((section, index) => {
            const lines = section.trim().split("\n");
            const title = lines[0].replace(/^##\s*/, "").trim();
            const content = lines.slice(1).join("\n").trim();

            return {
                title,
                content,
                timestamp: `${String(index * 5).padStart(2, "0")}:00`,
            };
        });
    };

    const summaryBlocks = selectedVideo
        ? parseSummaryBlocks(selectedVideo.summary)
        : [];

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 relative overflow-x-hidden">
            {/* Background Beams Effect */}
            <BackgroundBeams className="opacity-30" />

            {/* Exit Zen Mode Button */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
                <button
                    onClick={toggleFullscreen}
                    className="p-3 rounded-full card-glass border-white/40 hover:bg-white/80 transition-all shadow-lg"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? <Minimize2 size={20} className="text-slate-700" /> : <Maximize2 size={20} className="text-slate-700" />}
                </button>
                <Link
                    href={`/dashboard/courses/${course.id}`}
                    className="p-3 rounded-full card-glass border-white/40 hover:bg-white/80 transition-all shadow-lg"
                    title="Exit Zen Mode"
                >
                    <X size={20} className="text-slate-700" />
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* The Hook Card - Appears for 15s */}
                <AnimatePresence>
                    {showHook && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, y: -50 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
                        >
                            <HookCard
                                hooks={hooks}
                                onStartLearning={() => setShowHook(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content with Tracing Beam */}
                {!showHook && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="container mx-auto px-4 py-16 max-w-5xl"
                    >
                        {/* Course Header */}
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                                    {course.title}
                                </h1>
                                <p className="text-lg text-slate-600 mb-8">
                                    {course.channel_name}
                                </p>
                                <TimeSavedBadge minutesSaved={calculateTimeSaved()} />
                            </motion.div>
                        </div>

                        {/* Summary Content with Tracing Beam */}
                        <TracingBeam className="px-6">
                            <div className="space-y-8">
                                {summaryBlocks.length > 0 ? (
                                    summaryBlocks.map((block, index) => (
                                        <InteractiveSummaryBlock
                                            key={index}
                                            title={block.title}
                                            content={block.content}
                                            timestamp={block.timestamp}
                                            onPlay={(time) => console.log("Play at:", time)}
                                            onQuiz={() => console.log("Create quiz for:", block.title)}
                                            onNote={() => console.log("Save note for:", block.title)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-20">
                                        <p className="text-slate-500 italic">
                                            {selectedVideo?.status === "completed"
                                                ? "No summary content available yet."
                                                : "Summary is being generated..."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TracingBeam>

                        {/* Bottom Spacer */}
                        <div className="h-32" />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
