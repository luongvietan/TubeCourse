"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Play,
    Clock,
    Video as VideoIcon,
    CheckCircle2,
    ExternalLink,
    Download,
} from "lucide-react";
import { DashboardHeader, VideoCard } from "@/components/dashboard";
import { Course, Video } from "@/types";

// Mock data for demonstration
const mockCourse: Course = {
    id: "1",
    user_id: "user-1",
    playlist_id: "PLv1",
    playlist_url: "https://youtube.com/playlist?list=PLv1",
    title: "Complete React Tutorial - From Beginner to Advanced",
    description:
        "This comprehensive course will take you from React beginner to advanced level. We cover everything from components, state, hooks, to advanced patterns like render props and compound components.",
    thumbnail_url: "https://placekitten.com/1280/720",
    channel_name: "Code Academy",
    channel_id: "ch1",
    video_count: 24,
    total_duration: "8h 30m",
    status: "completed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

const mockVideos: Video[] = [
    {
        id: "v1",
        course_id: "1",
        video_id: "yt-v1",
        title: "Introduction to React - What and Why",
        description: "Learn what React is and why you should use it",
        thumbnail_url: "https://placekitten.com/320/180",
        duration: "12:30",
        position: 1,
        transcript: "React is a JavaScript library...",
        summary:
            "This video introduces React as a component-based UI library. Key points: declarative syntax, virtual DOM for performance, and component reusability.",
        status: "completed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "v2",
        course_id: "1",
        video_id: "yt-v2",
        title: "Setting Up Your Development Environment",
        description: "Install Node.js and create your first React app",
        thumbnail_url: "https://placekitten.com/321/180",
        duration: "18:45",
        position: 2,
        summary:
            "Step-by-step guide to setting up React development environment using Create React App and Vite.",
        status: "completed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "v3",
        course_id: "1",
        video_id: "yt-v3",
        title: "Understanding JSX Syntax",
        description: "Deep dive into JSX",
        thumbnail_url: "https://placekitten.com/322/180",
        duration: "22:10",
        position: 3,
        summary:
            "JSX is a syntax extension that allows writing HTML-like code in JavaScript. Covers expressions, attributes, and conditional rendering.",
        status: "completed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "v4",
        course_id: "1",
        video_id: "yt-v4",
        title: "Components and Props",
        description: "Building reusable components",
        thumbnail_url: "https://placekitten.com/323/180",
        duration: "28:30",
        position: 4,
        status: "summarizing",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "v5",
        course_id: "1",
        video_id: "yt-v5",
        title: "State and Lifecycle",
        description: "Managing component state",
        thumbnail_url: "https://placekitten.com/324/180",
        duration: "35:15",
        position: 5,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export default function CourseDetailPage() {
    const params = useParams();
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(mockVideos[0]);

    const completedVideos = mockVideos.filter((v) => v.status === "completed").length;
    const progressPercentage = Math.round((completedVideos / mockVideos.length) * 100);

    return (
        <div>
            <DashboardHeader title={mockCourse.title} />

            <div className="p-6">
                {/* Back Link */}
                <Link
                    href="/dashboard/courses"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Courses
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Info */}
                        <div className="card p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-24 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                    {mockCourse.thumbnail_url && (
                                        <img
                                            src={mockCourse.thumbnail_url}
                                            alt={mockCourse.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground mb-1">
                                        {mockCourse.channel_name}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <VideoIcon size={14} />
                                            {mockCourse.video_count} videos
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {mockCourse.total_duration}
                                        </span>
                                        <span className="flex items-center gap-1 text-green-600">
                                            <CheckCircle2 size={14} />
                                            {progressPercentage}% complete
                                        </span>
                                    </div>
                                </div>
                                <a
                                    href={mockCourse.playlist_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary text-sm py-2 px-3"
                                >
                                    <ExternalLink size={16} />
                                    YouTube
                                </a>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>

                            {mockCourse.description && (
                                <p className="text-body mt-4">{mockCourse.description}</p>
                            )}
                        </div>

                        {/* Selected Video Summary */}
                        {selectedVideo && selectedVideo.summary && (
                            <div className="card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-title">Video Summary</h3>
                                    <button className="btn-ghost text-sm">
                                        <Download size={16} />
                                        Export
                                    </button>
                                </div>
                                <h4 className="font-medium mb-2">{selectedVideo.title}</h4>
                                <p className="text-body">{selectedVideo.summary}</p>
                            </div>
                        )}
                    </div>

                    {/* Video List */}
                    <div className="lg:col-span-1">
                        <div className="card p-4">
                            <h3 className="text-title mb-4">Videos ({mockVideos.length})</h3>
                            <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                {mockVideos.map((video) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        index={video.position}
                                        isActive={selectedVideo?.id === video.id}
                                        onClick={() => setSelectedVideo(video)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
