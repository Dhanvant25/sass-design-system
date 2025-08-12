"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserCheck, UserX, DollarSign, TrendingUp, TrendingDown, Activity, Building2 } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data
const userGrowthData = [
  { month: "Jan", users: 1200, active: 980 },
  { month: "Feb", users: 1350, active: 1100 },
  { month: "Mar", users: 1500, active: 1250 },
  { month: "Apr", users: 1680, active: 1400 },
  { month: "May", users: 1850, active: 1580 },
  { month: "Jun", users: 2100, active: 1800 },
]

const revenueData = [
  { month: "Jan", revenue: 45000, subscriptions: 120 },
  { month: "Feb", revenue: 52000, subscriptions: 135 },
  { month: "Mar", revenue: 48000, subscriptions: 128 },
  { month: "Apr", revenue: 61000, subscriptions: 152 },
  { month: "May", revenue: 67000, subscriptions: 168 },
  { month: "Jun", revenue: 74000, subscriptions: 185 },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor platform health and key metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
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
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                +0.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$74,250</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Total and active users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Total Users",
                  color: "hsl(var(--chart-1))",
                },
                active: {
                  label: "Active Users",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
                  <Line type="monotone" dataKey="active" stroke="var(--color-active)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue and subscription growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-3))",
                },
                subscriptions: {
                  label: "Subscriptions",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>Latest user registrations and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", action: "Upgraded to Pro", time: "2 minutes ago", type: "upgrade" },
                { name: "Mike Chen", action: "New registration", time: "5 minutes ago", type: "registration" },
                { name: "Digital Agency Co.", action: "Added 3 new clients", time: "12 minutes ago", type: "agency" },
                { name: "Emma Wilson", action: "Cancelled subscription", time: "1 hour ago", type: "cancellation" },
                { name: "Tech Startup Inc.", action: "Upgraded to Enterprise", time: "2 hours ago", type: "upgrade" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "upgrade"
                        ? "bg-green-500"
                        : activity.type === "registration"
                          ? "bg-blue-500"
                          : activity.type === "agency"
                            ? "bg-purple-500"
                            : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Response Time</span>
                <Badge variant="secondary">142ms</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Performance</span>
                <Badge className="bg-green-100 text-green-800">Excellent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Integrations</span>
                <Badge variant="secondary">12/15</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Server Uptime</span>
                <Badge className="bg-green-100 text-green-800">99.9%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Usage</span>
                <Badge variant="secondary">68%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <DollarSign className="h-6 w-6" />
              <span>View Revenue</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Activity className="h-6 w-6" />
              <span>System Health</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Building2 className="h-6 w-6" />
              <span>Agency Portal</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
