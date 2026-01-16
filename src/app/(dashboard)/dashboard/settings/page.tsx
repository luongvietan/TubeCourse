"use client";

import { useState } from "react";
import { Loader2, User, Lock, Bell, Trash2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    const handleSave = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Lock },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    return (
        <div className="bg-bg-main min-h-screen">
            <DashboardHeader title="Settings" description="Customize your learning environment." />

            <div className="p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-3">
                        <nav className="flex flex-col gap-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-left ${activeTab === tab.id
                                            ? "bg-text-main text-bg-main shadow-lg"
                                            : "text-text-sub hover:bg-text-main/5 hover:text-text-main"
                                            }`}
                                    >
                                        <Icon size={16} className={activeTab === tab.id ? "" : "opacity-50 group-hover:opacity-100"} />
                                        <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em]">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-9 space-y-8">
                        {activeTab === "profile" && (
                            <div className="bg-white border border-text-main/5 rounded-3xl p-10 space-y-12 relative overflow-hidden">
                                <div className="relative z-10">
                                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-sub">Account Details</span>
                                    <h3 className="font-jp font-medium text-3xl text-text-main mt-1 mb-6">Profile Settings</h3>
                                    <p className="text-sm text-text-sub font-jp leading-relaxed max-w-xl">
                                        Update your personal information. These details will be used for your certifications and learning profile.
                                    </p>
                                </div>

                                {/* Avatar */}
                                <div className="flex items-center gap-8 relative z-10">
                                    <div className="w-24 h-24 rounded-full bg-text-main flex items-center justify-center text-bg-main shadow-2xl">
                                        <span className="text-4xl font-jp font-bold">JD</span>
                                    </div>
                                    <div className="space-y-3">
                                        <button className="btn-secondary py-3 px-6 text-[0.65rem]">
                                            UPLOAD NEW IMAGE
                                        </button>
                                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-text-sub">
                                            JPG, PNG or GIF. Max 2MB.
                                        </p>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue="John Doe"
                                            className="w-full px-6 py-4 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue="john@example.com"
                                            className="w-full px-6 py-4 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 relative z-10">
                                    <button
                                        onClick={handleSave}
                                        disabled={isLoading}
                                        className="btn-primary py-4 px-10 text-[0.7rem] disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="animate-spin" size={14} />
                                                SAVING CHANGES...
                                            </span>
                                        ) : (
                                            "UPDATE PROFILE"
                                        )}
                                    </button>
                                </div>

                                <div className="story-line absolute right-0 top-0 bottom-0 w-px opacity-5" />
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="bg-white border border-text-main/5 rounded-3xl p-10 space-y-12 relative overflow-hidden">
                                <div className="relative z-10">
                                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-sub">Credential Management</span>
                                    <h3 className="font-jp font-medium text-3xl text-text-main mt-1 mb-6">Security</h3>
                                </div>

                                <div className="space-y-8 max-w-lg relative z-10">
                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main">Current Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full px-6 py-4 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full px-6 py-4 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main">Confirm New Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full px-6 py-4 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 relative z-10">
                                    <button className="btn-primary py-4 px-10 text-[0.7rem]">
                                        UPDATE PASSWORD
                                    </button>
                                </div>
                                <div className="story-line absolute right-0 top-0 bottom-0 w-px opacity-5" />
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="bg-white border border-text-main/5 rounded-3xl p-10 space-y-12 relative overflow-hidden">
                                <div className="relative z-10">
                                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-sub">Push & Email</span>
                                    <h3 className="font-jp font-medium text-3xl text-text-main mt-1 mb-6">Preferences</h3>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    {[
                                        { id: "email", label: "Processing updates", desc: "Notify me when summaries are ready" },
                                        { id: "marketing", label: "Learning Insights", desc: "Receive curated educational content" },
                                        { id: "weekly", label: "Weekly Progress", desc: "A summary of your weekly achievements" },
                                    ].map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-6 rounded-2xl border border-text-main/5 hover:bg-text-main/5 transition-all"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-text-main">{item.label}</p>
                                                <p className="text-sm font-jp text-text-sub">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-12 h-6 bg-text-main/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-bg-main after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-text-main after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-text-main peer-checked:after:bg-bg-main"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="story-line absolute right-0 top-0 bottom-0 w-px opacity-5" />
                            </div>
                        )}

                        {/* Danger Zone */}
                        <div className="bg-white border border-destructive/10 rounded-3xl p-10 relative overflow-hidden">
                            <h3 className="font-jp font-medium text-2xl text-destructive mb-2">Danger Zone</h3>
                            <p className="text-sm text-text-sub font-jp leading-relaxed mb-8 max-w-xl">
                                Once you delete your account, your entire library of structured courses will be permanently removed.
                            </p>
                            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all font-bold text-[0.65rem] uppercase tracking-widest">
                                <Trash2 size={14} />
                                DELETE ACCOUNT PERMANENTLY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
