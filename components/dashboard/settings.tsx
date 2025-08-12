"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Eye,
  EyeOff,
  Camera,
  Trash2,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  profileSchema,
  passwordSchema,
  preferencesSchema,
} from "@/schema/settings/settingsSchema";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  bio: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PreferencesFormData = {
  language: string;
  timezone: string;
  dateFormat: string;
};

export function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    security: true,
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@company.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Inc.",
      role: "Marketing Manager",
      bio: "Passionate marketing professional with 5+ years of experience in social media strategy and brand management.",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  const {
    control: preferencesControl,
    handleSubmit: handlePreferencesSubmit,
    formState: { errors: preferencesErrors },
  } = useForm<PreferencesFormData>({
    resolver: yupResolver(preferencesSchema),
    defaultValues: {
      language: "en",
      timezone: "pst",
      dateFormat: "mm-dd-yyyy",
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log("Password data:", data);
  };

  const onPreferencesSubmit = (data: PreferencesFormData) => {
    console.log("Preferences data:", data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
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
            <TabsTrigger
              value="preferences"
              className="flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleProfileSubmit(onProfileSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>First Name</Label>
                      <Input {...registerProfile("firstName")} />
                      {profileErrors.firstName && (
                        <p className="text-red-500 text-sm">
                          {profileErrors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input {...registerProfile("lastName")} />
                      {profileErrors.lastName && (
                        <p className="text-red-500 text-sm">
                          {profileErrors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" {...registerProfile("email")} />
                      {profileErrors.email && (
                        <p className="text-red-500 text-sm">
                          {profileErrors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input {...registerProfile("phone")} />
                      {profileErrors.phone && (
                        <p className="text-red-500 text-sm">
                          {profileErrors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input {...registerProfile("company")} />
                      {profileErrors.company && (
                        <p className="text-red-500 text-sm">
                          {profileErrors.company.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input {...registerProfile("role")} />
                      {profileErrors.role && (
                        <p className="text-red-500 text-sm">
                          {profileErrors.role.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      placeholder="Tell us about yourself..."
                      {...registerProfile("bio")}
                    />
                    {profileErrors.bio && (
                      <p className="text-red-500 text-sm">
                        {profileErrors.bio.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Billed monthly • Next billing date: Feb 15, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$29</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Update your payment information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/25
                      </p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>

                <Button variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View and download your invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Jan 15, 2024", amount: "$29.00", status: "Paid" },
                    { date: "Dec 15, 2023", amount: "$29.00", status: "Paid" },
                    { date: "Nov 15, 2023", amount: "$29.00", status: "Paid" },
                  ].map((invoice, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-muted-foreground">
                          Pro Plan
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{invoice.amount}</span>
                        <Badge variant="secondary">{invoice.status}</Badge>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
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
                  Choose how you want to be notified about updates and
                  activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="email-notifications"
                        className="text-base font-medium"
                      >
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("email", checked)
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="push-notifications"
                        className="text-base font-medium"
                      >
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("push", checked)
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="marketing-notifications"
                        className="text-base font-medium"
                      >
                        Marketing Communications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and promotions
                      </p>
                    </div>
                    <Switch
                      id="marketing-notifications"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("marketing", checked)
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="security-notifications"
                        className="text-base font-medium"
                      >
                        Security Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about security events
                      </p>
                    </div>
                    <Switch
                      id="security-notifications"
                      checked={notifications.security}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("security", checked)
                      }
                    />
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        {...registerPassword("currentPassword")}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="text-red-500 text-sm">
                        {passwordErrors.currentPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      {...registerPassword("newPassword")}
                      placeholder="Enter new password"
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-red-500 text-sm">
                        {passwordErrors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...registerPassword("confirmPassword")}
                      placeholder="Confirm new password"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {passwordErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handlePreferencesSubmit(onPreferencesSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    {/* Language */}
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Controller
                        name="language"
                        control={preferencesControl}
                        rules={{ required: "Language is required" }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {preferencesErrors.language && (
                        <p className="text-red-500 text-sm">
                          {preferencesErrors.language.message}
                        </p>
                      )}
                    </div>

                    {/* Timezone */}
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Controller
                        name="timezone"
                        control={preferencesControl}
                        rules={{ required: "Timezone is required" }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pst">
                                Pacific Standard Time
                              </SelectItem>
                              <SelectItem value="est">
                                Eastern Standard Time
                              </SelectItem>
                              <SelectItem value="cst">
                                Central Standard Time
                              </SelectItem>
                              <SelectItem value="mst">
                                Mountain Standard Time
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {preferencesErrors.timezone && (
                        <p className="text-red-500 text-sm">
                          {preferencesErrors.timezone.message}
                        </p>
                      )}
                    </div>

                    {/* Date Format */}
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Controller
                        name="dateFormat"
                        control={preferencesControl}
                        rules={{ required: "Date format is required" }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mm-dd-yyyy">
                                MM/DD/YYYY
                              </SelectItem>
                              <SelectItem value="dd-mm-yyyy">
                                DD/MM/YYYY
                              </SelectItem>
                              <SelectItem value="yyyy-mm-dd">
                                YYYY-MM-DD
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {preferencesErrors.dateFormat && (
                        <p className="text-red-500 text-sm">
                          {preferencesErrors.dateFormat.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics & Usage Data</p>
                    <p className="text-sm text-muted-foreground">
                      Help us improve by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Globe className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
