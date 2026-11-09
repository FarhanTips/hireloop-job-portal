
"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client";
import { Plus } from "lucide-react"



const menuItemsByRole = {
    seeker: [

    ],
    recruiter: [

    ],
    admin: [

    ],
}



export function DashboardSidebar() {
    // const { data: session} = authClient.useSession();
    // const role = session?.user?.role || 'seeker';
    const role = "seeker"

    return (
        <Sidebar className="top-21 h-[calc(100svh-4rem)]">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItemsByRole[role].map((project) => (
                            <SidebarMenuItem key={project.name}>
                                <SidebarMenuButton render={<a href={project.url} />}>
                                    <project.icon />
                                    <span>{project.name}</span>
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
