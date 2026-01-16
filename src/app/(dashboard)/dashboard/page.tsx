import { Metadata } from "next";
import { BookOpen, Video, Clock, TrendingUp } from "lucide-react";
import { DashboardHeader, StatsCard, PlaylistInput, CourseCard } from "@/components/dashboard";
import { getCourses, getDashboardStats } from "../actions";

export const metadata: Metadata = {
    title: "Dashboard - TubeCourse",
    description: "Your TubeCourse dashboard",
};

export default async function DashboardPage() {
    // Fetch real data from Supabase
    const [courses, stats] = await Promise.all([
        getCourses(),
        getDashboardStats(),
    ]);

    // Get recent courses (last 3)
    const recentCourses = courses.slice(0, 3);

    // Calculate completion rate
    const completionRate = stats.totalCourses > 0
        ? Math.round((stats.completedCourses / stats.totalCourses) * 100)
        : 0;

    return (
        <div className="bg-bg-main min-h-screen relative overflow-hidden">
            <DashboardHeader title="ARCHIVES" description="The repository of your intellectual progress." />

            <div className="p-8 md:p-12 lg:p-16 space-y-20 max-w-[1600px] mx-auto">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatsCard
                        title="ARCHIVES"
                        value={stats.totalCourses}
                        icon={BookOpen}
                    />
                    <StatsCard
                        title="EXTRACTS"
                        value={stats.videosSummarized}
                        icon={Video}
                    />
                    <StatsCard
                        title="SYNCED"
                        value={stats.completedCourses}
                        icon={Clock}
                        description="Completed"
                    />
                    <StatsCard
                        title="SIGNAL"
                        value={`${completionRate}%`}
                        icon={TrendingUp}
                    />
                </div>

                {/* Add Playlist */}
                <div className="relative">
                    <div className="story-line w-px h-12 absolute left-1/2 -top-12 opacity-5 hidden lg:block" />
                    <PlaylistInput />
                </div>

                {/* Recent Courses */}
                <div className="relative">
                    <div className="flex items-end justify-between mb-12 border-b border-text-main/5 pb-8">
                        <div className="relative">
                            <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.6em] text-text-sub/40 mb-2 block">LATELY</span>
                            <h2 className="font-jp font-medium text-4xl text-text-main italic tracking-tight">Active Transcripts</h2>
                            <div className="story-line w-24 h-px absolute -bottom-8 left-0" />
                        </div>
                    </div>

                    {recentCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {recentCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-text-main/5 rounded-[3rem] p-24 text-center relative overflow-hidden group shadow-sm hover:border-text-main/10 transition-all duration-700">
                            <div className="relative z-10 max-w-sm mx-auto">
                                <div className="w-20 h-20 bg-text-main/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-text-main group-hover:text-bg-main transition-all duration-700 shadow-xl border border-text-main/5 group-hover:rotate-[360deg]">
                                    <BookOpen size={28} />
                                </div>
                                <h3 className="font-jp font-medium text-3xl text-text-main mb-6 italic">Silence in the archives</h3>
                                <p className="text-text-sub/60 text-[0.95rem] font-jp leading-relaxed italic">
                                    The library is currently vacant. Initiate a new extraction above to begin documenting your journey.
                                </p>
                            </div>

                            {/* Decorations */}
                            <div className="story-line h-px w-32 top-1/2 left-0 opacity-[0.05]" />
                            <div className="story-line h-px w-32 top-1/2 right-0 opacity-[0.05]" />
                            <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
                        </div>
                    )}
                </div>
            </div>

            {/* Global Decor */}
            <div className="scan absolute inset-0 opacity-[0.02] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-full noise-bg opacity-[0.03] pointer-events-none z-50" />
        </div>
    );
}
