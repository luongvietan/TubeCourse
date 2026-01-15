"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Video as VideoIcon, CheckCircle2, Loader2, AlertCircle, MoreVertical, Trash } from "lucide-react";
import { Course, CourseStatus } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteCourse } from "@/app/(dashboard)/dashboard/courses/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // Try to get higher quality thumbnail if it's a YouTube default URL
    let thumbnailUrl = course.thumbnail_url;
    if (thumbnailUrl && thumbnailUrl.includes('i.ytimg.com/vi/')) {
        thumbnailUrl = thumbnailUrl.replace(/(default|mqdefault|sddefault)\.jpg$/, "hqdefault.jpg");
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm("Are you sure you want to delete this playlist? This action cannot be undone.")) {
            startTransition(async () => {
                const result = await deleteCourse(course.id);
                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success("Playlist deleted successfully");
                    router.refresh();
                }
            });
        }
    };

    return (
        <div className="card overflow-hidden group hover:shadow-md transition-all duration-300 relative">
            <Link href={`/dashboard/courses/${course.id}`} className="block h-full">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted border-b border-border/50">
                    {thumbnailUrl ? (
                        <Image
                            src={thumbnailUrl}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/50">
                            <Play className="w-12 h-12 text-muted-foreground/20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 transform scale-90 group-hover:scale-100 transition-transform">
                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-base line-clamp-2 leading-tight group-hover:text-accent transition-colors pr-6">
                            {course.title}
                        </h3>
                        <div className={`shrink-0 pt-0.5 ${status.color}`} title={status.label}>
                            <StatusIcon size={16} className={course.status === "processing" ? "animate-spin" : ""} />
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{course.channel_name}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5">
                            <VideoIcon size={14} className="text-muted-foreground/70" />
                            {course.video_count} videos
                        </span>
                        {/* Only show duration if processing is done/has duration */}
                        {course.total_duration && (
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} className="text-muted-foreground/70" />
                                {course.total_duration}
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Actions Menu */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                        <button className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                            <MoreVertical size={16} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            <Trash size={16} className="mr-2" />
                            {isPending ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
