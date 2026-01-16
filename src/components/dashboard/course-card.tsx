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
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface CourseCardProps {
    course: Course;
}

const statusConfig: Record<CourseStatus, { icon: React.ElementType; color: string; label: string }> = {
    pending: { icon: Clock, color: "text-text-sub", label: "Pending" },
    processing: { icon: Loader2, color: "text-text-main", label: "Processing" },
    completed: { icon: CheckCircle2, color: "text-text-main", label: "Completed" },
    failed: { icon: AlertCircle, color: "text-destructive", label: "Failed" },
};

export function CourseCard({ course }: CourseCardProps) {
    const status = statusConfig[course.status];
    const StatusIcon = status.icon;
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

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
        <SpotlightCard className="group h-full bg-white border border-text-main/5 relative overflow-hidden rounded-[2.5rem] hover:shadow-2xl transition-all duration-700">
            <Link href={`/dashboard/courses/${course.id}`} className="block h-full">
                {/* Thumbnail Area */}
                <div className="relative aspect-video overflow-hidden">
                    {thumbnailUrl ? (
                        <div className="w-full h-full relative group-hover:grayscale-0 grayscale transition-all duration-1000 ease-soft">
                            <Image
                                src={thumbnailUrl}
                                alt={course.title}
                                fill
                                className="object-cover transition-transform duration-[2s] ease-soft group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-text-main/5 group-hover:bg-transparent transition-colors duration-1000" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-text-main/5">
                            <Play className="w-12 h-12 text-text-main/10" />
                        </div>
                    )}

                    {/* Overlay Hint */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-text-main/20 backdrop-blur-[2px]">
                        <div className="w-16 h-16 rounded-full bg-bg-main/90 border border-text-main/10 flex items-center justify-center text-text-main scale-50 group-hover:scale-100 transition-transform duration-700 ease-soft">
                            <Play size={20} className="fill-text-main ml-1" />
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 z-20">
                        <div className="px-4 py-1.5 rounded-full bg-bg-main/90 backdrop-blur-md border border-text-main/10 flex items-center gap-2 shadow-xl">
                            <StatusIcon size={12} className={`${course.status === "processing" ? "animate-spin" : ""} ${status.color}`} />
                            <span className="text-[0.55rem] font-extrabold uppercase tracking-[0.2em] text-text-main">{status.label}</span>
                        </div>
                    </div>

                    <div className="scan absolute inset-0 opacity-[0.03] pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="story-line w-px h-8 absolute left-0 top-1/2 -translate-y-1/2 opacity-10 group-hover:h-12 transition-all duration-500" />

                    <h3 className="font-jp font-medium text-xl text-text-main line-clamp-2 leading-tight group-hover:italic transition-all duration-700 mb-4 group-hover:pl-2">
                        {course.title}
                    </h3>

                    <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.3em] text-text-sub/40 mb-6 group-hover:text-text-sub transition-colors">{course.channel_name}</p>

                    <div className="flex items-center gap-8 border-t border-text-main/5 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-text-main/5 flex items-center justify-center border border-text-main/5">
                                <VideoIcon size={12} className="text-text-main/40" />
                            </div>
                            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-sub/60">{course.video_count} Arch.</span>
                        </div>
                        {course.total_duration && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-text-main/5 flex items-center justify-center border border-text-main/5">
                                    <Clock size={12} className="text-text-main/40" />
                                </div>
                                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-sub/60">{course.total_duration}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            {/* Actions Menu */}
            <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                        <button className="h-10 w-10 rounded-full bg-bg-main/90 border border-text-main/20 text-text-main flex items-center justify-center hover:bg-text-main hover:text-bg-main transition-all shadow-xl active:scale-90">
                            <MoreVertical size={16} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()} className="rounded-2xl border-text-main/10 bg-bg-main/95 backdrop-blur-md p-2 shadow-2xl min-w-[160px]">
                        <DropdownMenuItem
                            className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer rounded-xl px-4 py-3 transition-all"
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            <Trash size={14} className="mr-3" />
                            {isPending ? "..." : "Delete Course"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </SpotlightCard>
    );
}
