"use client";

import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
    return (
        <section className="py-40 px-6 relative bg-text-main overflow-hidden">
            {/* Visual Decor */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--bg-main)_1px,_transparent_1px)] bg-[size:40px_40px]" />
            <div className="scan absolute inset-0 opacity-5 pointer-events-none" />

            <div className="container-custom relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-bg-main/30 mb-8 block">CALL TO ACTION</span>
                        <h2 className="text-5xl md:text-8xl font-jp font-medium leading-[1.1] text-bg-main mb-16 italic">
                            Turn YouTube into <br />
                            Structured Knowledge.
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                            <Magnetic>
                                <Link href="/register" className="btn-primary bg-bg-main text-text-main hover:bg-white px-12 py-6 rounded-full group">
                                    <span className="text-[0.8rem] font-bold uppercase tracking-[0.3em] transition-all group-hover:italic">Initiate Learning</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="#pricing" className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-bg-main/40 hover:text-bg-main transition-all hover:line-through">
                                    Review Tiers
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Vertical Scanline Decor */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-px bg-gradient-to-t from-bg-main to-transparent opacity-20" />
            <div className="story-line absolute top-0 bottom-0 right-1/4 w-px opacity-[0.03]" />
            <div className="story-line absolute top-0 bottom-0 left-1/4 w-px opacity-[0.03]" />
        </section>
    );
}
