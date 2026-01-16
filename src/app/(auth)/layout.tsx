import Link from "next/link";
import { Play } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-bg-main relative overflow-hidden">
            {/* Background Texture */}
            <div className="noise-bg absolute inset-0 opacity-[0.03] pointer-events-none" />

            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-text-main text-bg-main relative overflow-hidden">
                <div className="relative z-10 flex flex-col justify-between p-16 w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center transition-transform group-hover:scale-110">
                            <Play className="w-4 h-4 text-text-main fill-text-main" />
                        </div>
                        <span className="text-[0.8rem] font-bold uppercase tracking-[0.3em]">TubeCourse</span>
                    </Link>

                    {/* Tagline */}
                    <div className="max-w-md">
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-bg-main/40 mb-6 block">EXPERIENCE TAIDO</span>
                        <h1 className="font-jp font-medium text-5xl leading-[1.1] mb-8 italic">
                            Transform YouTube into <br />
                            Structured Mastery.
                        </h1>
                        <p className="text-[0.85rem] font-jp opacity-60 leading-relaxed tracking-wide">
                            AI-powered synthesis, core concept extraction, and streamlined learning paths. Precision knowledge at your fingertips.
                        </p>
                    </div>

                    {/* Testimonial */}
                    <div className="max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group">
                        <div className="story-line absolute top-6 bottom-6 right-6 w-px opacity-20" />
                        <blockquote className="text-[0.9rem] font-jp opacity-90 mb-8 leading-relaxed italic">
                            &ldquo;TubeCourse cut my learning time in half. The AI summaries are incredibly accurate and the interface is pure focus.&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center text-text-main font-bold text-xs shadow-lg">
                                SC
                            </div>
                            <div>
                                <p className="text-[0.7rem] font-bold uppercase tracking-widest">Sarah Chen</p>
                                <p className="text-[0.6rem] font-bold uppercase tracking-widest opacity-40">Dev Lead @ Verve</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Decor */}
                <div className="story-line absolute top-0 bottom-0 right-20 w-px opacity-10" />
                <div className="scan absolute inset-0 opacity-5 pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 opacity-5 scale-150">
                    <Play size={400} />
                </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="flex-1 flex flex-col justify-center px-10 py-12 lg:px-24 bg-bg-main relative">
                {/* Mobile Logo */}
                <div className="lg:hidden mb-12">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-text-main flex items-center justify-center">
                            <Play className="w-4 h-4 text-bg-main fill-bg-main" />
                        </div>
                        <span className="text-[0.8rem] font-bold uppercase tracking-[0.3em] text-text-main">TubeCourse</span>
                    </Link>
                </div>

                <div className="w-full max-w-sm mx-auto">
                    {children}
                </div>

                {/* Decor */}
                <div className="story-line absolute top-0 bottom-0 left-0 w-px opacity-10 lg:hidden" />
            </div>
        </div>
    );
}
