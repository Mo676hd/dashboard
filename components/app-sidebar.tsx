"use client"

import * as React from "react"
import {
  Home,
  FileText,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react"

import { CompanyLogo } from "@/components/company-logo"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { useAuth } from "@/lib/auth"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const getNavData = (userRole: string) => {
  const baseNav = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      permission: "dashboard"
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
      permission: "reports"
    },
  ]

  const superuserNav = [
    ...baseNav,
    {
      title: "Team",
      url: "/team",
      icon: Users,
      permission: "team"
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      permission: "analytics"
    },
  ]

  const navSecondary = [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      permission: "settings"
    },
    {
      title: "Account",
      url: "/account",
      icon: HelpCircle,
      permission: "account"
    },
  ]

  return {
    navMain: userRole === 'superuser' ? superuserNav : baseNav,
    navSecondary: navSecondary.filter(item =>
      userRole === 'superuser' || item.permission === 'account'
    )
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  if (!user) return null

  const navData = getNavData(user.role)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <CompanyLogo />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{...user, avatar: user.avatar || '/avatars/user.jpg'}} />
      </SidebarFooter>
    </Sidebar>
  )
}
