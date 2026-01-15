"use client";

import Link from "next/link";

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "forever",
        description: "For casual learners",
        features: [
            "3 playlists / month",
            "Basic summaries",
            "Key takeaways",
        ],
        cta: "Get started",
        highlighted: false,
    },
    {
        name: "Pro",
        price: "$19",
        period: "/ month",
        description: "For serious learners",
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

const teamPlan = {
    name: "Team",
    price: "$49",
    period: "/ month",
    description: "For organizations and learning groups",
    features: [
        "Everything in Pro",
        "5 team members",
        "Shared library",
        "Analytics",
        "Admin dashboard",
    ],
};

export function Pricing() {
    return (
        <section id="pricing" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <div className="max-w-xl mb-12">
                    <span className="tag tag-accent mb-4">
                        Pricing
                    </span>
                    <h2 className="text-headline mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-body">
                        Start free. Upgrade when you need more.
                    </p>
                </div>

                {/* Main Plans - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                                relative p-8 rounded-lg transition-all
                                ${plan.highlighted
                                    ? "bg-foreground text-background"
                                    : "bg-card border border-border"
                                }
                            `}
                        >
                            {/* Plan header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className={`text-title ${plan.highlighted ? "text-background" : ""}`}>
                                        {plan.name}
                                    </h3>
                                    {plan.highlighted && (
                                        <span className="text-xs font-medium px-2 py-0.5 bg-accent text-white rounded">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <p className={`text-sm ${plan.highlighted ? "text-background/60" : "text-muted-foreground"}`}>
                                    {plan.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <span className={`text-4xl font-semibold tracking-tight ${plan.highlighted ? "text-background" : ""}`}>
                                    {plan.price}
                                </span>
                                <span className={`text-sm ml-1 ${plan.highlighted ? "text-background/60" : "text-muted-foreground"}`}>
                                    {plan.period}
                                </span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-3">
                                        <svg
                                            className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-accent" : "text-muted-foreground"}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={`text-sm ${plan.highlighted ? "text-background/80" : "text-muted-foreground"}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                href="/register"
                                className={`
                                    block w-full text-center py-3 rounded-md font-medium transition-all text-sm
                                    ${plan.highlighted
                                        ? "bg-accent text-white hover:bg-accent-hover"
                                        : "bg-muted hover:bg-border text-foreground"
                                    }
                                `}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Team Plan - Full width */}
                <div className="p-8 rounded-lg bg-surface border border-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-title">{teamPlan.name}</h3>
                                <span className="text-2xl font-semibold tracking-tight">
                                    {teamPlan.price}
                                    <span className="text-sm font-normal text-muted-foreground">{teamPlan.period}</span>
                                </span>
                            </div>
                            <p className="text-caption mb-4">{teamPlan.description}</p>
                            <ul className="flex flex-wrap gap-x-6 gap-y-2">
                                {teamPlan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link href="/contact" className="btn-secondary whitespace-nowrap">
                            Contact sales
                        </Link>
                    </div>
                </div>

                {/* Guarantee */}
                <p className="text-center text-caption mt-8">
                    14-day money-back guarantee on all paid plans
                </p>
            </div>
        </section>
    );
}
