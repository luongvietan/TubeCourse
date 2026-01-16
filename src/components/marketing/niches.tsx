"use client";

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
        <section className="section-padding bg-background">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                        All Categories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Works With Any Topic
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        From coding tutorials to cooking classes - if it&apos;s on YouTube, we can transform it.
                    </p>
                </div>

                {/* Niches Cloud */}
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {niches.map((niche, index) => (
                        <span
                            key={index}
                            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all cursor-default
                ${niche.highlighted
                                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                                    : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                                }
              `}
                        >
                            {niche.name}
                        </span>
                    ))}
                </div>

                {/* Additional Note */}
                <p className="text-center text-sm text-muted-foreground mt-8">
                    <span className="text-accent font-medium">+50 more categories</span> supported
                </p>
            </div>
        </section>
    );
}
