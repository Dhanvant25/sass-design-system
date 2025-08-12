"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Clock, Zap, Globe, Smartphone, Calendar, TrendingUp } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock analytics data
const integrationUsage = [
  { name: "Instagram", usage: 2847, percentage: 85 },
  { name: "Facebook", usage: 2234, percentage: 67 },
  { name: "Twitter", usage: 1876, percentage: 56 },
  { name: "LinkedIn", usage: 1543, percentage: 46 },
  { name: "TikTok", usage: 1234, percentage: 37 },
  { name: "YouTube", usage: 987, percentage: 29 },
  { name: "Pinterest", usage: 654, percentage: 20 },
]

const peakPostingTimes = [
  { hour: "6 AM", posts: 45 },
  { hour: "7 AM", posts: 78 },
  { hour: "8 AM", posts: 156 },
  { hour: "9 AM", posts: 234 },
  { hour: "10 AM", posts: 189 },
  { hour: "11 AM", posts: 167 },
  { hour: "12 PM", posts: 298 },
  { hour: "1 PM", posts: 345 },
  { hour: "2 PM", posts: 267 },
  { hour: "3 PM", posts: 234 },
  { hour: "4 PM", posts: 189 },
  { hour: "5 PM", posts: 156 },
  { hour: "6 PM", posts: 234 },
  { hour: "7 PM", posts: 189 },
  { hour: "8 PM", posts: 145 },
  { hour: "9 PM", posts: 98 },
]

const dailyActivity = [
  { day: "Mon", posts: 1234, users: 567 },
  { day: "Tue", posts: 1456, users: 634 },
  { day: "Wed", posts: 1678, users: 723 },
  { day: "Thu", posts: 1543, users: 689 },
  { day: "Fri", posts: 1789, users: 756 },
  { day: "Sat", posts: 1234, users: 543 },
  { day: "Sun", posts: 987, users: 456 },
]

export function ServiceAnalytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                -8.3%
              </span>
              improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/15</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">80% utilization</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Most Used Integrations</CardTitle>
          <CardDescription>Platform usage by social media integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrationUsage.map((integration, index) => (
              <div key={integration.name} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium">{integration.name}</div>
                <div className="flex-1">
                  <Progress value={integration.percentage} className="h-2" />
                </div>
                <div className="w-20 text-right">
                  <div className="text-sm font-medium">{integration.usage.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{integration.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Peak Posting Times */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Posting Times</CardTitle>
          <CardDescription>When users schedule the most content</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              posts: {
                label: "Posts",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakPostingTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="posts" fill="var(--color-posts)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Daily Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Platform Activity</CardTitle>
          <CardDescription>Posts scheduled and active users by day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              posts: {
                label: "Posts",
                color: "hsl(var(--chart-1))",
              },
              users: {
                label: "Active Users",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="posts" stroke="var(--color-posts)" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* System Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Platform health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Server Uptime</span>
                <Badge className="bg-green-100 text-green-800">99.9%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Performance</span>
                <Badge className="bg-green-100 text-green-800">Excellent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CDN Response Time</span>
                <Badge variant="secondary">45ms</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Error Rate</span>
                <Badge className="bg-green-100 text-green-800">0.02%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Usage</span>
                <Badge variant="secondary">68% (2.1TB)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>User activity by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">North America</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">1,247 users</div>
                  <div className="text-xs text-muted-foreground">43.8%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">Europe</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">987 users</div>
                  <div className="text-xs text-muted-foreground">34.7%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">Asia Pacific</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">456 users</div>
                  <div className="text-xs text-muted-foreground">16.0%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">Other</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">157 users</div>
                  <div className="text-xs text-muted-foreground">5.5%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Device & Platform Analytics</CardTitle>
          <CardDescription>How users access the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">67%</div>
              <p className="text-sm text-muted-foreground">Mobile Users</p>
            </div>
            <div className="text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">28%</div>
              <p className="text-sm text-muted-foreground">Desktop Users</p>
            </div>
            <div className="text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">5%</div>
              <p className="text-sm text-muted-foreground">Tablet Users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
