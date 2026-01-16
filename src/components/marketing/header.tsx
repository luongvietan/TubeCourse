"use client";

import Link from "next/link";
import { useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-text-main/5">
            <div className="container-custom">
                <nav className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-text-main flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                            <svg
                                className="w-4 h-4 text-bg-main"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span className="font-jp font-semibold text-lg tracking-widest uppercase">TubeCourse</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Magnetic key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text-sub hover:text-text-main transition-colors px-2 py-1"
                                >
                                    {link.label}
                                </Link>
                            </Magnetic>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Magnetic>
                            <Link
                                href="/login"
                                className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text-sub hover:text-text-main transition-colors"
                            >
                                Sign in
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Link
                                href="/register"
                                className="btn-primary py-2.5 px-6"
                            >
                                Get started
                            </Link>
                        </Magnetic>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-full hover:bg-muted transition-colors text-text-main"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-text-main/5 py-8 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex flex-col gap-6 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text-sub hover:text-text-main"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 w-full pt-8 border-t border-text-main/5 items-center">
                                <Link
                                    href="/login"
                                    className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text-sub hover:text-text-main"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/register"
                                    className="btn-primary w-full text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Get started
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
