import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
}: StatsCardProps) {
    return (
        <div className="bg-white border border-text-main/5 rounded-[2rem] p-10 shadow-sm relative overflow-hidden group hover:border-text-main/20 transition-all duration-700">
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-text-main/5 border border-text-main/5 flex items-center justify-center text-text-main transition-transform duration-700 group-hover:rotate-[360deg] shadow-sm">
                        <Icon size={20} className="opacity-60" />
                    </div>
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-text-sub/50 group-hover:text-text-main transition-colors">{title}</span>
                </div>

                <div className="space-y-3">
                    <p className="text-5xl font-jp font-medium text-text-main tracking-tighter group-hover:italic transition-all duration-700">{value}</p>
                    {(description || trend) && (
                        <div className="flex items-center gap-3 mt-4">
                            {trend && (
                                <div className={`px-2 py-0.5 rounded-full text-[0.55rem] font-extrabold uppercase tracking-widest ${trend.isPositive ? "bg-text-main text-bg-main" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
                                    {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
                                </div>
                            )}
                            {description && (
                                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text-sub/40 italic group-hover:text-text-sub/80 transition-colors">
                                    {description}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Visual Decoration */}
            <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 select-none pointer-events-none opacity-[0.03] transition-transform duration-[2s] group-hover:scale-125 group-hover:-translate-y-1/2">
                <span className="text-[12rem] font-jp font-bold text-text-main">{title[0]}</span>
            </div>

            <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />
        </div>
    );
}
