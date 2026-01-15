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
            className={`inline-flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground ${className}`}
            title="Share"
        >
            {isCopied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
        </button>
    );
}
