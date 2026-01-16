"use client";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Magnetic } from "@/components/ui/magnetic";

const steps = [
    {
        number: "01",
        title: "Feed the Link",
        description: "Submit any YouTube playlist URL. Our AI begins its deep analysis instantly.",
    },
    {
        number: "02",
        title: "AI Synthesis",
        description: "Transcripts are extracted, concepts connected, and a structure is born.",
    },
    {
        number: "03",
        title: "Pure Knowledge",
        description: "Your structured course is ready. Summaries, flashcards, and clarity await.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-32 px-6 relative bg-bg-main overflow-hidden border-t border-text-main/5">
            <div className="container-custom relative z-10">
                <div className="text-center mb-20 relative">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-text-sub mb-4 block">PROCESS</span>
                    <h2 className="text-4xl md:text-6xl font-jp font-medium leading-tight text-text-main italic">
                        The ritual of learning.
                    </h2>
                    <div className="story-line absolute left-1/2 -bottom-10 -translate-x-1/2 h-16 w-px opacity-10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto pt-16">
                    {steps.map((step, index) => (
                        <div key={index} className="group relative">
                            <div className="flex items-start gap-8 mb-8">
                                <span className="text-4xl font-jp font-medium text-text-main/10 transition-colors group-hover:text-text-main/100 duration-700">
                                    {step.number}
                                </span>
                                <div className="pt-2">
                                    <h3 className="text-xl font-jp font-medium text-text-main mb-6 leading-tight group-hover:italic transition-all">{step.title}</h3>
                                    <p className="text-[0.9rem] font-jp leading-relaxed text-text-sub group-hover:text-text-main/80 transition-colors">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                            {index < 2 && (
                                <div className="hidden md:block story-line absolute -right-8 top-0 bottom-0 w-px opacity-[0.05]" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Mock Input Area */}
                <div className="mt-32 max-w-4xl mx-auto relative group">
                    <div className="absolute inset-0 bg-text-main/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <SpotlightCard className="p-4 md:p-8 bg-white border border-text-main/5 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="flex-1 w-full bg-bg-main border border-text-main/5 px-8 py-5 rounded-2xl flex items-center overflow-hidden">
                            <span className="text-[0.7rem] md:text-[0.8rem] font-mono text-text-sub/40 truncate italic">
                                youtube.com/playlist?list=TRANSFORM_KNOWLEDGE...
                            </span>
                        </div>
                        <Magnetic>
                            <button className="w-full md:w-auto px-12 py-5 bg-text-main text-bg-main rounded-[2rem] text-[0.7rem] font-bold uppercase tracking-[0.3em] transition-all hover:shadow-2xl active:scale-95 group-hover:italic">
                                Generate Course
                            </button>
                        </Magnetic>
                    </SpotlightCard>
                    <div className="scan absolute inset-0 opacity-[0.02] pointer-events-none rounded-[3rem]" />
                </div>
            </div>
        </section>
    );
}
