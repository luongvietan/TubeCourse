import Link from "next/link";
import { Play } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                            <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="text-xl font-semibold">TubeCourse</span>
                    </Link>

                    {/* Tagline */}
                    <div className="max-w-md">
                        <h1 className="text-display mb-6">
                            Transform YouTube Playlists into Structured Courses
                        </h1>
                        <p className="text-lg opacity-80">
                            AI-powered summaries, key insights, and structured learning paths from any YouTube playlist.
                        </p>
                    </div>

                    {/* Testimonial */}
                    <div className="max-w-md">
                        <blockquote className="text-lg opacity-90 mb-4">
                            &ldquo;TubeCourse cut my learning time in half. The AI summaries are incredibly accurate.&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/20" />
                            <div>
                                <p className="font-medium">Sarah Chen</p>
                                <p className="text-sm opacity-60">Software Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
                {/* Mobile Logo */}
                <div className="lg:hidden mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                            <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="text-xl font-semibold">TubeCourse</span>
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
