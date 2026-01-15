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
        <div className={cn("group relative py-8", className)}>
            <div className="flex items-start gap-4">
                {/* Timeline Indicator (for Tracing Beam) */}
                <div className="hidden md:flex flex-col items-center pt-1">
                    <div className="w-3 h-3 rounded-full border-2 border-accent bg-background group-hover:scale-125 transition-transform" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                            {title}
                        </h3>

                        <div className="flex items-center gap-2">
                            {timestamp && (
                                <button
                                    onClick={() => onPlay?.(timestamp)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-xs font-medium"
                                >
                                    <Play size={12} fill="currentColor" />
                                    {timestamp}
                                </button>
                            )}

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 card-glass border-white/20">
                                    <DropdownMenuItem onClick={onQuiz} className="flex items-center gap-2 cursor-pointer">
                                        <HelpCircle size={16} className="text-accent" />
                                        <span>Tạo Quiz nhanh</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={onNote} className="flex items-center gap-2 cursor-pointer">
                                        <BookMarked size={16} className="text-accent" />
                                        <span>Lưu vào ghi chú</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <GlassCard className="p-6 border-slate-200/50 shadow-sm group-hover:shadow-md transition-all duration-500">
                        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                            {content}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};
