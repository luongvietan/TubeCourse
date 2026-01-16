"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
    text: string;
    className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            toast.success("Copied to clipboard");
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-bg-main transition-all shadow-sm active:scale-90 ${className}`}
            title="Copy to clipboard"
        >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
    );
}
