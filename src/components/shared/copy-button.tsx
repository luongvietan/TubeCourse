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
            className={`inline-flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground ${className}`}
            title="Copy to clipboard"
        >
            {isCopied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
    );
}
