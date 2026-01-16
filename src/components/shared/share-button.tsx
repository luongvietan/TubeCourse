"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
    url?: string; // Optional: if not provided, uses current window location
    className?: string;
}

export function ShareButton({ url, className = "" }: ShareButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        const shareUrl = url || window.location.href;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsCopied(true);
            toast.success("Link copied to clipboard");
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-bg-main transition-all shadow-sm active:scale-90 ${className}`}
            title="Share"
        >
            {isCopied ? <Check size={16} /> : <Share2 size={16} />}
        </button>
    );
}
