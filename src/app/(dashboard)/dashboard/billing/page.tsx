"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, Crown, CreditCard, Download } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface Plan {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    icon: any;
    features: string[];
    current: boolean;
    popular?: boolean;
}

const plans: Plan[] = [
    {
        id: "free",
        name: "Free",
        price: "$0",
        period: "/month",
        description: "Perfect for trying out TubeCourse",
        icon: Sparkles,
        features: [
            "3 playlists per month",
            "Basic AI summaries",
            "Up to 10 videos per playlist",
            "Email support",
        ],
        current: false,
    },
    {
        id: "pro",
        name: "Pro",
        price: "$19",
        period: "/month",
        description: "For serious learners and students",
        icon: Zap,
        features: [
            "Unlimited playlists",
            "Advanced AI summaries",
            "Unlimited videos per playlist",
            "Key insights extraction",
            "Export to PDF/Notion",
            "Priority support",
        ],
        current: true,
        popular: true,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "$49",
        period: "/month",
        description: "For teams and organizations",
        icon: Crown,
        features: [
            "Everything in Pro",
            "Team collaboration",
            "API access",
            "Custom AI models",
            "Dedicated support",
            "SLA guarantee",
        ],
        current: false,
    },
];

interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: string;
}

const invoices: Invoice[] = [
    { id: "INV-001", date: "Dec 15, 2025", amount: "$19.00", status: "Paid" },
    { id: "INV-002", date: "Nov 15, 2025", amount: "$19.00", status: "Paid" },
    { id: "INV-003", date: "Oct 15, 2025", amount: "$19.00", status: "Paid" },
];

export default function BillingPage() {
    const [selectedPlan, setSelectedPlan] = useState("pro");

    return (
        <div className="bg-bg-main min-h-screen">
            <DashboardHeader title="Subscription" description="Manage your premium features." />

            <div className="p-10 space-y-12">
                {/* Current Plan Banner */}
                <div className="bg-text-main text-bg-main rounded-3xl p-10 relative overflow-hidden group shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="w-8 h-8 rounded-full bg-bg-main/20 flex items-center justify-center">
                                    <Zap size={14} className="fill-bg-main text-bg-main" />
                                </div>
                                <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-bg-main/60">Active Membership</span>
                            </div>
                            <h3 className="font-jp font-medium text-4xl leading-tight">Pro Plan</h3>
                            <p className="text-[0.7rem] font-bold uppercase tracking-widest text-bg-main/40 italic">
                                Next processing: Jan 15, 2026
                            </p>
                        </div>
                        <div className="mt-8 md:mt-0 text-center md:text-right space-y-4">
                            <p className="text-4xl font-jp font-bold">$19<span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-40 ml-2">/ month</span></p>
                            <button className="px-8 py-3 rounded-xl bg-bg-main/10 border border-bg-main/20 hover:bg-bg-main/20 text-bg-main transition-all text-[0.6rem] font-bold uppercase tracking-widest">
                                CANCEL SUBSCRIPTION
                            </button>
                        </div>
                    </div>
                    {/* Visual Decor */}
                    <div className="story-line absolute top-0 bottom-0 left-10 w-px opacity-10" />
                    <div className="absolute -bottom-10 -right-10 opacity-5 scale-150 rotate-12">
                        <Zap size={200} />
                    </div>
                </div>

                {/* Pricing Plans */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-sub">Upgrade</span>
                            <h2 className="font-jp font-medium text-3xl text-text-main mt-1">Available Tiers</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => {
                            const Icon = plan.icon;
                            return (
                                <SpotlightCard
                                    key={plan.id}
                                    className={`p-10 flex flex-col ${plan.popular ? "border-text-main/20 ring-1 ring-text-main/10" : ""}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-6 right-6">
                                            <span className="px-3 py-1 rounded-full bg-text-main text-bg-main text-[0.5rem] font-bold uppercase tracking-widest">
                                                Best Value
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${plan.current ? "bg-text-main text-bg-main" : "bg-text-main/5 text-text-main"}`}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-jp font-medium text-xl text-text-main">{plan.name}</h4>
                                            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-text-sub mt-0.5">{plan.description}</p>
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <span className="text-4xl font-jp font-bold text-text-main">{plan.price}</span>
                                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-text-sub ml-2">{plan.period}</span>
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-1">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3 text-sm">
                                                <Check size={14} className="text-text-main flex-shrink-0" />
                                                <span className="font-jp text-text-sub text-[0.8rem]">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`w-full py-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] transform active:scale-[0.98] transition-all ${plan.current
                                            ? "bg-text-main/5 text-text-sub cursor-default"
                                            : "btn-primary"
                                            }`}
                                        disabled={plan.current}
                                    >
                                        {plan.current ? "CURRENT PLAN" : "UPGRADE ACCOUNT"}
                                    </button>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Payment Method */}
                    <div className="bg-white border border-text-main/5 rounded-3xl p-10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-sub">Secure Gateway</span>
                            <h3 className="font-jp font-medium text-2xl text-text-main mt-1 mb-8">Payment Method</h3>

                            <div className="flex items-center justify-between p-8 rounded-3xl border border-text-main/5 bg-text-main/5 group-hover:bg-transparent transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-10 rounded-xl bg-text-main flex items-center justify-center shadow-lg">
                                        <CreditCard size={20} className="text-bg-main" />
                                    </div>
                                    <div>
                                        <p className="text-[0.7rem] font-bold uppercase tracking-widest text-text-main mb-1">Visa ending in 4242</p>
                                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-text-sub">Expires 12/2027</p>
                                    </div>
                                </div>
                                <button className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main hover:line-through transition-all underline decoration-text-main/10 underline-offset-8">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Billing History */}
                    <div className="bg-white border border-text-main/5 rounded-3xl p-10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-sub">Archive</span>
                            <h3 className="font-jp font-medium text-2xl text-text-main mt-1 mb-8">Billing History</h3>

                            <div className="space-y-4">
                                {invoices.map((invoice) => (
                                    <div key={invoice.id} className="flex items-center justify-between py-4 border-b border-text-main/5 last:border-0 hover:px-2 transition-all group/item">
                                        <div className="flex items-center gap-6">
                                            <span className="text-[0.65rem] font-bold text-text-main">{invoice.id}</span>
                                            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-sub">{invoice.date}</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-[0.7rem] font-bold text-text-main">{invoice.amount}</span>
                                            <button className="w-8 h-8 rounded-full bg-text-main/5 flex items-center justify-center text-text-main opacity-0 group-hover/item:opacity-100 transition-all hover:bg-text-main hover:text-bg-main">
                                                <Download size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
