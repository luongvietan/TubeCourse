"use client";

import { SpotlightCard } from "@/components/ui/spotlight-card";

const portfolioItems = [
    {
        title: "Web Engineering",
        description: "45 lessons → Structured deep-dive",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        stats: "2.5K Learners",
    },
    {
        title: "Architectural ML",
        description: "32 lessons → Essential foundations",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
        stats: "1.8K Learners",
    },
    {
        title: "Interface Design",
        description: "28 lessons → Human-centric patterns",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
        stats: "3.2K Learners",
    },
];

export function Portfolio() {
    return (
        <section className="py-32 px-6 relative bg-bg-main overflow-hidden border-t border-text-main/5">
            <div className="container-custom relative z-10">
                <div className="text-center mb-24 relative">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-text-sub mb-4 block">ARTIFACTS</span>
                    <h2 className="text-4xl md:text-6xl font-jp font-medium leading-tight text-text-main italic">
                        Masterpieces in progress.
                    </h2>
                    <div className="story-line absolute left-1/2 -bottom-12 -translate-x-1/2 h-16 w-px opacity-10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {portfolioItems.map((item, index) => (
                        <div key={index} className="group relative">
                            <SpotlightCard
                                className="bg-white border border-text-main/5 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-text-main/20 hover:shadow-2xl"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-text-main/10 z-10 transition-opacity duration-700 group-hover:opacity-0" />
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-[2s] ease-soft group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="px-4 py-1.5 bg-bg-main/90 backdrop-blur-md rounded-full border border-text-main/10">
                                            <span className="text-[0.55rem] font-extrabold uppercase tracking-[0.2em] text-text-main">
                                                {item.stats}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="scan absolute inset-0 opacity-[0.05] pointer-events-none" />
                                </div>
                                <div className="p-10 relative">
                                    <div className="story-line absolute left-0 top-10 bottom-10 w-px opacity-10" />
                                    <h3 className="text-2xl font-jp font-medium text-text-main mb-4 group-hover:italic transition-all">
                                        {item.title}
                                    </h3>
                                    <p className="text-[0.8rem] font-jp font-bold uppercase tracking-widest text-text-sub/60 leading-relaxed group-hover:text-text-main/80 transition-colors">
                                        {item.description}
                                    </p>
                                </div>
                            </SpotlightCard>
                        </div>
                    ))}
                </div>

                <div className="mt-32 text-center group">
                    <div className="story-line h-12 w-px mx-auto mb-8 opacity-20 group-hover:h-24 transition-all duration-1000" />
                    <p className="text-[0.65rem] font-extrabold text-text-sub/30 uppercase tracking-[0.5em] italic">
                        Join the collective of 10,000+ creators.
                    </p>
                </div>
            </div>

            <div className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-text-main/[0.02] rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
