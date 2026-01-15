import { Play, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Video, VideoStatus } from "@/types";

interface VideoCardProps {
    video: Video;
    index: number;
    isActive?: boolean;
    onClick?: () => void;
}

const statusConfig: Record<VideoStatus, { icon: React.ElementType; color: string }> = {
    pending: { icon: Clock, color: "text-muted-foreground" },
    transcribing: { icon: Loader2, color: "text-blue-600" },
    summarizing: { icon: Loader2, color: "text-purple-600" },
    completed: { icon: CheckCircle2, color: "text-green-600" },
    failed: { icon: Clock, color: "text-red-600" },
};

export function VideoCard({ video, index, isActive, onClick }: VideoCardProps) {
    const status = statusConfig[video.status];
    const StatusIcon = status.icon;
    const isProcessing = video.status === "transcribing" || video.status === "summarizing";

    return (
        <div
            onClick={onClick}
            className={`flex gap-4 p-4 rounded-lg cursor-pointer transition-colors ${isActive ? "bg-accent/10 border border-accent" : "hover:bg-muted border border-transparent"
                }`}
        >
            {/* Index */}
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-muted-foreground">{index}</span>
            </div>

            {/* Thumbnail */}
            <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                {video.thumbnail_url ? (
                    <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-xs">
                    {video.duration}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className="font-medium line-clamp-2 mb-1">{video.title}</h4>
                {video.summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{video.summary}</p>
                )}
            </div>

            {/* Status */}
            <div className={`flex-shrink-0 ${status.color}`}>
                <StatusIcon size={20} className={isProcessing ? "animate-spin" : ""} />
            </div>
        </div>
    );
}
