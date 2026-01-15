import Link from "next/link";
import { Play, Clock, Video as VideoIcon, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Course, CourseStatus } from "@/types";

interface CourseCardProps {
    course: Course;
}

const statusConfig: Record<CourseStatus, { icon: React.ElementType; color: string; label: string }> = {
    pending: { icon: Clock, color: "text-yellow-600", label: "Pending" },
    processing: { icon: Loader2, color: "text-blue-600", label: "Processing" },
    completed: { icon: CheckCircle2, color: "text-green-600", label: "Completed" },
    failed: { icon: AlertCircle, color: "text-red-600", label: "Failed" },
};

export function CourseCard({ course }: CourseCardProps) {
    const status = statusConfig[course.status];
    const StatusIcon = status.icon;

    return (
        <Link href={`/dashboard/courses/${course.id}`}>
            <div className="card overflow-hidden group cursor-pointer">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted">
                    {course.thumbnail_url ? (
                        <img
                            src={course.thumbnail_url}
                            alt={course.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Play className="w-12 h-12 text-muted-foreground" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold line-clamp-2 group-hover:text-accent transition-colors">
                            {course.title}
                        </h3>
                        <span className={`flex-shrink-0 ${status.color}`}>
                            <StatusIcon size={18} className={course.status === "processing" ? "animate-spin" : ""} />
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{course.channel_name}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <VideoIcon size={14} />
                            {course.video_count} videos
                        </span>
                        {course.total_duration && (
                            <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {course.total_duration}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
