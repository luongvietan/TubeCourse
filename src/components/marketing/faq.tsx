"use client";

import { useState } from "react";

const faqs = [
    {
        question: "What types of playlists work best?",
        answer: "TubeCourse works with any educational or instructional playlist. Programming tutorials, language courses, business lessons work best. We support playlists with up to 200 videos.",
    },
    {
        question: "How accurate are the AI summaries?",
        answer: "Our AI achieves 95%+ accuracy using advanced language models trained on educational content. We extract transcripts directly and cross-reference key concepts.",
    },
    {
        question: "Can I customize the content?",
        answer: "Yes. Regenerate with different focus areas (beginner, technical, exam prep), edit chapter titles, add notes, and reorganize modules as needed.",
    },
    {
        question: "How long does processing take?",
        answer: "A typical 20-video playlist takes 2-5 minutes. Larger playlists (100+ videos) may take up to 15 minutes. You'll get an email when ready.",
    },
    {
        question: "Can I export my courses?",
        answer: "Pro users can export as PDF, Anki-compatible flashcards, or markdown. You can also share courses via unique links.",
    },
    {
        question: "Is there a limit on playlists?",
        answer: "Free: 3 playlists/month. Pro: unlimited. Team plans include shared limits across all members.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="section-padding bg-surface">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Header - Left side */}
                    <div className="lg:col-span-4">
                        <span className="tag tag-muted mb-4">
                            FAQ
                        </span>
                        <h2 className="text-headline mb-4">
                            Common questions
                        </h2>
                        <p className="text-body">
                            Everything you need to know about TubeCourse.
                        </p>
                    </div>

                    {/* Questions - Right side */}
                    <div className="lg:col-span-8 space-y-2">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border-b border-border"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between py-5 text-left"
                                >
                                    <span className="font-medium pr-4">{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === index ? "rotate-45" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
                                    </svg>
                                </button>

                                {openIndex === index && (
                                    <div className="pb-5">
                                        <p className="text-caption leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
