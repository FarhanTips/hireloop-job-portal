
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar></DashboardSidebar>
            <main className="min-w-0 flex-1">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
