"use client"

import { motion } from "framer-motion"
import { Users, Calendar, TrendingUp, Building2, Plus, ArrowUpRight, Eye, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock agency branding
const agencyBranding = {
  name: "Digital Marketing Pro",
  primaryColor: "#6366F1",
  secondaryColor: "#F59E0B",
}

const agencyMetrics = [
  {
    title: "Total Clients",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Users,
    color: agencyBranding.primaryColor,
  },
  {
    title: "Posts Scheduled",
    value: "247",
    change: "+18%",
    trend: "up",
    icon: Calendar,
    color: agencyBranding.secondaryColor,
  },
  {
    title: "Avg Engagement Rate",
    value: "4.8%",
    change: "+0.5%",
    trend: "up",
    icon: TrendingUp,
    color: "#10B981",
  },
  {
    title: "Active Campaigns",
    value: "34",
    change: "+6",
    trend: "up",
    icon: Building2,
    color: "#8B5CF6",
  },
]

const recentClients = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "/placeholder.svg?height=40&width=40&text=AC",
    status: "active",
    postsThisMonth: 24,
    engagement: 5.2,
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    name: "TechStart Inc",
    logo: "/placeholder.svg?height=40&width=40&text=TS",
    status: "active",
    postsThisMonth: 18,
    engagement: 4.1,
    lastActivity: "5 hours ago",
  },
  {
    id: 3,
    name: "Creative Studio",
    logo: "/placeholder.svg?height=40&width=40&text=CS",
    status: "pending",
    postsThisMonth: 0,
    engagement: 0,
    lastActivity: "Never",
  },
  {
    id: 4,
    name: "Bloom Wellness",
    logo: "/placeholder.svg?height=40&width=40&text=BW",
    status: "active",
    postsThisMonth: 31,
    engagement: 6.8,
    lastActivity: "1 hour ago",
  },
]

const topPerformingContent = [
  {
    id: 1,
    client: "Acme Corporation",
    title: "Product launch announcement",
    platform: "LinkedIn",
    engagement: 8.4,
    reach: "12.5K",
    publishedAt: "2 days ago",
  },
  {
    id: 2,
    client: "Bloom Wellness",
    title: "Wellness tips carousel",
    platform: "Instagram",
    engagement: 7.2,
    reach: "8.9K",
    publishedAt: "1 day ago",
  },
  {
    id: 3,
    client: "TechStart Inc",
    title: "Behind the scenes video",
    platform: "TikTok",
    engagement: 6.1,
    reach: "15.2K",
    publishedAt: "3 days ago",
  },
]

export function AgencyDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome to {agencyBranding.name}</h1>
            <p className="text-muted-foreground">Manage all your clients and campaigns from one dashboard</p>
          </div>
          <Button
            style={{ backgroundColor: agencyBranding.primaryColor }}
            className="w-fit text-white hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Client
          </Button>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {agencyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg bg-background border border-border/50 flex items-center justify-center"
                    style={{ color: metric.color }}
                  >
                    <metric.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">{metric.change}</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Client Overview</CardTitle>
                  <CardDescription>Your active clients and their performance</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All Clients
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={client.logo || "/placeholder.svg"} />
                    <AvatarFallback>{client.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground truncate">{client.name}</p>
                      <Badge variant={client.status === "active" ? "default" : "secondary"} className="text-xs">
                        {client.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{client.postsThisMonth} posts this month</span>
                      <span>{client.engagement}% avg engagement</span>
                      <span>Last active: {client.lastActivity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/client/${client.id}`}>
                        <Eye className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Performing Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Best performing posts across all clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformingContent.map((content, index) => (
                <div key={content.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{content.title}</p>
                      <p className="text-xs text-muted-foreground">{content.client}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {content.platform}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{content.engagement}% engagement</span>
                    <span>{content.reach} reach</span>
                  </div>
                  <Progress value={content.engagement * 10} className="h-1" />
                  {index < topPerformingContent.length - 1 && <div className="border-b border-border/50 pt-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Plus className="w-6 h-6" />
                <span className="text-sm">Add Client</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Schedule Content</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm">View Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Settings className="w-6 h-6" />
                <span className="text-sm">Agency Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
