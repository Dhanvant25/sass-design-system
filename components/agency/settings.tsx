"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Users,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Trash2,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { agencyInfoSchema } from "@/schema/agency/agencyInfoSchema";
import { useAuth } from "@/store/AuthContext";
import { useGet, usePut } from "@/api/apiMethode";
import toast, { Toaster } from "react-hot-toast";

// Mock agency branding
const agencyBranding = {
  primaryColor: "#6366F1",
};

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@agency.com",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    lastActive: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@agency.com",
    role: "Manager",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    lastActive: "1 day ago",
    status: "active",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@agency.com",
    role: "Editor",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    lastActive: "3 days ago",
    status: "inactive",
  },
];

type AgencyInfoFormData = {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
};

export function AgencySettings() {
  const [notifications, setNotifications] = useState({
    clientSignups: true,
    postPublished: true,
    weeklyReports: true,
    systemUpdates: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuth();

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AgencyInfoFormData>({
    resolver: yupResolver(agencyInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      address: "",
    },
  });

  const onSubmit = async (data: AgencyInfoFormData) => {
    console.log("Agency Info:", data);

    const payload = {
      name: data.name,
    };

    try {
      setIsLoading(true);
      const { res, error } = await usePut(
        `/api/agencies/${userData?.id}`,
        payload
      );

      if (error) {
        console.error("API ERROR", error);
        toast.error(error?.message || "Error occurred");
        return;
      }

      if (res?.success) {
        console.log("respose", res);
        toast.success(res?.message || "Agency updated successfully");
      }
    } catch (error) {
      console.error("Unexpected error while fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAgencyById = async () => {
    console.log("Agency Id", userData, userData?.id);
    if (userData?.id || true) {
      const { res, error } = await useGet(`/api/agencies/${userData?.id}`);

      if (res?.success) {
        console.log("respose", res);
        setValue(`name`, res?.data?.name);
        setValue(`email`, res?.data?.email);
        setValue(`phone`, res?.data?.phone);
        setValue(`website`, res?.data?.website);
        setValue(`address`, res?.data?.address);
      }
    }
  };

  useEffect(() => {
    getAgencyById();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Agency Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your agency account and team settings
          </p>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Agency Information</CardTitle>
                  <CardDescription>
                    Basic information about your agency
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="agency-name">Agency Name</Label>
                      <Input id="agency-name" {...register("name")} />
                      {errors.name && (
                        <p className="text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agency-email">Contact Email</Label>
                      <Input
                        id="agency-email"
                        type="email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agency-phone">Phone Number</Label>
                      <Input
                        id="agency-phone"
                        type="tel"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agency-website">Website</Label>
                      <Input
                        id="agency-website"
                        type="url"
                        {...register("website")}
                      />
                      {errors.website && (
                        <p className="text-sm text-red-500">
                          {errors.website.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-address">Address</Label>
                    <Input id="agency-address" {...register("address")} />
                    {errors.address && (
                      <p className="text-sm text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    style={{ backgroundColor: agencyBranding.primaryColor }}
                    className="text-white hover:opacity-90"
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Manage your agency team and their permissions
                    </CardDescription>
                  </div>
                  <Button
                    style={{ backgroundColor: agencyBranding.primaryColor }}
                    className="text-white hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {member.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active: {member.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          member.status === "active" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {member.status}
                      </Badge>
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  Manage your agency subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Agency White-Label Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlimited clients • Custom branding • Priority support
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Next billing date: Feb 15, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$199</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="bg-transparent">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>
                  Your current usage across all clients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground">
                      Active Clients
                    </p>
                    <p className="text-xs text-muted-foreground">Unlimited</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">1,247</p>
                    <p className="text-sm text-muted-foreground">
                      Posts This Month
                    </p>
                    <p className="text-xs text-muted-foreground">Unlimited</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">8</p>
                    <p className="text-sm text-muted-foreground">
                      Team Members
                    </p>
                    <p className="text-xs text-muted-foreground">Unlimited</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="client-signups"
                        className="text-base font-medium"
                      >
                        Client Signups
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new clients join
                      </p>
                    </div>
                    <Switch
                      id="client-signups"
                      checked={notifications.clientSignups}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("clientSignups", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="post-published"
                        className="text-base font-medium"
                      >
                        Posts Published
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when client posts are published
                      </p>
                    </div>
                    <Switch
                      id="post-published"
                      checked={notifications.postPublished}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("postPublished", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="weekly-reports"
                        className="text-base font-medium"
                      >
                        Weekly Reports
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly performance reports
                      </p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("weeklyReports", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="system-updates"
                        className="text-base font-medium"
                      >
                        System Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about platform updates
                      </p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("systemUpdates", checked)
                      }
                    />
                  </div>
                </div>
                <Button
                  style={{ backgroundColor: agencyBranding.primaryColor }}
                  className="text-white hover:opacity-90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage security settings for your agency account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Badge variant="outline">Not Enabled</Badge>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    Enable 2FA
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-sm text-muted-foreground">
                        Manage active sessions
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      View Sessions
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API Access</p>
                      <p className="text-sm text-muted-foreground">
                        Manage API keys and access
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      Manage API Keys
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      <Toaster />
    </div>
  );
}
