"use client"
import {Bookmark,BriefcaseBusiness,Building2,CreditCard,FileText,LayoutDashboard,Settings,Users,} from "lucide-react"

import {Sidebar,SidebarContent,SidebarFooter,SidebarGroup,SidebarHeader,SidebarMenu,SidebarMenuButton,SidebarMenuItem,} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItemsByRole = {
    seeker: [
        { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { name: "Jobs", url: "/dashboard/seeker/jobs", icon: BriefcaseBusiness },
        { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
        { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
        { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
        { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],
    recruiter: [
        { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
        { name: "Add Jobs", url: "/dashboard/recruiter/jobs/addJob", icon: BriefcaseBusiness },
        { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
        { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
    ],
    admin: [
        { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Users", url: "/dashboard/admin/users", icon: Users },
        { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
        { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
        { name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
        { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ],
}

export function DashboardSidebar() {
    // const { data: session } = authClient.useSession()
    // const role = session?.user?.role || "seeker"
    const role = "seeker"

    return (
        <Sidebar className="top-21 h-[calc(100svh-4rem)]">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItemsByRole[role].map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton render={<Link href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
