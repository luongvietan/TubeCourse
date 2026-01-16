"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    gradient?: boolean;
}

export const GlassCard = ({
    children,
    className,
    gradient = false,
    ...props
}: GlassCardProps) => {
    return (
        <div
            className={cn(
                "card-glass",
                gradient && "bg-gradient-to-br from-white/40 to-white/10 dark:from-slate-900/40 dark:to-slate-900/10",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
