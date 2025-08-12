"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const metrics = [
  {
    title: "Scheduled Posts",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Published Posts",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Engagement Rate",
    value: "4.2%",
    change: "-0.3%",
    trend: "down",
    icon: Heart,
    color: "text-pink-500",
  },
  {
    title: "Total Reach",
    value: "12.4K",
    change: "+23%",
    trend: "up",
    icon: Eye,
    color: "text-purple-500",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "post_published",
    title: "Instagram post published successfully",
    description: "Summer campaign launch post",
    time: "2 minutes ago",
    platform: "Instagram",
    avatar: "/placeholder.svg?height=40&width=40&text=IG",
    metrics: { likes: 24, comments: 5, shares: 2 },
  },
  {
    id: 2,
    type: "post_scheduled",
    title: "LinkedIn post scheduled",
    description: "Industry insights article",
    time: "1 hour ago",
    platform: "LinkedIn",
    avatar: "/placeholder.svg?height=40&width=40&text=LI",
    metrics: null,
  },
  {
    id: 3,
    type: "asset_uploaded",
    title: "New brand assets uploaded",
    description: "5 images added to Summer Campaign folder",
    time: "3 hours ago",
    platform: "Asset Library",
    avatar: "/placeholder.svg?height=40&width=40&text=AL",
    metrics: null,
  },
  {
    id: 4,
    type: "post_published",
    title: "Twitter thread published",
    description: "Product announcement thread",
    time: "5 hours ago",
    platform: "Twitter",
    avatar: "/placeholder.svg?height=40&width=40&text=TW",
    metrics: { likes: 89, comments: 12, shares: 34 },
  },
]

const upcomingPosts = [
  {
    id: 1,
    title: "Product feature highlight",
    platform: "Instagram",
    scheduledTime: "Today, 3:00 PM",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Industry news commentary",
    platform: "LinkedIn",
    scheduledTime: "Tomorrow, 9:00 AM",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Behind the scenes video",
    platform: "TikTok",
    scheduledTime: "Tomorrow, 6:00 PM",
    status: "draft",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's what's happening with your social media today.</p>
          </div>
          <Button className="w-fit">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule New Post
          </Button>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
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
                    className={`w-12 h-12 rounded-lg bg-background border border-border/50 flex items-center justify-center ${metric.color}`}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
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
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest social media activity and updates</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{activity.platform.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {activity.platform}
                      </Badge>
                      {activity.metrics && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {activity.metrics.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {activity.metrics.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share className="w-3 h-3" />
                            {activity.metrics.shares}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Upcoming Posts</CardTitle>
              <CardDescription>Your scheduled content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.platform}</p>
                    <p className="text-xs text-muted-foreground">{post.scheduledTime}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={post.status === "scheduled" ? "default" : "secondary"} className="text-xs">
                      {post.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent" size="sm">
                View Content Calendar
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Engagement rates across your connected platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    IG
                  </div>
                  <div>
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="text-xs text-muted-foreground">5.2% engagement rate</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">8.4K followers</p>
                  <Progress value={85} className="w-20 h-2 mt-1" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    LI
                  </div>
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">3.8% engagement rate</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">2.1K connections</p>
                  <Progress value={65} className="w-20 h-2 mt-1" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-black flex items-center justify-center text-white text-xs font-bold">
                    𝕏
                  </div>
                  <div>
                    <p className="text-sm font-medium">Twitter</p>
                    <p className="text-xs text-muted-foreground">2.1% engagement rate</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">1.8K followers</p>
                  <Progress value={45} className="w-20 h-2 mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
