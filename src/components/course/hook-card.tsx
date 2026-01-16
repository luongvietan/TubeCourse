"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HookCardProps {
    hooks: string[];
    className?: string;
    onStartLearning?: () => void;
}

export const HookCard = ({ hooks, className, onStartLearning }: HookCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn("w-full max-w-2xl mx-auto", className)}
        >
            <div className="bg-bg-main border border-text-main/10 rounded-[2.5rem] p-12 md:p-16 shadow-2xl relative overflow-hidden group">
                {/* Visual Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-text-main/5" />
                <div className="absolute top-0 left-0 h-full w-1 bg-text-main/5" />
                <div className="story-line absolute top-10 bottom-10 left-10 w-px opacity-5" />
                <div className="scan absolute inset-0 pointer-events-none opacity-5" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-text-main mb-8">
                        <Sparkles size={16} className="fill-text-main" />
                        <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase">The Knowledge Hook</span>
                    </div>

                    <h2 className="font-jp font-medium text-3xl md:text-4xl text-text-main mb-12 leading-tight">
                        Chỉ trong 15 giây, <br />
                        đây là những gì bạn cần biết:
                    </h2>

                    <div className="space-y-8 mb-16">
                        {hooks.map((hook, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (index * 0.15), duration: 0.8 }}
                                className="flex items-start gap-6 group/item"
                            >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-text-main/10 flex items-center justify-center text-text-main text-[0.65rem] font-bold group-hover/item:bg-text-main group-hover/item:text-bg-main transition-all duration-500">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <p className="text-lg text-text-main font-jp leading-relaxed">
                                    {hook}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={onStartLearning}
                        className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-4 group transition-all"
                    >
                        <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em]">Bắt đầu học ngay</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
