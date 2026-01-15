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
        <div>
            <DashboardHeader title="Dashboard" description="Welcome back! Here's an overview of your learning." />

            <div className="p-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total Courses"
                        value={stats.totalCourses}
                        icon={BookOpen}
                    />
                    <StatsCard
                        title="Videos Summarized"
                        value={stats.videosSummarized}
                        icon={Video}
                    />
                    <StatsCard
                        title="Completed"
                        value={stats.completedCourses}
                        icon={Clock}
                        description="Fully processed courses"
                    />
                    <StatsCard
                        title="Completion Rate"
                        value={`${completionRate}%`}
                        icon={TrendingUp}
                    />
                </div>

                {/* Add Playlist */}
                <PlaylistInput />

                {/* Recent Courses */}
                <div>
                    <h2 className="text-title mb-4">Recent Courses</h2>
                    {recentCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold mb-2">No courses yet</h3>
                            <p className="text-muted-foreground text-sm">
                                Add a YouTube playlist above to create your first course!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
