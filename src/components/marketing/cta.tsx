"use client";

import Link from "next/link";

export function CTA() {
    return (
        <section className="section-padding">
            <div className="container-custom">
                <div className="bg-foreground text-background rounded-xl p-12 md:p-16">
                    <div className="max-w-2xl">
                        <h2 className="text-headline text-background mb-4">
                            Ready to learn smarter?
                        </h2>
                        <p className="text-background/60 mb-8">
                            Turn any YouTube playlist into a structured course. Start for free.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <Link href="/register" className="btn-primary">
                                Get started free
                            </Link>
                            <Link href="#how-it-works" className="inline-flex items-center gap-2 text-background/80 hover:text-background transition-colors text-sm font-medium">
                                See how it works
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
