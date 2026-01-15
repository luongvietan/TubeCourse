"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("w-full max-w-2xl mx-auto", className)}
        >
            <GlassCard
                gradient
                className="p-8 md:p-10 border-accent/20 shadow-xl shadow-accent/5 overflow-hidden relative"
            >
                {/* Decorative Background Beams effect simplified for a card */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-accent mb-6">
                        <Sparkles size={20} className="animate-pulse" />
                        <span className="text-xs font-bold tracking-widest uppercase pb-0.5">The Knowledge Hook</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
                        Chỉ trong 15 giây, đây là những gì bạn cần biết:
                    </h2>

                    <div className="space-y-6 mb-10">
                        {hooks.map((hook, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (index * 0.15), duration: 0.5 }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                                    {index + 1}
                                </div>
                                <p className="text-lg text-slate-700 font-medium leading-relaxed">
                                    {hook}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={onStartLearning}
                        className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 group shadow-emerald-200/50 shadow-lg"
                    >
                        Bắt đầu học ngay
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </GlassCard>
        </motion.div>
    );
};
