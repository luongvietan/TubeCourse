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
        <div className="card p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-semibold mt-1">{value}</p>
                    {description && (
                        <p className="text-sm text-muted-foreground mt-1">{description}</p>
                    )}
                    {trend && (
                        <p
                            className={`text-sm mt-1 ${trend.isPositive ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}% from last month
                        </p>
                    )}
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                </div>
            </div>
        </div>
    );
}
