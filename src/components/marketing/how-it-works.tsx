"use client";

const steps = [
    {
        number: "01",
        title: "Paste link",
        description: "Drop any YouTube playlist URL",
    },
    {
        number: "02",
        title: "AI analyzes",
        description: "Transcription, structure, key points",
    },
    {
        number: "03",
        title: "Start learning",
        description: "Summaries, quizzes, notes ready",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <div className="max-w-xl mb-16">
                    <span className="tag tag-secondary mb-4">
                        How it works
                    </span>
                    <h2 className="text-headline">
                        Three steps to structured learning
                    </h2>
                </div>

                {/* Horizontal Timeline */}
                <div className="relative">
                    {/* Connecting line - desktop only */}
                    <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Step number */}
                                <div className="relative z-10 w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6">
                                    <span className="text-2xl font-light text-muted-foreground">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="text-title mb-2">{step.title}</h3>
                                <p className="text-caption">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Demo area */}
                <div className="mt-16 p-8 bg-surface rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-border" />
                            <div className="w-3 h-3 rounded-full bg-border" />
                            <div className="w-3 h-3 rounded-full bg-border" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-10 px-4 bg-card rounded-md border border-border flex items-center">
                            <span className="text-sm text-muted-foreground font-mono">
                                youtube.com/playlist?list=PLxxx...
                            </span>
                        </div>
                        <button className="btn-primary px-6">
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
