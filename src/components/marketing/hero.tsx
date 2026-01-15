"use client";

import Link from "next/link";
import BlurText from "@/components/reactbits/BlurText";
import Squares from "@/components/reactbits/Squares";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
            {/* Background Squares */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Squares
                    direction="diagonal"
                    speed={0.5}
                    squareSize={50}
                    borderColor="#333"
                    hoverFillColor="#222"
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <div className="mb-6">
                        <span className="tag tag-muted">
                            YouTube → Structured Learning
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-display mb-6">
                        <BlurText
                            text="Turn any YouTube playlist into a"
                            className="inline-block mr-2"
                            delay={0.05}
                        />
                        <span className="block text-accent">
                            <BlurText
                                text="complete course"
                                className="inline-block text-accent"
                                delay={0.05}
                            />
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-body text-lg max-w-xl mb-10">
                        Paste a playlist link. Get AI-generated summaries, chapter breakdowns,
                        quizzes, and study notes. Learn faster, not longer.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <Button asChild size="lg" className="font-medium">
                            <Link href="/register">
                                Try it free
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </Button>
                        <p className="text-caption self-center">
                            No credit card required
                        </p>
                    </div>

                    {/* Stats - Single row, subtle */}
                    <div className="mt-16 pt-8 border-t border-border">
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <div>
                                <div className="text-2xl font-semibold tracking-tight">2,400+</div>
                                <div className="text-caption">Courses created</div>
                            </div>
                            <div>
                                <div className="text-2xl font-semibold tracking-tight">12k+</div>
                                <div className="text-caption">Hours saved</div>
                            </div>
                            <div>
                                <div className="text-2xl font-semibold tracking-tight">4.9</div>
                                <div className="text-caption">Average rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
