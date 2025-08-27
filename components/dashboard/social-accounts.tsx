"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Check,
  X,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Settings,
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const socialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📷",
    color: "from-purple-500 to-pink-500",
    connected: false,
    account: "@yourcompany",
    followers: "8.4K",
    lastSync: "2 minutes ago",
    status: "active",
    autoPost: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "from-blue-600 to-blue-700",
    connected: true,
    account: "Your Company",
    followers: "2.1K",
    lastSync: "5 minutes ago",
    status: "active",
    autoPost: true,
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "𝕏",
    color: "from-gray-800 to-black",
    connected: true,
    account: "@yourcompany",
    followers: "1.8K",
    lastSync: "1 hour ago",
    status: "warning",
    autoPost: false,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    color: "from-blue-500 to-blue-600",
    connected: false,
    account: null,
    followers: null,
    lastSync: null,
    status: "disconnected",
    autoPost: false,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    color: "from-black to-red-500",
    connected: false,
    account: null,
    followers: null,
    lastSync: null,
    status: "disconnected",
    autoPost: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "📺",
    color: "from-red-500 to-red-600",
    connected: false,
    account: null,
    followers: null,
    lastSync: null,
    status: "disconnected",
    autoPost: false,
  },
];

export function SocialAccountsPage() {
  const [platforms, setPlatforms] = useState(socialPlatforms);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(
    null
  );

  const handleConnect = async (platformId: string) => {
    // setConnectingPlatform(platformId)
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 2000))

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_APP_ID ?? "",
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI ?? "",
      scope: "instagram_basic,instagram_manage_insights,pages_show_list",
      // scope: "user_profile,user_media",
      response_type: "code",
    });

    // window.location.href = `https://api.instagram.com/oauth/authorize?${params.toString()}`;
    window.location.href = `https://www.facebook.com/v23.0/dialog/oauth?${params.toString()}`;

    // setPlatforms((prev) =>
    //   prev.map((platform) =>
    //     platform.id === platformId
    //       ? {
    //           ...platform,
    //           connected: true,
    //           account: `@yourcompany`,
    //           followers: "0",
    //           lastSync: "Just now",
    //           status: "active" as const,
    //         }
    //       : platform,
    //   ),
    // )
    // setConnectingPlatform(null)
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId
          ? {
              ...platform,
              connected: false,
              account: null,
              followers: null,
              lastSync: null,
              status: "disconnected" as const,
              autoPost: false,
            }
          : platform
      )
    );
  };

  const handleToggleAutoPost = (platformId: string, enabled: boolean) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId
          ? { ...platform, autoPost: enabled }
          : platform
      )
    );
  };

  const connectedCount = platforms.filter((p) => p.connected).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Social Accounts
            </h1>
            <p className="text-muted-foreground">
              Connect and manage your social media accounts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {connectedCount} of {platforms.length} connected
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Connected Accounts Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>
              Your connected social media accounts and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms
                .filter((p) => p.connected)
                .map((platform) => (
                  <div
                    key={platform.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/50"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-lg`}
                    >
                      {platform.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {platform.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {platform.account}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {platform.followers} followers
                      </p>
                    </div>
                    <Badge
                      variant={
                        platform.status === "active" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {platform.status === "active" ? "Active" : "Warning"}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-xl`}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      {platform.connected ? (
                        <CardDescription>{platform.account}</CardDescription>
                      ) : (
                        <CardDescription>Not connected</CardDescription>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {platform.connected ? (
                      <Badge
                        variant={
                          platform.status === "active" ? "default" : "secondary"
                        }
                      >
                        {platform.status === "active" ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {platform.status === "active" ? "Connected" : "Warning"}
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <X className="w-3 h-3 mr-1" />
                        Disconnected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {platform.connected ? (
                  <>
                    {/* Account Stats */}
                    <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Followers
                        </p>
                        <p className="text-sm font-medium">
                          {platform.followers}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Last Sync
                        </p>
                        <p className="text-sm font-medium">
                          {platform.lastSync}
                        </p>
                      </div>
                    </div>

                    {/* Auto-posting Toggle */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label
                          htmlFor={`auto-post-${platform.id}`}
                          className="text-sm font-medium"
                        >
                          Auto-posting
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically publish scheduled posts
                        </p>
                      </div>
                      <Switch
                        id={`auto-post-${platform.id}`}
                        checked={platform.autoPost}
                        onCheckedChange={(checked) =>
                          handleToggleAutoPost(platform.id, checked)
                        }
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Disconnect {platform.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will disconnect your {platform.name} account
                              and stop all scheduled posts to this platform. You
                              can reconnect at any time.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDisconnect(platform.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Disconnect
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Connect your {platform.name} account to start publishing
                      content automatically.
                    </p>
                    <Button
                      onClick={() => handleConnect(platform.id)}
                      disabled={connectingPlatform === platform.id}
                      className="w-full"
                    >
                      {connectingPlatform === platform.id ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Connect {platform.name}
                        </>
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="border-border/50 bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Need Help?
            </CardTitle>
            <CardDescription>
              Having trouble connecting your accounts? Check out our help
              resources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1 bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Setup Guide
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
