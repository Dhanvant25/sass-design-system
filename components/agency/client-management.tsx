"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  MoreHorizontal,
  Eye,
  Settings,
  Trash2,
  Mail,
  Calendar,
  TrendingUp,
  Users,
  UserPlus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InviteClientModal } from "@/components/agency/invite-client-modal"

// Mock agency branding
const agencyBranding = {
  primaryColor: "#6366F1",
}

const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    logo: "/placeholder.svg?height=60&width=60&text=AC",
    status: "active",
    plan: "Pro",
    joinedDate: "2024-01-15",
    postsThisMonth: 24,
    engagement: 5.2,
    socialAccounts: 4,
    lastLogin: "2 hours ago",
    totalPosts: 156,
    avgEngagement: 4.8,
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "hello@techstart.com",
    logo: "/placeholder.svg?height=60&width=60&text=TS",
    status: "active",
    plan: "Business",
    joinedDate: "2024-01-10",
    postsThisMonth: 18,
    engagement: 4.1,
    socialAccounts: 3,
    lastLogin: "5 hours ago",
    totalPosts: 89,
    avgEngagement: 3.9,
  },
  {
    id: 3,
    name: "Creative Studio",
    email: "info@creativestudio.com",
    logo: "/placeholder.svg?height=60&width=60&text=CS",
    status: "pending",
    plan: "Pro",
    joinedDate: "2024-01-20",
    postsThisMonth: 0,
    engagement: 0,
    socialAccounts: 0,
    lastLogin: "Never",
    totalPosts: 0,
    avgEngagement: 0,
  },
  {
    id: 4,
    name: "Bloom Wellness",
    email: "team@bloomwellness.com",
    logo: "/placeholder.svg?height=60&width=60&text=BW",
    status: "active",
    plan: "Enterprise",
    joinedDate: "2023-12-05",
    postsThisMonth: 31,
    engagement: 6.8,
    socialAccounts: 5,
    lastLogin: "1 hour ago",
    totalPosts: 234,
    avgEngagement: 6.2,
  },
  {
    id: 5,
    name: "Fashion Forward",
    email: "contact@fashionforward.com",
    logo: "/placeholder.svg?height=60&width=60&text=FF",
    status: "inactive",
    plan: "Pro",
    joinedDate: "2023-11-20",
    postsThisMonth: 2,
    engagement: 2.1,
    socialAccounts: 2,
    lastLogin: "2 weeks ago",
    totalPosts: 67,
    avgEngagement: 2.8,
  },
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
]

const planOptions = [
  { value: "all", label: "All Plans" },
  { value: "pro", label: "Pro" },
  { value: "business", label: "Business" },
  { value: "enterprise", label: "Enterprise" },
]

export function ClientManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPlan, setSelectedPlan] = useState("all")
  const [showInviteModal, setShowInviteModal] = useState(false)

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || client.status === selectedStatus
    const matchesPlan = selectedPlan === "all" || client.plan.toLowerCase() === selectedPlan

    return matchesSearch && matchesStatus && matchesPlan
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "enterprise":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "business":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "pro":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Client Management</h1>
            <p className="text-muted-foreground">Manage your clients and their social media accounts</p>
          </div>
          <Button
            onClick={() => setShowInviteModal(true)}
            style={{ backgroundColor: agencyBranding.primaryColor }}
            className="w-fit text-white hover:opacity-90"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Client
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold text-foreground">{clients.length}</p>
                </div>
                <Users className="w-8 h-8" style={{ color: agencyBranding.primaryColor }} />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                  <p className="text-2xl font-bold text-foreground">
                    {clients.filter((c) => c.status === "active").length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Invites</p>
                  <p className="text-2xl font-bold text-foreground">
                    {clients.filter((c) => c.status === "pending").length}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold text-foreground">
                    {clients.reduce((sum, client) => sum + client.totalPosts, 0)}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {planOptions.map((plan) => (
                    <SelectItem key={plan.value} value={plan.value}>
                      {plan.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Clients Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-border/50 hover:border-primary/20 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={client.logo || "/placeholder.svg"} />
                        <AvatarFallback>{client.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription>{client.email}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(client.status)} className="text-xs">
                        {client.status}
                      </Badge>
                      <Badge className={`text-xs ${getPlanColor(client.plan)}`}>{client.plan}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{client.postsThisMonth}</p>
                      <p className="text-xs text-muted-foreground">Posts This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{client.engagement}%</p>
                      <p className="text-xs text-muted-foreground">Avg Engagement</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{client.socialAccounts}</p>
                      <p className="text-xs text-muted-foreground">Social Accounts</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Joined: {new Date(client.joinedDate).toLocaleDateString()}</span>
                    <span>Last login: {client.lastLogin}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                      <a href={`/client/${client.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Dashboard
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Client Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Invite Client Modal */}
      <InviteClientModal open={showInviteModal} onOpenChange={setShowInviteModal} />
    </div>
  )
}
