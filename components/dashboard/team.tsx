"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MobileTable } from "@/components/mobile/mobile-table"
import { Plus, MoreHorizontal, Mail, Shield, User, Crown, Settings, Trash2 } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    status: "Active",
    lastActive: "2 hours ago",
    joinDate: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@company.com",
    role: "Editor",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    status: "Active",
    lastActive: "1 day ago",
    joinDate: "Jan 10, 2024",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@company.com",
    role: "Viewer",
    avatar: "/placeholder.svg?height=40&width=40&text=ER",
    status: "Invited",
    lastActive: "Never",
    joinDate: "Jan 20, 2024",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david@company.com",
    role: "Editor",
    avatar: "/placeholder.svg?height=40&width=40&text=DT",
    status: "Active",
    lastActive: "5 minutes ago",
    joinDate: "Dec 28, 2023",
  },
]

const rolePermissions = {
  Admin: {
    icon: Crown,
    color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    permissions: ["Full access", "User management", "Billing", "Settings"],
  },
  Editor: {
    icon: Settings,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    permissions: ["Create content", "Edit posts", "Schedule posts", "View analytics"],
  },
  Viewer: {
    icon: User,
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    permissions: ["View content", "View analytics", "Comment on posts"],
  },
}

export function Team() {
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Viewer")
  const isMobile = useMobile()

  const handleInvite = () => {
    // Handle invite logic here
    console.log("Inviting:", inviteEmail, "as", inviteRole)
    setIsInviteOpen(false)
    setInviteEmail("")
    setInviteRole("Viewer")
  }

  const getRoleIcon = (role: string) => {
    const roleConfig = rolePermissions[role as keyof typeof rolePermissions]
    return roleConfig?.icon || User
  }

  const getRoleColor = (role: string) => {
    const roleConfig = rolePermissions[role as keyof typeof rolePermissions]
    return roleConfig?.color || "bg-gray-100 text-gray-700"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Invited":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const mobileTableData = teamMembers.map((member) => ({
    id: member.id,
    primary: member.name,
    secondary: member.email,
    avatar: member.avatar,
    badges: [
      { text: member.role, variant: "outline" as const },
      { text: member.status, variant: "secondary" as const },
    ],
    details: [
      { label: "Last Active", value: member.lastActive },
      { label: "Joined", value: member.joinDate },
    ],
    actions: [
      { label: "Edit Role", onClick: () => console.log("Edit", member.id) },
      { label: "Remove", onClick: () => console.log("Remove", member.id), destructive: true },
    ],
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your team members and their permissions</p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to join your team with the specified role.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInvite} disabled={!inviteEmail}>
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(rolePermissions).map(([role, config]) => (
          <Card key={role}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <config.icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">{role}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {config.permissions.map((permission) => (
                  <li key={permission} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {permission}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({teamMembers.length})</CardTitle>
          <CardDescription>Manage your team members and their access levels</CardDescription>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <MobileTable data={mobileTableData} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Member</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Last Active</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Joined</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => {
                    const RoleIcon = getRoleIcon(member.role)
                    return (
                      <tr key={member.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className={getRoleColor(member.role)}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {member.role}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="secondary" className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">{member.lastActive}</td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">{member.joinDate}</td>
                        <td className="py-4 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Resend Invite
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="w-4 h-4 mr-2" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
