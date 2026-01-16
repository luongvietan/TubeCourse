"use client";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Zap, ListChecks, RefreshCw, BarChart3, Download } from "lucide-react";

const features = [
    {
        icon: <Zap className="w-4 h-4" />,
        title: "Intelligent Summaries",
        description: "Our AI extracts key concepts, creates chapter breakdowns with timestamps, and identifies the most important takeaways from each video.",
        case: "Case 01",
        large: true
    },
    {
        icon: <ListChecks className="w-4 h-4" />,
        title: "Auto Quizzes",
        description: "Generate flashcards and quizzes automatically from video content to test understanding.",
        case: "Case 02"
    },
    {
        icon: <RefreshCw className="w-4 h-4" />,
        title: "Regenerate Anytime",
        description: "Need a different focus? Regenerate with technical depth, beginner-friendly, or exam prep mode.",
        case: "Case 03"
    },
    {
        icon: <BarChart3 className="w-4 h-4" />,
        title: "Progress Tracking",
        description: "Track your learning journey with progress indicators and completion stats.",
        case: "Case 04"
    },
    {
        icon: <Download className="w-4 h-4" />,
        title: "Export Notes",
        description: "Download your course materials as PDF, Markdown, or sync with Notion.",
        case: "Case 05"
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 px-6 relative bg-muted/30">
            <div className="story-line top-0 h-full" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-text-sub mb-3 block">Features</span>
                    <h2 className="text-3xl md:text-4xl font-jp font-medium leading-[1.4] text-text-main">
                        Everything you need<br />to learn faster
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <SpotlightCard
                            key={idx}
                            className={cn(
                                "bg-white p-8 rounded-xl border border-text-main/5 transition-transform duration-500 hover:-translate-y-1",
                                feature.large ? "md:col-span-2" : ""
                            )}
                        >
                            <div className="flex items-center gap-3 mb-6 opacity-40">
                                {feature.icon}
                                <span className="text-[0.65rem] uppercase tracking-widest font-bold">{feature.case}</span>
                            </div>
                            <h3 className="text-xl font-jp font-medium mb-4 text-text-main leading-relaxed">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-text-sub leading-loose font-jp">
                                {feature.description}
                            </p>
                        </SpotlightCard>
                    ))}
                </div>

                <div className="mt-16 bg-text-main text-bg-main p-8 md:p-12 rounded-xl spotlight-card shadow-2xl">
                    <div className="md:flex md:items-center md:gap-12">
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <h3 className="text-2xl font-jp font-medium leading-relaxed">
                                Optimized for how<br />your brain learns.
                            </h3>
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-sm text-bg-main/70 leading-loose font-jp">
                                We don&apos;t just summarize. We structure the information so it sticks,
                                transforming passive watching into active learning.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { cn } from "@/lib/utils";
