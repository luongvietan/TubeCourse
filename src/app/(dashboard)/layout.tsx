import { Sidebar } from "@/components/dashboard";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-background flex">
                <Sidebar />
                <main className="flex-1 transition-all duration-300 min-w-0">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
