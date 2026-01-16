"use client";

import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Magnetic } from "@/components/ui/magnetic";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "forever",
        description: "For casual learners starting their journey.",
        features: [
            "3 playlists / month",
            "Basic AI summaries",
            "Key takeaways",
        ],
        cta: "Get started",
        highlighted: false,
    },
    {
        name: "Pro",
        price: "$19",
        period: "/ month",
        description: "For serious learners who want the best.",
        features: [
            "Unlimited playlists",
            "Advanced AI summaries",
            "Auto quizzes & flashcards",
            "Export to PDF & Notion",
            "Priority support",
        ],
        cta: "Start free trial",
        highlighted: true,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 px-6 relative bg-bg-main overflow-hidden">
            <div className="story-line h-full top-0 left-1/2 -translate-x-1/2 opacity-30" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-text-sub mb-3 block">Pricing</span>
                    <h2 className="text-3xl md:text-4xl font-jp font-medium leading-[1.4] text-text-main">
                        Simple, transparent<br />for every learner
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <SpotlightCard
                            key={index}
                            className={cn(
                                "flex flex-col p-8 md:p-12 rounded-2xl border transition-all duration-700",
                                plan.highlighted
                                    ? "bg-text-main text-bg-main border-transparent shadow-2xl scale-[1.02] z-10"
                                    : "bg-white text-text-main border-text-main/5"
                            )}
                        >
                            <div className="mb-8">
                                <h3 className="text-sm uppercase tracking-[0.3em] font-bold mb-2 opacity-60">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-5xl font-jp font-medium tracking-tight">
                                        {plan.price}
                                    </span>
                                    <span className="text-sm opacity-50 font-jp">
                                        {plan.period}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed opacity-70 font-jp">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-12 flex-1">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-5 h-5 rounded-full flex items-center justify-center border",
                                            plan.highlighted ? "border-bg-main/20" : "border-text-main/10"
                                        )}>
                                            <Check className="w-3 h-3 opacity-60" />
                                        </div>
                                        <span className="text-sm font-jp opacity-80">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Magnetic>
                                <Link
                                    href="/register"
                                    className={cn(
                                        "w-full block text-center py-4 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all",
                                        plan.highlighted
                                            ? "bg-bg-main text-text-main hover:bg-white"
                                            : "bg-text-main text-bg-main hover:opacity-90"
                                    )}
                                >
                                    {plan.cta}
                                </Link>
                            </Magnetic>
                        </SpotlightCard>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-text-sub">
                        14-day money-back guarantee on all paid plans.
                    </p>
                </div>
            </div>
        </section>
    );
}
