"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Calendar, FolderOpen, BarChart3, Settings, Users, Palette, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  userType?: "individual" | "agency" | "client" | "admin"
  clientId?: string
}

const navigationConfig = {
  individual: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Content", href: "/dashboard/content-planner", icon: Calendar },
    { name: "Assets", href: "/dashboard/asset-library", icon: FolderOpen },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  agency: [
    { name: "Dashboard", href: "/agency", icon: Home },
    { name: "Clients", href: "/agency/clients", icon: Users },
    { name: "Analytics", href: "/agency/analytics", icon: BarChart3 },
    { name: "Branding", href: "/agency/branding", icon: Palette },
    { name: "Settings", href: "/agency/settings", icon: Settings },
  ],
  client: [
    { name: "Dashboard", href: "/client/[clientId]", icon: Home },
    { name: "Content", href: "/client/[clientId]/content", icon: Calendar },
    { name: "Assets", href: "/client/[clientId]/assets", icon: FolderOpen },
    { name: "Analytics", href: "/client/[clientId]/analytics", icon: BarChart3 },
    { name: "Settings", href: "/client/[clientId]/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Revenue", href: "/admin/revenue", icon: BarChart3 },
    { name: "Agencies", href: "/admin/agencies", icon: Building2 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ],
}

export function BottomNavigation({ userType = "individual", clientId }: BottomNavigationProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const navigation = navigationConfig[userType]

  // Hide/show navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 md:hidden"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navigation.map((item) => {
          const href = clientId ? item.href.replace("[clientId]", clientId) : item.href
          const isActive = pathname === href

          return (
            <Link key={item.name} href={href} className="relative">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-colors min-w-[60px]",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium truncate">{item.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                    style={{ x: "-50%" }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
