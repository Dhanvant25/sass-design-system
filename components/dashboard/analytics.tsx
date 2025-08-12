"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share, Eye, Calendar, Download } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const engagementData = [
  { date: "Jan 1", likes: 120, comments: 45, shares: 23, views: 1200 },
  { date: "Jan 2", likes: 150, comments: 52, shares: 31, views: 1450 },
  { date: "Jan 3", likes: 180, comments: 38, shares: 28, views: 1680 },
  { date: "Jan 4", likes: 220, comments: 65, shares: 42, views: 2100 },
  { date: "Jan 5", likes: 190, comments: 48, shares: 35, views: 1890 },
  { date: "Jan 6", likes: 240, comments: 72, shares: 48, views: 2350 },
  { date: "Jan 7", likes: 280, comments: 85, shares: 55, views: 2800 },
]

const platformData = [
  { name: "Instagram", value: 35, color: "#E4405F" },
  { name: "Facebook", value: 25, color: "#1877F2" },
  { name: "Twitter", value: 20, color: "#1DA1F2" },
  { name: "LinkedIn", value: 15, color: "#0A66C2" },
  { name: "TikTok", value: 5, color: "#000000" },
]

const topPosts = [
  {
    id: 1,
    content: "Check out our latest product launch! 🚀",
    platform: "Instagram",
    likes: 1250,
    comments: 89,
    shares: 45,
    date: "2024-01-07",
  },
  {
    id: 2,
    content: "Behind the scenes of our creative process",
    platform: "Facebook",
    likes: 890,
    comments: 67,
    shares: 34,
    date: "2024-01-06",
  },
  {
    id: 3,
    content: "Tips for better social media engagement",
    platform: "LinkedIn",
    likes: 567,
    comments: 45,
    shares: 78,
    date: "2024-01-05",
  },
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState("7d")
  const isMobile = useIsMobile()

  const stats = [
    {
      title: "Total Followers",
      value: "24.5K",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Engagement Rate",
      value: "4.8%",
      change: "+0.8%",
      trend: "up",
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Total Reach",
      value: "156K",
      change: "+23.1%",
      trend: "up",
      icon: Eye,
      color: "text-green-600",
    },
    {
      title: "Posts Published",
      value: "42",
      change: "-2",
      trend: "down",
      icon: Calendar,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your social media performance and engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
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
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm font-medium">{stat.title}</CardDescription>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                )}
                <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="posts">Top Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Over Time</CardTitle>
              <CardDescription>Track likes, comments, shares, and views across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  likes: { label: "Likes", color: "hsl(var(--chart-1))" },
                  comments: { label: "Comments", color: "hsl(var(--chart-2))" },
                  shares: { label: "Shares", color: "hsl(var(--chart-3))" },
                  views: { label: "Views", color: "hsl(var(--chart-4))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="likes" stroke="var(--color-likes)" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="var(--color-comments)" strokeWidth={2} />
                    <Line type="monotone" dataKey="shares" stroke="var(--color-shares)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Engagement breakdown by social media platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Engagement", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Engagement metrics by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformData.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{platform.value}%</div>
                        <div className="text-xs text-gray-500">of total engagement</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>Your best performing content from the selected time period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Badge variant="secondary">{post.platform}</Badge>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="w-4 h-4 text-green-500" />
                        <span>{post.shares}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
