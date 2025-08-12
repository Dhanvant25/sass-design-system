"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCard, Plus, Edit, Trash2, Check, X, DollarSign, Users } from "lucide-react"

// Mock subscription plans data
const subscriptionPlans = [
  {
    id: "1",
    name: "Free",
    price: 0,
    interval: "month",
    features: ["5 posts/month", "1 social account", "Basic analytics"],
    active: true,
    subscribers: 1200,
    revenue: 0,
  },
  {
    id: "2",
    name: "Pro",
    price: 29,
    interval: "month",
    features: ["Unlimited posts", "5 social accounts", "Advanced analytics", "AI content suggestions"],
    active: true,
    subscribers: 800,
    revenue: 23200,
  },
  {
    id: "3",
    name: "Agency",
    price: 199,
    interval: "month",
    features: ["White-label portal", "Unlimited clients", "Team collaboration", "Priority support"],
    active: true,
    subscribers: 156,
    revenue: 31044,
  },
  {
    id: "4",
    name: "Enterprise",
    price: 499,
    interval: "month",
    features: ["Custom integrations", "Dedicated support", "SLA guarantee", "Custom branding"],
    active: true,
    subscribers: 45,
    revenue: 22455,
  },
]

export function SubscriptionManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<any>(null)

  const totalRevenue = subscriptionPlans.reduce((sum, plan) => sum + plan.revenue, 0)
  const totalSubscribers = subscriptionPlans.reduce((sum, plan) => sum + plan.subscribers, 0)

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly recurring revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Revenue Per User</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / totalSubscribers).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per subscriber</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Manage pricing plans and features</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Plan</DialogTitle>
                  <DialogDescription>Add a new subscription plan with custom pricing and features.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Plan name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input id="price" type="number" placeholder="29" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="features" className="text-right">
                      Features
                    </Label>
                    <Input id="features" placeholder="Feature 1, Feature 2" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Plan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{plan.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {plan.features.slice(0, 2).join(", ")}
                        {plan.features.length > 2 && "..."}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${plan.price}/{plan.interval}
                    </div>
                  </TableCell>
                  <TableCell>{plan.subscribers.toLocaleString()}</TableCell>
                  <TableCell>${plan.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={plan.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {plan.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setEditingPlan(plan)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Plan Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
          <CardDescription>Compare features across all subscription plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  {subscriptionPlans.map((plan) => (
                    <th key={plan.id} className="text-center p-2">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Posts per month</td>
                  <td className="text-center p-2">5</td>
                  <td className="text-center p-2">Unlimited</td>
                  <td className="text-center p-2">Unlimited</td>
                  <td className="text-center p-2">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Social accounts</td>
                  <td className="text-center p-2">1</td>
                  <td className="text-center p-2">5</td>
                  <td className="text-center p-2">Unlimited</td>
                  <td className="text-center p-2">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Analytics</td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">AI suggestions</td>
                  <td className="text-center p-2">
                    <X className="h-4 w-4 mx-auto text-red-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">White-label</td>
                  <td className="text-center p-2">
                    <X className="h-4 w-4 mx-auto text-red-600" />
                  </td>
                  <td className="text-center p-2">
                    <X className="h-4 w-4 mx-auto text-red-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Priority support</td>
                  <td className="text-center p-2">
                    <X className="h-4 w-4 mx-auto text-red-600" />
                  </td>
                  <td className="text-center p-2">
                    <X className="h-4 w-4 mx-auto text-red-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                  <td className="text-center p-2">
                    <Check className="h-4 w-4 mx-auto text-green-600" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Global Pricing Settings</CardTitle>
          <CardDescription>Configure platform-wide pricing options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Free Trial Period</Label>
                <div className="text-sm text-muted-foreground">Allow new users to try Pro features for free</div>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="number" defaultValue="14" className="w-20" />
                <span className="text-sm">days</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Annual Discount</Label>
                <div className="text-sm text-muted-foreground">Discount percentage for annual subscriptions</div>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="number" defaultValue="20" className="w-20" />
                <span className="text-sm">%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Grace Period</Label>
                <div className="text-sm text-muted-foreground">Days before suspending failed payments</div>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="number" defaultValue="3" className="w-20" />
                <span className="text-sm">days</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Promo Codes</Label>
                <div className="text-sm text-muted-foreground">Allow users to apply promotional discount codes</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Tax Collection</Label>
                <div className="text-sm text-muted-foreground">Automatically collect taxes based on location</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="pt-4">
              <Button>Save Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
