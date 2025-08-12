"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Users, Calendar, Download } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock revenue data
const monthlyRevenue = [
  { month: "Jan", revenue: 45000, subscriptions: 120, churn: 2400 },
  { month: "Feb", revenue: 52000, subscriptions: 135, churn: 1800 },
  { month: "Mar", revenue: 48000, subscriptions: 128, churn: 2100 },
  { month: "Apr", revenue: 61000, subscriptions: 152, churn: 1600 },
  { month: "May", revenue: 67000, subscriptions: 168, churn: 1900 },
  { month: "Jun", revenue: 74000, subscriptions: 185, churn: 1400 },
]

const planDistribution = [
  { name: "Free", value: 1200, color: "#8884d8" },
  { name: "Pro", value: 800, color: "#82ca9d" },
  { name: "Agency", value: 156, color: "#ffc658" },
  { name: "Enterprise", value: 45, color: "#ff7300" },
]

const recentTransactions = [
  {
    id: "1",
    customer: "Digital Agency Co.",
    amount: "$199.00",
    plan: "Agency",
    date: "2024-01-15",
    status: "completed",
  },
  { id: "2", customer: "Sarah Johnson", amount: "$29.00", plan: "Pro", date: "2024-01-15", status: "completed" },
  {
    id: "3",
    customer: "Tech Solutions Ltd.",
    amount: "$499.00",
    plan: "Enterprise",
    date: "2024-01-14",
    status: "completed",
  },
  { id: "4", customer: "Mike Chen", amount: "$29.00", plan: "Pro", date: "2024-01-14", status: "failed" },
  { id: "5", customer: "Emma Wilson", amount: "$29.00", plan: "Pro", date: "2024-01-13", status: "completed" },
]

export function RevenueDashboard() {
  return (
    <div className="space-y-6">
      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$847,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23.1%
              </span>
              from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,201</div>
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
            <CardTitle className="text-sm font-medium">Average Revenue Per User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$33.72</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  color: "hsl(var(--chart-1))",
                },
                subscriptions: {
                  label: "Subscriptions",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                  <Line type="monotone" dataKey="subscriptions" stroke="var(--color-subscriptions)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Revenue breakdown by subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                free: { label: "Free", color: "#8884d8" },
                pro: { label: "Pro", color: "#82ca9d" },
                agency: { label: "Agency", color: "#ffc658" },
                enterprise: { label: "Enterprise", color: "#ff7300" },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stripe Integration Section */}
      <Card>
        <CardHeader>
          <CardTitle>Stripe Integration</CardTitle>
          <CardDescription>Payment processing and transaction management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">98.7%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">$1,247</div>
              <p className="text-sm text-muted-foreground">Failed Payments</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-sm text-muted-foreground">Avg Processing Time</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Transactions
            </Button>
            <Button variant="outline">View Stripe Dashboard</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payment transactions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-muted-foreground">{transaction.plan} Plan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <Badge
                    className={
                      transaction.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
