"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

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
        <section id="faq" className="py-32 px-6 relative bg-white overflow-hidden border-t border-text-main/5">
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Header */}
                    <div className="lg:col-span-4 relative">
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-text-sub mb-4 block">FAQ</span>
                        <h2 className="text-4xl md:text-6xl font-jp font-medium leading-tight text-text-main italic mb-8">
                            Distilled<br />Intel.
                        </h2>
                        <p className="text-[0.9rem] text-text-sub font-jp leading-relaxed max-w-sm opacity-60">
                            Everything you need to know about transforming noise into signal.
                        </p>

                        {/* Decor */}
                        <div className="story-line absolute -left-8 top-0 bottom-0 w-px opacity-[0.05]" />
                    </div>

                    {/* Questions */}
                    <div className="lg:col-span-8 flex flex-col pt-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="group border-b border-text-main/5"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between py-10 text-left transition-all hover:pl-4"
                                >
                                    <span className={`font-jp font-medium text-xl md:text-2xl text-text-main transition-all ${openIndex === index ? "italic" : "opacity-80 group-hover:opacity-100"}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`w-10 h-10 rounded-full border border-text-main/10 flex items-center justify-center transition-all duration-700 ${openIndex === index ? "rotate-[225deg] bg-text-main text-bg-main shadow-2xl" : "text-text-main group-hover:bg-text-main/5"}`}>
                                        <Plus className="w-5 h-5" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-10 pr-16 relative">
                                                <div className="story-line absolute left-0 top-0 bottom-10 w-px opacity-10" />
                                                <p className="pl-6 text-[0.95rem] font-jp leading-relaxed text-text-sub/80 max-w-2xl">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Visual Decor */}
            <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
        </section>
    );
}
