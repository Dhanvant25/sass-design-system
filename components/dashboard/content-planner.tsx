"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Plus, Search, MoreHorizontal, Edit, Trash2, Copy, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreatePostModal } from "@/components/dashboard/create-post-modal"

const scheduledPosts = [
  {
    id: 1,
    title: "Summer campaign launch",
    content:
      "Exciting news! Our summer collection is here. Check out the latest trends and get ready to shine! ✨ #SummerVibes #NewCollection",
    platform: "Instagram",
    scheduledTime: "2024-01-15T15:00:00",
    status: "scheduled",
    image: "/placeholder.svg?height=100&width=100&text=Summer",
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: 2,
    title: "Industry insights article",
    content:
      "The future of social media marketing: 5 trends to watch in 2024. Read our latest blog post to stay ahead of the curve.",
    platform: "LinkedIn",
    scheduledTime: "2024-01-16T09:00:00",
    status: "scheduled",
    image: null,
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: 3,
    title: "Behind the scenes video",
    content: "Take a peek behind the scenes of our latest photoshoot! 🎬 #BehindTheScenes #TeamWork",
    platform: "TikTok",
    scheduledTime: "2024-01-16T18:00:00",
    status: "draft",
    image: "/placeholder.svg?height=100&width=100&text=BTS",
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: 4,
    title: "Product announcement",
    content:
      "🚀 Big announcement coming tomorrow! Can you guess what it is? Drop your guesses in the comments below! #ComingSoon",
    platform: "Twitter",
    scheduledTime: "2024-01-17T12:00:00",
    status: "published",
    image: null,
    engagement: { likes: 24, comments: 8, shares: 12 },
  },
]

const platforms = [
  { value: "all", label: "All Platforms" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
]

export function ContentPlannerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredPosts = scheduledPosts.filter((post) => {
    const matchesPlatform = selectedPlatform === "all" || post.platform.toLowerCase() === selectedPlatform
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesPlatform && matchesStatus && matchesSearch
  })

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return "from-purple-500 to-pink-500"
      case "linkedin":
        return "from-blue-600 to-blue-700"
      case "twitter":
        return "from-gray-800 to-black"
      case "tiktok":
        return "from-black to-red-500"
      case "facebook":
        return "from-blue-500 to-blue-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default"
      case "scheduled":
        return "secondary"
      case "draft":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Planner</h1>
            <p className="text-muted-foreground">Plan, schedule, and manage your social media content</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              List
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {viewMode === "calendar" ? (
        /* Calendar View */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate ? selectedDate.toDateString() : "Select a date"}
                </CardTitle>
                <CardDescription>{filteredPosts.length} posts scheduled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-6 h-6 rounded bg-gradient-to-br ${getPlatformColor(post.platform)} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {post.platform.charAt(0)}
                        </div>
                        <h3 className="font-medium text-foreground">{post.title}</h3>
                        <Badge variant={getStatusColor(post.status)} className="text-xs">
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{new Date(post.scheduledTime).toLocaleString()}</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No posts scheduled for this date</p>
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setShowCreateModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ) : (
        /* List View */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>All Posts</CardTitle>
              <CardDescription>{filteredPosts.length} posts found</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-6 h-6 rounded bg-gradient-to-br ${getPlatformColor(post.platform)} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {post.platform.charAt(0)}
                      </div>
                      <h3 className="font-medium text-foreground">{post.title}</h3>
                      <Badge variant={getStatusColor(post.status)} className="text-xs">
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.platform}</span>
                        <span>{new Date(post.scheduledTime).toLocaleString()}</span>
                        {post.status === "published" && (
                          <span>
                            {post.engagement.likes} likes, {post.engagement.comments} comments
                          </span>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
