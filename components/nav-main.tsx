"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import {
  Home,
  FileText,
  Users,
  BarChart3,
  Settings,
} from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain() {
  const pathname = usePathname()
  const { user } = useAuth()

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
    },
  ]

  // Add admin-only items
  if (user?.role === 'superuser') {
    items.push(
      {
        title: "Team",
        url: "/team",
        icon: Users,
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      }
    )
  }

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.url}
            className={cn(
              "font-medium",
              pathname === item.url && "bg-accent text-accent-foreground"
            )}
          >
            <Link href={item.url} className="flex items-center gap-2">
              <item.icon className="w-4 h-4" />
              {item.title}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
