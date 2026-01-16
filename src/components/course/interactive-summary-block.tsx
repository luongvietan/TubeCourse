"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { Clock, Play, MoreVertical, HelpCircle, BookMarked } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InteractiveSummaryBlockProps {
    title: string;
    content: string;
    timestamp?: string;
    onPlay?: (timestamp: string) => void;
    onQuiz?: () => void;
    onNote?: () => void;
    className?: string;
}

export const InteractiveSummaryBlock = ({
    title,
    content,
    timestamp,
    onPlay,
    onQuiz,
    onNote,
    className,
}: InteractiveSummaryBlockProps) => {
    return (
        <div className={cn("group relative py-12", className)}>
            <div className="flex items-start gap-8">
                {/* Timeline Indicator (for Tracing Beam) */}
                <div className="hidden md:flex flex-col items-center pt-2">
                    <div className="w-2.5 h-2.5 rounded-full border border-text-main/20 bg-bg-main group-hover:bg-text-main group-hover:scale-125 transition-all duration-500" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            {timestamp && (
                                <button
                                    onClick={() => onPlay?.(timestamp)}
                                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-text-main/5 text-text-main hover:bg-text-main hover:text-bg-main transition-all text-[0.6rem] font-bold uppercase tracking-widest border border-text-main/5"
                                >
                                    <Play size={10} fill="currentColor" />
                                    {timestamp}
                                </button>
                            )}
                            <h3 className="font-jp font-medium text-2xl text-text-main leading-tight transition-colors group-hover:text-text-main">
                                {title}
                            </h3>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="w-10 h-10 rounded-full hover:bg-text-main/5 text-text-sub hover:text-text-main flex items-center justify-center transition-all border border-transparent hover:border-text-main/10">
                                        <MoreVertical size={16} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white border border-text-main/10 rounded-2xl p-2 shadow-2xl">
                                    <DropdownMenuItem onClick={onQuiz} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-text-main/5 text-[0.65rem] font-bold uppercase tracking-widest text-text-main focus:bg-text-main focus:text-bg-main">
                                        <HelpCircle size={14} />
                                        <span>Create Insight Quiz</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={onNote} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-text-main/5 text-[0.65rem] font-bold uppercase tracking-widest text-text-main focus:bg-text-main focus:text-bg-main">
                                        <BookMarked size={14} />
                                        <span>Save to Library</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="bg-white border border-text-main/5 rounded-[2rem] p-8 md:p-10 shadow-sm group-hover:shadow-xl group-hover:border-text-main/10 transition-all duration-700 relative overflow-hidden">
                        <div className="prose prose-stone max-w-none text-text-main/80 font-jp leading-relaxed relative z-10 text-[0.95rem]">
                            {content}
                        </div>
                        <div className="story-line absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px opacity-10" />
                    </div>
                </div>
            </div>
        </div>
    );
};
