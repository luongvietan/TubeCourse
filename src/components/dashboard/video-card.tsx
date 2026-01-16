import { Play, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Video, VideoStatus } from "@/types";

interface VideoCardProps {
    video: Video;
    index: number;
    isActive?: boolean;
    onClick?: () => void;
}

const statusConfig: Record<VideoStatus, { icon: React.ElementType; color: string; label: string }> = {
    pending: { icon: Clock, color: "text-text-sub", label: "Pending" },
    transcribing: { icon: Loader2, color: "text-text-main", label: "Transcribing" },
    summarizing: { icon: Loader2, color: "text-text-main", label: "Summarizing" },
    completed: { icon: CheckCircle2, color: "text-text-main", label: "Completed" },
    failed: { icon: Clock, color: "text-destructive", label: "Failed" },
};

export function VideoCard({ video, index, isActive, onClick }: VideoCardProps) {
    const status = statusConfig[video.status];
    const StatusIcon = status.icon;
    const isProcessing = video.status === "transcribing" || video.status === "summarizing";

    return (
        <div
            onClick={onClick}
            className={`group flex items-center gap-6 p-6 rounded-[1.5rem] cursor-pointer transition-all duration-700 relative overflow-hidden ${isActive
                ? "bg-text-main text-bg-main shadow-2xl scale-[1.02] z-10"
                : "bg-white border border-text-main/5 hover:border-text-main/20 hover:shadow-lg"
                }`}
        >
            {/* Index/Counter */}
            <div className={`text-[0.6rem] font-extrabold uppercase tracking-[0.3em] ${isActive ? "text-bg-main/40" : "text-text-sub/30"}`}>
                {index.toString().padStart(2, '0')}
            </div>

            {/* Thumbnail */}
            <div className={`relative w-28 aspect-video rounded-xl overflow-hidden flex-shrink-0 border transition-all duration-700 ${isActive ? "border-bg-main/20 shadow-2xl" : "border-text-main/10 shadow-sm"}`}>
                {video.thumbnail_url ? (
                    <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className={`w-full h-full object-cover transition-all duration-[1.5s] ease-soft ${isActive ? "grayscale-0 scale-110" : "grayscale group-hover:grayscale-0 group-hover:scale-110"}`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-text-main/5">
                        <Play size={12} className={isActive ? "text-bg-main" : "text-text-main"} />
                    </div>
                )}
                <div className={`absolute bottom-2 right-2 px-2 py-0.5 rounded-full backdrop-blur-md text-[0.55rem] font-extrabold tracking-widest ${isActive ? "bg-bg-main/20 text-bg-main border border-bg-main/20" : "bg-black/40 text-white border border-white/10"}`}>
                    {video.duration}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className={`font-jp font-medium text-[0.7rem] md:text-[0.85rem] leading-relaxed line-clamp-2 transition-all duration-700 ${isActive ? "text-bg-main italic pl-2" : "text-text-main group-hover:text-text-main"}`}>
                    {video.title}
                </h4>
                <div className="flex items-center gap-3 mt-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${isProcessing ? "bg-text-main animate-pulse" : isActive ? "bg-bg-main" : "bg-text-main/20"}`} />
                    <span className={`text-[0.55rem] font-bold uppercase tracking-[0.2em] ${isActive ? "text-bg-main/50" : "text-text-sub/40"}`}>
                        {status.label}
                    </span>
                </div>
            </div>

            {/* Active Indicator Decor */}
            {isActive && (
                <div className="story-line absolute right-2 top-4 bottom-4 w-px opacity-20" />
            )}

            <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
        </div>
    );
}
