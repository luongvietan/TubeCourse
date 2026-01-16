"use client";

import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";

const footerLinks = {
    product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "FAQ", href: "#faq" },
    ],
    company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
    ],
};

const socialLinks = [
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "GitHub", href: "https://github.com" },
];

export function Footer() {
    return (
        <footer className="py-32 px-6 bg-bg-main relative overflow-hidden border-t border-text-main/5 font-jp">
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-32">
                    {/* Brand Section */}
                    <div className="md:col-span-4 relative">
                        <Link href="/" className="inline-flex items-center gap-4 mb-10 group">
                            <div className="w-10 h-10 rounded-full bg-text-main flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg] shadow-2xl">
                                <span className="text-bg-main text-[0.6rem] font-bold tracking-widest">TC</span>
                            </div>
                            <span className="text-[0.8rem] font-bold uppercase tracking-[0.4em] text-text-main group-hover:italic transition-all">TubeCourse</span>
                        </Link>
                        <p className="text-[0.9rem] text-text-sub leading-loose max-w-xs mb-10 opacity-70">
                            The definitive environment for digital enlightenment. We distill YouTube content into pure, structured knowledge.
                        </p>
                        <div className="flex gap-8">
                            {socialLinks.map((social) => (
                                <Magnetic key={social.name}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-text-sub/40 hover:text-text-main transition-all hover:line-through"
                                    >
                                        {social.name}
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                        <div className="story-line absolute -left-8 top-0 bottom-0 w-px opacity-[0.05]" />
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24 pt-4">
                        <div>
                            <h4 className="text-[0.6rem] font-extrabold uppercase tracking-[0.4em] text-text-main mb-10">DISCOVER</h4>
                            <ul className="space-y-6">
                                {footerLinks.product.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[0.85rem] text-text-sub hover:text-text-main transition-all hover:italic hover:pl-2 inline-block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[0.6rem] font-extrabold uppercase tracking-[0.4em] text-text-main mb-10">ORGANIZATION</h4>
                            <ul className="space-y-6">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[0.85rem] text-text-sub hover:text-text-main transition-all hover:italic hover:pl-2 inline-block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-[0.6rem] font-extrabold uppercase tracking-[0.4em] text-text-main mb-10">GOVERNANCE</h4>
                            <ul className="space-y-6">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[0.85rem] text-text-sub hover:text-text-main transition-all hover:italic hover:pl-2 inline-block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-text-main/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-text-main animate-pulse" />
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-text-sub/40">
                            &copy; {new Date().getFullYear()} TUBE COURSE. MANUFACTURED FOR HIGHER LEARNING.
                        </p>
                    </div>
                    <div className="flex gap-12">
                        <Link href="mailto:hello@tubecourse.com" className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-text-sub hover:text-text-main transition-all group overflow-hidden relative">
                            <span className="relative z-10">hello@tubecourse.com</span>
                            <div className="absolute bottom-0 left-0 w-full h-px bg-text-main -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Visual Decor Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-text-main/[0.01] to-transparent pointer-events-none" />
            <div className="scan absolute inset-0 opacity-[0.02] pointer-events-none" />
            <div className="story-line absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px opacity-[0.03]" />
        </footer>
    );
}
