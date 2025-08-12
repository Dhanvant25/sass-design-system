"use client"

import type React from "react"

import { useState } from "react"
import { X, ImageIcon, Video, Sparkles, RefreshCw, Send, Save, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CreatePostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const platforms = [
  { id: "instagram", name: "Instagram", icon: "📷", color: "from-purple-500 to-pink-500" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "from-blue-600 to-blue-700" },
  { id: "twitter", name: "Twitter", icon: "𝕏", color: "from-gray-800 to-black" },
  { id: "facebook", name: "Facebook", icon: "📘", color: "from-blue-500 to-blue-600" },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "from-black to-red-500" },
]

const aiSuggestions = [
  "🌟 Exciting news! Our latest product launch is here. Discover what makes it special and join thousands of happy customers. #Innovation #NewProduct",
  "💡 Pro tip: Did you know that 73% of marketers say social media marketing has been effective for their business? Here's how to make it work for you...",
  "🎯 Behind the scenes: Take a look at our team's creative process and see how we bring ideas to life. What's your creative process like?",
]

export function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [postContent, setPostContent] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null)

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]
    setPostContent(randomSuggestion)
    setIsGeneratingAI(false)
  }

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedMedia(file)
    }
  }

  const handleSave = () => {
    // Handle save logic
    console.log("Saving post...")
    onOpenChange(false)
  }

  const handleSchedule = () => {
    // Handle schedule logic
    console.log("Scheduling post...")
    onOpenChange(false)
  }

  const handlePublishNow = () => {
    // Handle publish logic
    console.log("Publishing post now...")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>Create and schedule content across your social media platforms</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Platforms</Label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-xs`}
                    >
                      {platform.icon}
                    </div>
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="post-title" className="text-sm font-medium">
                  Post Title
                </Label>
                <Button variant="outline" size="sm" onClick={handleAIGenerate} disabled={isGeneratingAI}>
                  {isGeneratingAI ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Input
                id="post-title"
                placeholder="Enter post title..."
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="post-content" className="text-sm font-medium">
                Content
              </Label>
              <Textarea
                id="post-content"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{postContent.length} characters</span>
                <span>Recommended: 125-150 characters for Twitter</span>
              </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Media</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                {selectedMedia ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {selectedMedia.type.startsWith("image/") ? (
                        <ImageIcon className="w-6 h-6 text-primary" />
                      ) : (
                        <Video className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{selectedMedia.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedMedia.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedMedia(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-muted mx-auto mb-3 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your media here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                      id="media-upload"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="media-upload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Scheduling */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Schedule</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="scheduled-date" className="text-xs text-muted-foreground">
                    Date
                  </Label>
                  <Input
                    id="scheduled-date"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="scheduled-time" className="text-xs text-muted-foreground">
                    Time
                  </Label>
                  <Input
                    id="scheduled-time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Suggestions
                </CardTitle>
                <CardDescription className="text-xs">Click on any suggestion to use it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPostContent(suggestion)}
                    className="w-full p-3 text-left text-xs bg-muted/50 hover:bg-muted rounded-lg transition-colors border border-border/50 hover:border-primary/20"
                  >
                    {suggestion}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Preview</CardTitle>
                <CardDescription className="text-xs">How your post will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedPlatforms.length > 0 ? (
                    selectedPlatforms.map((platformId) => {
                      const platform = platforms.find((p) => p.id === platformId)
                      return (
                        <div key={platformId} className="p-3 border border-border/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`w-5 h-5 rounded bg-gradient-to-br ${platform?.color} flex items-center justify-center text-white text-xs`}
                            >
                              {platform?.icon}
                            </div>
                            <span className="text-xs font-medium">{platform?.name}</span>
                          </div>
                          {postTitle && <h4 className="text-sm font-medium mb-1">{postTitle}</h4>}
                          <p className="text-xs text-muted-foreground line-clamp-3">
                            {postContent || "Your content will appear here..."}
                          </p>
                          {selectedMedia && (
                            <div className="mt-2 w-full h-20 bg-muted rounded border border-border/50 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">Media Preview</span>
                            </div>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-4">Select platforms to see preview</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/50">
          <Button variant="outline" onClick={handleSave} className="flex-1 bg-transparent">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={handleSchedule} className="flex-1 bg-transparent">
            <Clock className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
          <Button onClick={handlePublishNow} className="flex-1">
            <Send className="w-4 h-4 mr-2" />
            Publish Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
