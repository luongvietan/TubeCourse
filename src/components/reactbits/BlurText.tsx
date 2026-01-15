"use client";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlurTextProps {
    text: string;
    className?: string;
    variant?: {
        hidden: { filter: string; opacity: number; y: number };
        visible: { filter: string; opacity: number; y: number };
    };
    duration?: number;
    delay?: number;
    animateBy?: 'words' | 'letters';
}

const BlurText = ({
    text,
    className,
    variant,
    duration = 1,
    delay = 0.1,
    animateBy = 'words',
}: BlurTextProps) => {
    const defaultVariants = {
        hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
        visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
    };
    const combinedVariants = variant || defaultVariants;

    if (animateBy === 'letters') {
        const letters = text.split('');
        return (
            <div className={cn("flex", className)}>
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        initial={combinedVariants.hidden}
                        animate={combinedVariants.visible}
                        transition={{ duration, delay: index * delay }}
                        className="inline-block"
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                ))}
            </div>
        );
    }

    const words = text.split(' ');
    return (
        <div className={cn("flex flex-wrap", className)}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={combinedVariants.hidden}
                    animate={combinedVariants.visible}
                    transition={{ duration, delay: index * delay }}
                    className="inline-block mr-2 last:mr-0"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
};

export default BlurText;
