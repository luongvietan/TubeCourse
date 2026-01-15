"use client";

const portfolioItems = [
    {
        title: "Web Development Bootcamp",
        description: "45-video playlist → 8-hour structured course",
        image: "/portfolio/web-dev.jpg",
        gradient: "from-blue-500 to-purple-600",
        stats: "2,500+ enrolled",
    },
    {
        title: "Machine Learning Basics",
        description: "32-video playlist → Essential ML concepts",
        image: "/portfolio/ml.jpg",
        gradient: "from-emerald-500 to-cyan-600",
        stats: "1,800+ enrolled",
    },
    {
        title: "UI/UX Design Mastery",
        description: "28-video playlist → Complete design guide",
        image: "/portfolio/uiux.jpg",
        gradient: "from-pink-500 to-rose-600",
        stats: "3,200+ enrolled",
    },
    {
        title: "Python Programming",
        description: "50-video playlist → Beginner to Pro path",
        image: "/portfolio/python.jpg",
        gradient: "from-yellow-500 to-orange-600",
        stats: "5,100+ enrolled",
    },
    {
        title: "Digital Marketing",
        description: "38-video playlist → Growth strategies",
        image: "/portfolio/marketing.jpg",
        gradient: "from-violet-500 to-purple-600",
        stats: "1,200+ enrolled",
    },
    {
        title: "Data Science Fundamentals",
        description: "42-video playlist → Analytics mastery",
        image: "/portfolio/data.jpg",
        gradient: "from-teal-500 to-green-600",
        stats: "2,800+ enrolled",
    },
];

export function Portfolio() {
    return (
        <section className="section-padding bg-background">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                        Success Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        See What Others Have Created
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Real playlists transformed into structured learning experiences by our community.
                    </p>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioItems.map((item, index) => (
                        <div
                            key={index}
                            className="group card-framez overflow-hidden cursor-pointer"
                        >
                            {/* Image Placeholder with Gradient */}
                            <div className={`aspect-video bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Stats Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                    {item.stats}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
