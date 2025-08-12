"use client"
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
import { BarChart3, Calendar, FolderOpen, Home, Settings, Share2, Sparkles, Users, Zap } from "lucide-react"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    badge: null,
  },
  {
    title: "Social Accounts",
    href: "/dashboard/social-accounts",
    icon: Share2,
    badge: "5",
  },
  {
    title: "Content Planner",
    href: "/dashboard/content-planner",
    icon: Calendar,
    badge: null,
  },
  {
    title: "Asset Library",
    href: "/dashboard/asset-library",
    icon: FolderOpen,
    badge: "247",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
    badge: null,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    badge: null,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-semibold text-foreground">Social Manager</h2>
              <p className="text-xs text-muted-foreground">Pro Plan</p>
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
            className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Upgrade to Agency</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Unlock unlimited posts, white-label features, and advanced analytics.
            </p>
            <button className="w-full px-3 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors">
              Upgrade Now
            </button>
          </motion.div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@company.com</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
