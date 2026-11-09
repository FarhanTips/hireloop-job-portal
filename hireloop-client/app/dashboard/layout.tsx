
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar></DashboardSidebar>
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
