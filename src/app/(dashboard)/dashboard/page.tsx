import { Metadata } from "next";
import { BookOpen, Video, Clock, TrendingUp } from "lucide-react";
import { DashboardHeader, StatsCard, PlaylistInput, CourseCard } from "@/components/dashboard";
import { Course } from "@/types";

export const metadata: Metadata = {
    title: "Dashboard - TubeCourse",
    description: "Your TubeCourse dashboard",
};

// Mock data for demonstration
const mockCourses: Course[] = [
    {
        id: "1",
        user_id: "user-1",
        playlist_id: "PLv1",
        playlist_url: "https://youtube.com/playlist?list=PLv1",
        title: "Complete React Tutorial - From Beginner to Advanced",
        description: "Learn React from scratch",
        thumbnail_url: "https://placekitten.com/640/360",
        channel_name: "Code Academy",
        channel_id: "ch1",
        video_count: 24,
        total_duration: "8h 30m",
        status: "completed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        user_id: "user-1",
        playlist_id: "PLv2",
        playlist_url: "https://youtube.com/playlist?list=PLv2",
        title: "TypeScript Masterclass 2024",
        description: "Master TypeScript",
        thumbnail_url: "https://placekitten.com/641/360",
        channel_name: "TypeScript Pro",
        channel_id: "ch2",
        video_count: 18,
        total_duration: "6h 15m",
        status: "processing",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        user_id: "user-1",
        playlist_id: "PLv3",
        playlist_url: "https://youtube.com/playlist?list=PLv3",
        title: "Next.js 14 - The Complete Guide",
        description: "Build modern web apps with Next.js",
        thumbnail_url: "https://placekitten.com/642/360",
        channel_name: "Vercel Dev",
        channel_id: "ch3",
        video_count: 32,
        total_duration: "12h 45m",
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export default function DashboardPage() {
    return (
        <div>
            <DashboardHeader title="Dashboard" description="Welcome back! Here's an overview of your learning." />

            <div className="p-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total Courses"
                        value={12}
                        icon={BookOpen}
                        trend={{ value: 20, isPositive: true }}
                    />
                    <StatsCard
                        title="Videos Summarized"
                        value={156}
                        icon={Video}
                        trend={{ value: 15, isPositive: true }}
                    />
                    <StatsCard
                        title="Hours Saved"
                        value="24h"
                        icon={Clock}
                        description="Compared to watching full videos"
                    />
                    <StatsCard
                        title="Completion Rate"
                        value="78%"
                        icon={TrendingUp}
                        trend={{ value: 5, isPositive: true }}
                    />
                </div>

                {/* Add Playlist */}
                <PlaylistInput />

                {/* Recent Courses */}
                <div>
                    <h2 className="text-title mb-4">Recent Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
