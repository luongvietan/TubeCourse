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
        <div>
            <DashboardHeader title="Settings" description="Manage your account settings" />

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1">
                        <nav className="space-y-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left ${activeTab === tab.id
                                                ? "bg-accent text-white"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {activeTab === "profile" && (
                            <div className="card p-6 space-y-6">
                                <div>
                                    <h3 className="text-title mb-4">Profile Information</h3>
                                    <p className="text-body mb-6">
                                        Update your account profile information and email address.
                                    </p>
                                </div>

                                {/* Avatar */}
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                                        <span className="text-2xl font-semibold text-accent">JD</span>
                                    </div>
                                    <div>
                                        <button className="btn-secondary text-sm py-2 px-4">
                                            Change Avatar
                                        </button>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            JPG, PNG or GIF. Max 2MB.
                                        </p>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue="John Doe"
                                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input
                                                type="email"
                                                defaultValue="john@example.com"
                                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        disabled={isLoading}
                                        className="btn-primary disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={18} />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="card p-6 space-y-6">
                                <div>
                                    <h3 className="text-title mb-4">Security Settings</h3>
                                    <p className="text-body mb-6">
                                        Manage your password and account security.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Current Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter current password"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Confirm New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button className="btn-primary">Update Password</button>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="card p-6 space-y-6">
                                <div>
                                    <h3 className="text-title mb-4">Notification Preferences</h3>
                                    <p className="text-body mb-6">
                                        Choose what notifications you receive.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { id: "email", label: "Email notifications", desc: "Receive email when courses are ready" },
                                        { id: "marketing", label: "Marketing emails", desc: "Receive tips and product updates" },
                                        { id: "weekly", label: "Weekly digest", desc: "Get a weekly summary of your learning" },
                                    ].map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-border"
                                        >
                                            <div>
                                                <p className="font-medium">{item.label}</p>
                                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Danger Zone */}
                        <div className="card p-6 mt-6 border-red-200">
                            <h3 className="text-title text-red-600 mb-2">Danger Zone</h3>
                            <p className="text-body mb-4">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors font-medium text-sm">
                                <Trash2 size={16} />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
