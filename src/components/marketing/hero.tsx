"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowRight } from "lucide-react";

export function Hero() {
    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: any = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    const lineRevealVariants: any = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: {
                duration: 1.2,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="min-h-[100dvh] flex flex-col relative items-center justify-center bg-background overflow-hidden px-container">
            {/* Content Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 text-center relative w-full max-w-3xl"
            >
                {/* Hero Chip */}
                <motion.div variants={itemVariants} className="mb-8 flex justify-center">
                    <div className="px-3 py-1 border border-text-main/10 rounded-full bg-white/50 backdrop-blur-sm flex items-center gap-2 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-text-main rounded-full animate-pulse" />
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] font-medium text-text-sub">
                            YouTube → Structured Learning
                        </span>
                    </div>
                </motion.div>

                {/* Main Heading */}
                <h1 className="font-jp font-medium text-[9vw] md:text-7xl leading-tight tracking-tight text-text-main mb-8">
                    <span className="line-mask">
                        <motion.span variants={lineRevealVariants} className="block">
                            Turn any playlist
                        </motion.span>
                    </span>
                    <span className="line-mask">
                        <motion.span variants={lineRevealVariants} className="block text-text-sub">
                            into a structured
                        </motion.span>
                    </span>
                    <span className="line-mask">
                        <motion.span variants={lineRevealVariants} className="block">
                            AI-powered course.
                        </motion.span>
                    </span>
                </h1>

                {/* Subtext */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm md:text-base text-text-sub leading-loose mt-4 mb-12 font-jp max-w-xl mx-auto"
                >
                    Paste a link. Get AI summaries, chapter breakdowns, quizzes, and study notes.
                    Understand more, search less. Built for curious minds.
                </motion.p>

                {/* CTA */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <Magnetic>
                        <Link href="/register" className="btn-primary group">
                            <span className="relative z-10">Start Learning Free</span>
                            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </Link>
                    </Magnetic>
                </motion.div>
            </motion.div>

            {/* Vertical Scanline Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 w-full flex justify-center z-10"
            >
                <div className="w-px h-24 bg-text-main/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-text-main animate-[scan_2s_ease-in-out_infinite]" />
                </div>
            </motion.div>
        </section>
    );
}
