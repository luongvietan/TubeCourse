"use client";

import Link from "next/link";

export function Hero() {
    return (
        <section className="min-h-[90vh] flex items-center pt-24 pb-16">
            <div className="container-custom">
                <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <div className="mb-6">
                        <span className="tag tag-muted">
                            YouTube → Structured Learning
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-display mb-6">
                        Turn any YouTube playlist into a{" "}
                        <span className="text-accent">complete course</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-body text-lg max-w-xl mb-10">
                        Paste a playlist link. Get AI-generated summaries, chapter breakdowns,
                        quizzes, and study notes. Learn faster, not longer.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <Link href="/register" className="btn-primary">
                            Try it free
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <p className="text-caption">
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
