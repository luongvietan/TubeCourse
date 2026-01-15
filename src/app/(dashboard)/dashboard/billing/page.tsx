"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, Crown, CreditCard, Download } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard";

const plans = [
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

const invoices = [
    { id: "INV-001", date: "Dec 15, 2025", amount: "$19.00", status: "Paid" },
    { id: "INV-002", date: "Nov 15, 2025", amount: "$19.00", status: "Paid" },
    { id: "INV-003", date: "Oct 15, 2025", amount: "$19.00", status: "Paid" },
];

export default function BillingPage() {
    const [selectedPlan, setSelectedPlan] = useState("pro");

    return (
        <div>
            <DashboardHeader title="Billing" description="Manage your subscription and payments" />

            <div className="p-6 space-y-8">
                {/* Current Plan Banner */}
                <div className="card p-6 bg-gradient-to-r from-accent/10 to-secondary/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                            <h3 className="text-headline">Pro Plan</h3>
                            <p className="text-body mt-1">
                                Your next billing date is <strong>January 15, 2026</strong>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">$19<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                            <button className="btn-secondary text-sm py-2 px-4 mt-2">
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Plans */}
                <div>
                    <h3 className="text-title mb-6">Available Plans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => {
                            const Icon = plan.icon;
                            return (
                                <div
                                    key={plan.id}
                                    className={`card p-6 relative ${plan.popular ? "border-accent border-2" : ""
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="tag tag-accent">Most Popular</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.current ? "bg-accent text-white" : "bg-muted"
                                                }`}
                                        >
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{plan.name}</h4>
                                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <span className="text-3xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>

                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-sm">
                                                <Check size={16} className="text-accent flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`w-full ${plan.current
                                                ? "btn-secondary cursor-default"
                                                : "btn-primary"
                                            }`}
                                        disabled={plan.current}
                                    >
                                        {plan.current ? "Current Plan" : "Upgrade"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="card p-6">
                    <h3 className="text-title mb-4">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                                <CreditCard size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="font-medium">Visa ending in 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                            </div>
                        </div>
                        <button className="btn-ghost text-sm">Update</button>
                    </div>
                </div>

                {/* Billing History */}
                <div className="card p-6">
                    <h3 className="text-title mb-4">Billing History</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoice</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                                    <th className="text-right py-3 px-4 font-medium text-muted-foreground"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id} className="border-b border-border last:border-0">
                                        <td className="py-3 px-4 font-medium">{invoice.id}</td>
                                        <td className="py-3 px-4 text-muted-foreground">{invoice.date}</td>
                                        <td className="py-3 px-4">{invoice.amount}</td>
                                        <td className="py-3 px-4">
                                            <span className="tag tag-accent text-xs">{invoice.status}</span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button className="btn-ghost text-sm py-1 px-2">
                                                <Download size={14} />
                                                PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
