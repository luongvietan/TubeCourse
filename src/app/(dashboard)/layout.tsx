import { Sidebar } from "@/components/dashboard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="pl-64 transition-all duration-300">
                {children}
            </div>
        </div>
    );
}
