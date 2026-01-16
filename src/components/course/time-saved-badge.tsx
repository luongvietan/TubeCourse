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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
                "inline-flex items-center gap-5 px-8 py-4 rounded-2xl bg-white border border-text-main/10 shadow-sm",
                className
            )}
        >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-text-main flex items-center justify-center text-bg-main shadow-lg transition-transform hover:scale-110">
                <Timer size={18} />
            </div>
            <div className="flex flex-col">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-text-sub leading-none mb-1.5">
                    TIME SAVED
                </span>
                <span className="text-xl font-jp font-medium text-text-main leading-none">
                    {label}
                </span>
            </div>
            <div className="ml-4 pl-6 border-l border-text-main/5 text-text-main opacity-20">
                <CheckCircle size={20} />
            </div>
        </motion.div>
    );
};
