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
import { BarChart3, Calendar, FolderOpen, Home, Settings, Share2 } from "lucide-react"

interface ClientSidebarProps {
  clientId: string
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/client/[clientId]",
    icon: Home,
    badge: null,
  },
  {
    title: "Content Planner",
    href: "/client/[clientId]/content",
    icon: Calendar,
    badge: null,
  },
  {
    title: "Asset Library",
    href: "/client/[clientId]/assets",
    icon: FolderOpen,
    badge: "47",
  },
  {
    title: "Social Accounts",
    href: "/client/[clientId]/social",
    icon: Share2,
    badge: "3",
  },
  {
    title: "Analytics",
    href: "/client/[clientId]/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Settings",
    href: "/client/[clientId]/settings",
    icon: Settings,
    badge: null,
  },
]

// Mock agency branding - in real app, this would be fetched based on the client
const agencyBranding = {
  logo: "/placeholder.svg?height=32&width=120&text=Agency+Logo",
  name: "Digital Marketing Pro",
  primaryColor: "#6366F1",
  secondaryColor: "#F59E0B",
}

// Mock client data
const clientData = {
  name: "Acme Corporation",
  plan: "Pro Plan",
}

export function ClientSidebar({ clientId }: ClientSidebarProps) {
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
            <span className="text-white text-sm font-bold">{agencyBranding.name.charAt(0)}</span>
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-semibold text-foreground">{clientData.name}</h2>
              <p className="text-xs text-muted-foreground">{clientData.plan}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu>
          {navigationItems.map((item) => {
            const href = item.href.replace("[clientId]", clientId)
            const isActive = pathname === href
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} className="relative">
                  <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
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
              <span className="text-sm font-medium text-foreground">Powered by</span>
            </div>
            <p className="text-sm font-semibold" style={{ color: agencyBranding.primaryColor }}>
              {agencyBranding.name}
            </p>
          </motion.div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32&text=AC" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Client User</p>
              <p className="text-xs text-muted-foreground truncate">user@acme.com</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
