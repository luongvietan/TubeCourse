"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Settings,
    CreditCard,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";
import { useSidebar } from "@/components/dashboard/sidebar-context";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Magnetic } from "@/components/ui/magnetic";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

export function Sidebar() {
    const { isCollapsed, toggleSidebar, isMobileOpen, closeMobileSidebar } = useSidebar();

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex sticky top-0 h-screen bg-bg-main border-r border-text-main/5 flex-col transition-all duration-500 z-50 flex-shrink-0 relative ${isCollapsed ? "w-20" : "w-64"
                    }`}
            >
                <div className="story-line h-full top-0 right-0 left-auto opacity-10" />
                <SidebarContent isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            </aside>

            {/* Mobile Sidebar (Sheet) */}
            <Sheet open={isMobileOpen} onOpenChange={closeMobileSidebar}>
                <SheetContent side="left" className="p-0 w-64 bg-bg-main border-r border-text-main/5">
                    <VisuallyHidden>
                        <SheetTitle>Navigation Menu</SheetTitle>
                    </VisuallyHidden>
                    <SidebarContent isCollapsed={false} isMobile={true} />
                </SheetContent>
            </Sheet>
        </>
    );
}

interface SidebarContentProps {
    isCollapsed: boolean;
    toggleSidebar?: () => void;
    isMobile?: boolean;
}

function SidebarContent({ isCollapsed, toggleSidebar, isMobile = false }: SidebarContentProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useUser();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === "/dashboard";
        }
        return pathname.startsWith(href);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const userInitials = user?.user_metadata?.full_name
        ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : user?.email?.slice(0, 2).toUpperCase() || 'U';

    const userName = user?.user_metadata?.full_name || 'User';
    const userEmail = user?.email || '';

    return (
        <div className="flex flex-col h-full w-full relative z-10 bg-bg-main">
            {/* Logo Section */}
            <div className={`h-24 flex items-center ${isCollapsed ? "justify-center" : "justify-between px-8"} transition-all duration-500 relative`}>
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="w-9 h-9 rounded-full bg-text-main flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg] shadow-lg">
                        <span className="text-bg-main text-[0.6rem] font-extrabold tracking-widest">TC</span>
                    </div>
                    {(!isCollapsed || isMobile) && (
                        <span className="font-jp font-bold text-[0.7rem] tracking-[0.4em] text-text-main group-hover:italic transition-all uppercase">TubeCourse</span>
                    )}
                </Link>
                {!isMobile && !isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 rounded-full hover:bg-text-main hover:text-bg-main transition-colors text-text-sub/40 hover:text-text-main"
                    >
                        <ChevronLeft size={16} />
                    </button>
                )}
                {!isMobile && isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 rounded-full hover:bg-text-main hover:text-bg-main transition-colors text-text-sub absolute -right-3 top-10 bg-white border border-text-main/5 shadow-sm"
                    >
                        <ChevronRight size={14} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto no-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Magnetic key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500 relative group overflow-hidden ${active
                                    ? "bg-text-main text-bg-main shadow-xl"
                                    : "text-text-sub hover:text-text-main hover:bg-text-main/5"
                                    } ${isCollapsed && !isMobile ? "justify-center" : ""}`}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <Icon size={18} className={`relative z-10 ${active ? "text-bg-main" : "opacity-40"}`} />
                                {(!isCollapsed || isMobile) && (
                                    <span className={`relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all ${active ? "italic" : "group-hover:pl-1"}`}>
                                        {item.label}
                                    </span>
                                )}
                                {active && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                )}
                            </Link>
                        </Magnetic>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-6 mt-auto border-t border-text-main/5 space-y-6">
                <div className={`flex items-center gap-4 ${isCollapsed && !isMobile ? "justify-center" : ""} px-2 relative`}>
                    <div className="w-10 h-10 rounded-full bg-text-main/5 border border-text-main/10 flex items-center justify-center flex-shrink-0 overflow-hidden relative group cursor-pointer">
                        <span className="text-[0.65rem] font-bold text-text-main">{userInitials}</span>
                        <div className="absolute inset-0 bg-text-main/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Settings className="w-4 h-4 text-bg-main" />
                        </div>
                    </div>
                    {(!isCollapsed || isMobile) && (
                        <div className="flex-1 min-w-0">
                            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-text-main truncate">{userName}</p>
                            <p className="text-[0.55rem] font-bold text-text-sub/40 truncate tracking-tight">{userEmail}</p>
                        </div>
                    )}
                </div>

                <div className="px-2">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className={`flex items-center gap-4 w-full px-5 py-3.5 rounded-2xl text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-sub hover:text-text-main hover:bg-text-main/5 transition-all duration-300 disabled:opacity-50 group border border-transparent hover:border-text-main/5 ${isCollapsed && !isMobile ? "justify-center" : ""}`}
                        title={isCollapsed ? "Sign out" : undefined}
                    >
                        <LogOut size={16} className="opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                        {(!isCollapsed || isMobile) && (
                            <span className="group-hover:italic transition-all">{isLoggingOut ? "..." : "Sign out"}</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Visual Decor */}
            <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
        </div>
    );
}
