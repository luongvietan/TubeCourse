import { Metadata } from "next";
import { DashboardHeader, CourseCard } from "@/components/dashboard";
import { Course } from "@/types";

export const metadata: Metadata = {
    title: "Courses - TubeCourse",
    description: "Your courses on TubeCourse",
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
    {
        id: "4",
        user_id: "user-1",
        playlist_id: "PLv4",
        playlist_url: "https://youtube.com/playlist?list=PLv4",
        title: "Node.js Backend Development",
        description: "Build scalable backend apps",
        thumbnail_url: "https://placekitten.com/643/360",
        channel_name: "Backend Masters",
        channel_id: "ch4",
        video_count: 28,
        total_duration: "10h 20m",
        status: "completed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "5",
        user_id: "user-1",
        playlist_id: "PLv5",
        playlist_url: "https://youtube.com/playlist?list=PLv5",
        title: "CSS Animation Fundamentals",
        description: "Create stunning animations",
        thumbnail_url: "https://placekitten.com/644/360",
        channel_name: "Design School",
        channel_id: "ch5",
        video_count: 15,
        total_duration: "4h 45m",
        status: "completed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "6",
        user_id: "user-1",
        playlist_id: "PLv6",
        playlist_url: "https://youtube.com/playlist?list=PLv6",
        title: "Database Design with PostgreSQL",
        description: "Master database design",
        thumbnail_url: "https://placekitten.com/645/360",
        channel_name: "DB Academy",
        channel_id: "ch6",
        video_count: 20,
        total_duration: "7h 10m",
        status: "failed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export default function CoursesPage() {
    return (
        <div>
            <DashboardHeader
                title="My Courses"
                description="Manage your YouTube playlist courses"
                showAddButton
            />

            <div className="p-6">
                {/* Filters */}
                <div className="flex items-center gap-4 mb-6">
                    <button className="tag tag-accent">All</button>
                    <button className="tag tag-muted">Completed</button>
                    <button className="tag tag-muted">Processing</button>
                    <button className="tag tag-muted">Pending</button>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                {/* Empty State */}
                {mockCourses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">No courses yet</p>
                        <p className="text-sm text-muted-foreground">
                            Add a YouTube playlist URL to create your first course
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
