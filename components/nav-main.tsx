"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain() {
  const pathname = usePathname()

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Reports",
      url: "/reports",
    },
    {
      title: "Team",
      url: "/team",
    },
    {
      title: "Analytics",
      url: "/analytics",
    },
  ]

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
            <Link href={item.url}>{item.title}</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
