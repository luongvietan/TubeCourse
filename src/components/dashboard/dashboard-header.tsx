"use client";

import { Search, Bell, Plus } from "lucide-react";
import Link from "next/link";

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
    return (
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
            {/* Title */}
            <div>
                <h1 className="text-title">{title}</h1>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-64 pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                    />
                </div>

                {/* Add Button */}
                {showAddButton && (
                    <Link
                        href="/dashboard"
                        className="btn-primary text-sm py-2 px-4"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">Add Playlist</span>
                    </Link>
                )}

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                </button>
            </div>
        </header>
    );
}
