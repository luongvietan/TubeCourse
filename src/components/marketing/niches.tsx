"use client";

import { Magnetic } from "@/components/ui/magnetic";

const niches = [
    { name: "Programming", highlighted: true },
    { name: "Web Development", highlighted: true },
    { name: "Data Science", highlighted: false },
    { name: "Machine Learning", highlighted: true },
    { name: "DevOps", highlighted: false },
    { name: "UI/UX Design", highlighted: false },
    { name: "Marketing", highlighted: true },
    { name: "Business", highlighted: false },
    { name: "Finance", highlighted: false },
    { name: "Photography", highlighted: true },
    { name: "Music", highlighted: false },
    { name: "Language Learning", highlighted: true },
    { name: "Science", highlighted: false },
    { name: "History", highlighted: false },
    { name: "Health & Fitness", highlighted: true },
    { name: "Personal Development", highlighted: false },
];

export function Niches() {
    return (
        <section className="py-32 px-6 relative bg-white overflow-hidden border-t border-text-main/5">
            <div className="container-custom relative z-10">
                <div className="text-center mb-20 relative">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-text-sub mb-4 block">INFINITE POSSIBILITIES</span>
                    <h2 className="text-4xl md:text-6xl font-jp font-medium leading-[1.1] text-text-main mb-8 italic">
                        Topic Agnostic Mastery.
                    </h2>
                    <p className="text-[0.85rem] text-text-sub font-jp leading-relaxed max-w-2xl mx-auto opacity-70">
                        From deep coding tutorials to ancient history lectures—if it exists on YouTube, <br />
                        we extract the core essence and transform it into a structured path.
                    </p>
                    <div className="story-line absolute left-1/2 -bottom-10 -translate-x-1/2 h-16 w-px opacity-10" />
                </div>

                <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto pt-16">
                    {niches.map((niche, index) => (
                        <Magnetic key={index}>
                            <div
                                className={`
                                    px-8 py-3.5 rounded-[2rem] text-[0.6rem] font-bold uppercase tracking-[0.25em] transition-all cursor-default border
                                    ${niche.highlighted
                                        ? "bg-text-main text-bg-main border-transparent shadow-xl"
                                        : "bg-white text-text-main border-text-main/10 hover:border-text-main/40 hover:bg-text-main/5"
                                    }
                                `}
                            >
                                {niche.name}
                            </div>
                        </Magnetic>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-text-sub/30 italic">
                        +50 more disciplines supported
                    </p>
                </div>
            </div>

            <div className="story-line absolute top-0 bottom-0 left-12 w-px opacity-[0.03]" />
            <div className="story-line absolute top-0 bottom-0 right-12 w-px opacity-[0.03]" />
        </section>
    );
}
