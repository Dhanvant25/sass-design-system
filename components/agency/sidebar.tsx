"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Palette, Settings, Home, Crown, Building2 } from "lucide-react"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/agency",
    icon: Home,
    badge: null,
  },
  {
    title: "Clients",
    href: "/agency/clients",
    icon: Users,
    badge: "12",
  },
  {
    title: "Analytics",
    href: "/agency/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Branding",
    href: "/agency/branding",
    icon: Palette,
    badge: null,
  },
  {
    title: "Settings",
    href: "/agency/settings",
    icon: Settings,
    badge: null,
  },
]

// Mock agency branding data - in real app, this would come from API/database
const agencyBranding = {
  logo: "/placeholder.svg?height=32&width=120&text=Agency+Logo",
  name: "Digital Marketing Pro",
  primaryColor: "#6366F1",
  secondaryColor: "#F59E0B",
}

export function AgencySidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar
      className="border-r border-border/50"
      style={{ "--sidebar-primary": agencyBranding.primaryColor } as React.CSSProperties}
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: agencyBranding.primaryColor }}
          >
            <Crown className="w-4 h-4 text-white" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-semibold text-foreground">{agencyBranding.name}</h2>
              <p className="text-xs text-muted-foreground">Agency Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} className="relative">
                  <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                    <item.icon className="w-5 h-5" />
                    {state === "expanded" && (
                      <>
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

        {state === "expanded" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 rounded-lg border border-border/50"
            style={{
              backgroundColor: `${agencyBranding.primaryColor}10`,
              borderColor: `${agencyBranding.primaryColor}20`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4" style={{ color: agencyBranding.primaryColor }} />
              <span className="text-sm font-medium text-foreground">White-Label Portal</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Manage your clients with your own branding and custom domain.
            </p>
          </motion.div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32&text=AM" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Agency Manager</p>
              <p className="text-xs text-muted-foreground truncate">admin@agency.com</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
