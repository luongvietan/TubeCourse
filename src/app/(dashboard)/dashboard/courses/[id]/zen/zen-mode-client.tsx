"use client";

import React, { useState, useEffect } from "react";
import { Course, Video } from "@/types";
import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";
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
    const [selectedVideo] = useState<Video | null>(
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
            "This video explains how to build modern AI applications quickly.",
            "You will learn how to integrate OpenAI API into your Next.js project.",
            "Finally, you will deploy to Production in just 30 minutes.",
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
        <div className="min-h-screen bg-bg-main relative overflow-x-hidden font-jp">
            {/* Background Texture/Noise */}
            <div className="noise-bg absolute inset-0 opacity-[0.03] pointer-events-none" />

            {/* Exit Zen Mode Button */}
            <div className="fixed top-8 right-10 z-50 flex items-center gap-4">
                <button
                    onClick={toggleFullscreen}
                    className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-bg-main transition-all group active:scale-95 bg-white/50 backdrop-blur-md"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <Link
                    href={`/dashboard/courses/${course.id}`}
                    className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-bg-main transition-all active:scale-95 bg-white/50 backdrop-blur-md"
                    title="Exit Zen Mode"
                >
                    <X size={18} />
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* The Hook Card - Appears for 15s */}
                <AnimatePresence>
                    {showHook && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-text-main/10 backdrop-blur-sm"
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
                        className="container mx-auto px-6 py-24 max-w-4xl"
                    >
                        {/* Course Header */}
                        <div className="text-center mb-32 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-text-sub mb-4 block">IMMERSIVE LEARNING</span>
                                <h1 className="text-4xl md:text-6xl font-jp font-medium text-text-main mb-8 leading-tight max-w-3xl mx-auto italic">
                                    {course.title}
                                </h1>
                                <div className="flex flex-col items-center gap-10">
                                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-text-sub">
                                        Source: {course.channel_name}
                                    </p>
                                    <TimeSavedBadge minutesSaved={calculateTimeSaved()} />
                                </div>
                            </motion.div>

                            {/* Decorative Line */}
                            <div className="story-line absolute left-1/2 -bottom-20 -translate-x-1/2 h-16 w-px opacity-10" />
                        </div>

                        {/* Summary Content with Tracing Beam */}
                        <div className="relative">
                            <TracingBeam className="px-10">
                                <div className="space-y-4">
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
                                        <div className="text-center py-40 border border-text-main/5 rounded-[3rem] bg-white">
                                            <p className="text-text-sub font-jp italic text-xl tracking-widest opacity-30">
                                                {selectedVideo?.status === "completed"
                                                    ? "NO SYNTHESIS AVAILABLE"
                                                    : "SYNTHESIZING CORE CONCEPTS..."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </TracingBeam>
                        </div>

                        {/* Bottom Spacer */}
                        <div className="h-64" />
                    </motion.div>
                )}
            </div>

            <div className="story-line fixed left-1/2 top-0 bottom-0 -translate-x-1/2 w-px opacity-[0.02] pointer-events-none" />
        </div>
    );
}
