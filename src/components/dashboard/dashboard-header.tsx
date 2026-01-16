"use client";

import { Search, Bell, Plus, Menu } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/components/dashboard/sidebar-context";
import { Magnetic } from "@/components/ui/magnetic";

interface DashboardHeaderProps {
    title: string;
    description?: string;
    showAddButton?: boolean;
}

export function DashboardHeader({
    title,
    description,
    showAddButton = false,
}: DashboardHeaderProps) {
    const { toggleMobileSidebar } = useSidebar();

    return (
        <header className="sticky top-0 z-40 w-full h-24 bg-bg-main/80 backdrop-blur-md flex items-center justify-between px-8 md:px-12 overflow-hidden border-b border-text-main/5">
            <div className="flex items-center gap-8">
                {/* Mobile Toggle */}
                <button
                    onClick={toggleMobileSidebar}
                    className="md:hidden p-3 rounded-full hover:bg-text-main/5 transition-all text-text-sub active:scale-90"
                >
                    <Menu size={20} />
                </button>

                {/* Title */}
                <div className="relative">
                    <h1 className="text-2xl md:text-3xl font-jp font-medium text-text-main tracking-tight group cursor-default">
                        {title}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-text-main group-hover:w-full transition-all duration-700" />
                    </h1>
                    {description && (
                        <p className="hidden sm:block text-[0.6rem] font-bold uppercase tracking-[0.4em] text-text-sub/40 mt-2 italic">{description}</p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 md:gap-10">
                {/* Search */}
                <div className="relative hidden lg:block group">
                    <Search
                        size={14}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-text-sub/40 group-focus-within:text-text-main transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="SEARCH ARCHIVES..."
                        className="w-72 pl-12 pr-6 py-3 rounded-2xl border border-text-main/5 bg-text-main/5 text-[0.65rem] font-bold uppercase tracking-[0.2em] placeholder:text-text-sub/20 focus:outline-none focus:ring-1 focus:ring-text-main/10 focus:bg-white focus:shadow-2xl transition-all"
                    />
                </div>

                {/* Add Button */}
                {showAddButton && (
                    <Magnetic>
                        <Link
                            href="/dashboard"
                            className="btn-primary text-[0.65rem] font-bold uppercase tracking-[0.2em] py-3 px-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group active:scale-95"
                        >
                            <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                            <span className="hidden sm:inline">Add Playlist</span>
                        </Link>
                    </Magnetic>
                )}

                {/* Notifications */}
                <Magnetic>
                    <button className="relative p-3 rounded-full hover:bg-text-main/5 transition-all text-text-sub/40 hover:text-text-main group">
                        <Bell size={20} className="group-hover:animate-bounce" />
                        <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-text-main rounded-full shadow-[0_0_10px_rgba(34,32,29,0.5)]" />
                    </button>
                </Magnetic>
            </div>

            {/* Decor */}
            <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
        </header>
    );
}
