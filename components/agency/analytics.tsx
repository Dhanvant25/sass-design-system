"use client"

import { motion } from "framer-motion"
import { Users, Calendar, Eye, Heart, MessageCircle, Share, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock agency branding
const agencyBranding = {
  primaryColor: "#6366F1",
}

const agencyAnalytics = [
  {
    title: "Total Posts Scheduled",
    value: "1,247",
    change: "+18%",
    trend: "up",
    icon: Calendar,
    color: agencyBranding.primaryColor,
  },
  {
    title: "Active Clients",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Users,
    color: "#10B981",
  },
  {
    title: "Avg Engagement Rate",
    value: "4.8%",
    change: "+0.5%",
    trend: "up",
    icon: Heart,
    color: "#F59E0B",
  },
  {
    title: "Total Reach",
    value: "284K",
    change: "+23%",
    trend: "up",
    icon: Eye,
    color: "#8B5CF6",
  },
]

const clientPerformance = [
  {
    id: 1,
    name: "Acme Corporation",
    postsScheduled: 24,
    engagement: 5.2,
    reach: "45.2K",
    growth: "+12%",
    trend: "up",
  },
  {
    id: 2,
    name: "TechStart Inc",
    postsScheduled: 18,
    engagement: 4.1,
    reach: "32.8K",
    growth: "+8%",
    trend: "up",
  },
  {
    id: 3,
    name: "Bloom Wellness",
    postsScheduled: 31,
    engagement: 6.8,
    reach: "67.5K",
    growth: "+25%",
    trend: "up",
  },
  {
    id: 4,
    name: "Creative Studio",
    postsScheduled: 12,
    engagement: 3.2,
    reach: "18.9K",
    growth: "-2%",
    trend: "down",
  },
  {
    id: 5,
    name: "Fashion Forward",
    postsScheduled: 8,
    engagement: 2.1,
    reach: "12.3K",
    growth: "-5%",
    trend: "down",
  },
]

const platformPerformance = [
  {
    platform: "Instagram",
    posts: 156,
    engagement: 5.4,
    reach: "125K",
    color: "from-purple-500 to-pink-500",
  },
  {
    platform: "LinkedIn",
    posts: 89,
    engagement: 4.2,
    reach: "78K",
    color: "from-blue-600 to-blue-700",
  },
  {
    platform: "Twitter",
    posts: 234,
    engagement: 3.1,
    reach: "92K",
    color: "from-gray-800 to-black",
  },
  {
    platform: "Facebook",
    posts: 67,
    engagement: 2.8,
    reach: "45K",
    color: "from-blue-500 to-blue-600",
  },
  {
    platform: "TikTok",
    posts: 43,
    engagement: 7.2,
    reach: "156K",
    color: "from-black to-red-500",
  },
]

const topContent = [
  {
    id: 1,
    client: "Bloom Wellness",
    title: "Morning wellness routine tips",
    platform: "Instagram",
    engagement: 8.4,
    likes: 1240,
    comments: 89,
    shares: 156,
    publishedAt: "2 days ago",
  },
  {
    id: 2,
    client: "Acme Corporation",
    title: "Product launch announcement",
    platform: "LinkedIn",
    engagement: 7.8,
    likes: 892,
    comments: 67,
    shares: 234,
    publishedAt: "1 day ago",
  },
  {
    id: 3,
    client: "TechStart Inc",
    title: "Behind the scenes development",
    platform: "TikTok",
    engagement: 9.1,
    likes: 2340,
    comments: 156,
    shares: 445,
    publishedAt: "3 days ago",
  },
]

export function AgencyAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agency Analytics</h1>
            <p className="text-muted-foreground">Comprehensive analytics across all your clients</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent">
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {agencyAnalytics.map((metric, index) => (
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
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Client Performance</CardTitle>
              <CardDescription>Performance metrics for each client</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {clientPerformance.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{client.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{client.postsScheduled} posts</span>
                      <span>{client.engagement}% engagement</span>
                      <span>{client.reach} reach</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {client.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${client.trend === "up" ? "text-green-500" : "text-red-500"}`}
                    >
                      {client.growth}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Platform Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>Engagement across social platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {platformPerformance.map((platform) => (
                <div key={platform.platform} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {platform.platform.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{platform.platform}</p>
                        <p className="text-xs text-muted-foreground">{platform.posts} posts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{platform.engagement}%</p>
                      <p className="text-xs text-muted-foreground">{platform.reach} reach</p>
                    </div>
                  </div>
                  <Progress value={platform.engagement * 10} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Performing Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Best performing posts across all clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContent.map((content) => (
              <div
                key={content.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-foreground">{content.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {content.platform}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{content.client}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {content.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {content.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share className="w-3 h-3" />
                      {content.shares}
                    </span>
                    <span>{content.publishedAt}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: agencyBranding.primaryColor }}>
                    {content.engagement}%
                  </p>
                  <p className="text-xs text-muted-foreground">engagement</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
