"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconDashboard,
  IconReport,
  IconUsers,
  IconChartBar,
} from "@tabler/icons-react"

import { useAuth } from "@/lib/auth"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export interface NavItem {
  title: string
  url: string
  icon: React.ComponentType<any>
  requiredPermissions?: string[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: IconDashboard,
    requiredPermissions: ["dashboard:read"]
  },
  {
    title: "Reports",
    url: "/reports",
    icon: IconReport,
    requiredPermissions: ["reports:read"]
  },
  {
    title: "Team",
    url: "/team",
    icon: IconUsers,
    requiredPermissions: ["team:read"]
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: IconChartBar,
    requiredPermissions: ["analytics:read"]
  },
]

export function ProtectedNavMain({
  items = navItems,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items?: NavItem[]
}) {
  const { hasPermission } = useAuth()

  // Filter items based on user permissions
  const accessibleItems = items.filter(item => {
    if (!item.requiredPermissions) return true
    return item.requiredPermissions.every(permission => hasPermission(permission))
  })

  return (
    <nav className={className} {...props}>
      <SidebarMenu>
        {accessibleItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  )
}