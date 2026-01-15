"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Timer, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface TimeSavedBadgeProps {
    minutesSaved: number;
    className?: string;
}

export const TimeSavedBadge = ({ minutesSaved, className }: TimeSavedBadgeProps) => {
    const hours = Math.floor(minutesSaved / 60);
    const remainingMinutes = minutesSaved % 60;

    const label = hours > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${remainingMinutes} phút`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
                "inline-flex items-center gap-3 px-6 py-3 rounded-full card-glass border-accent/20 bg-accent/5",
                "shadow-xl shadow-accent/5",
                className
            )}
        >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                <Timer size={18} />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold text-accent/80 leading-none mb-1">
                    Thời gian đã tiết kiệm
                </span>
                <span className="text-lg font-bold text-slate-900 leading-none">
                    {label}
                </span>
            </div>
            <div className="ml-2 pl-4 border-l border-accent/20 text-accent">
                <CheckCircle size={20} />
            </div>
        </motion.div>
    );
};
