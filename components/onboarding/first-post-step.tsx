"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Sparkles, Send, Instagram, Facebook, Twitter } from "lucide-react"

interface FirstPostStepProps {
  onNext: () => void
}

const connectedPlatforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-sky-500" },
]

export function FirstPostStep({ onNext }: FirstPostStepProps) {
  const [postContent, setPostContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"])
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateContent = () => {
    setIsGenerating(true)

    // Simulate AI content generation
    setTimeout(() => {
      setPostContent(
        "🚀 Excited to share our latest project! We've been working hard to bring you something amazing. Stay tuned for more updates! #innovation #excited #newproject",
      )
      setIsGenerating(false)
    }, 2000)
  }

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const handleSchedulePost = () => {
    // Simulate post scheduling
    setTimeout(() => {
      onNext()
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Create Your First Post</h2>
        <p className="text-muted-foreground">
          Let's create and schedule your first social media post. You can use AI to generate content or write your own.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        {/* Content Creation */}
        <Card className="border-0 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Post Content</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateContent}
                disabled={isGenerating}
                className="flex items-center bg-transparent"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate with AI"}
              </Button>
            </div>

            <Textarea
              placeholder="What's on your mind? Write your post content here..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
              className="resize-none"
            />

            <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
              <span>{postContent.length}/280 characters</span>
              <span>💡 Tip: Use hashtags and emojis to increase engagement</span>
            </div>
          </CardContent>
        </Card>

        {/* Platform Selection */}
        <Card className="border-0 bg-card/50">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Select Platforms</h3>

            <div className="space-y-3">
              {connectedPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded ${platform.color} flex items-center justify-center`}>
                      <platform.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </div>

                  {selectedPlatforms.includes(platform.id) && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduling Options */}
        <Card className="border-0 bg-card/50">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">When to Post</h3>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  scheduleType === "now" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setScheduleType("now")}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Send className="w-5 h-5 text-primary" />
                  <span className="font-medium">Post Now</span>
                </div>
                <p className="text-sm text-muted-foreground">Publish immediately to selected platforms</p>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  scheduleType === "later" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setScheduleType("later")}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">Schedule Later</span>
                </div>
                <p className="text-sm text-muted-foreground">Choose optimal posting time</p>
              </div>
            </div>

            {scheduleType === "later" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      className="bg-transparent border border-input rounded px-2 py-1 text-sm"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="time"
                      className="bg-transparent border border-input rounded px-2 py-1 text-sm"
                      defaultValue="12:00"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        {postContent && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-0 bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Preview</h3>

                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">B</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Your Brand</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed">{postContent}</p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="flex space-x-4 text-muted-foreground">
                      <span className="text-xs">👍 Like</span>
                      <span className="text-xs">💬 Comment</span>
                      <span className="text-xs">📤 Share</span>
                    </div>
                    <div className="flex space-x-1">
                      {selectedPlatforms.map((platformId) => {
                        const platform = connectedPlatforms.find((p) => p.id === platformId)
                        return platform ? (
                          <div
                            key={platformId}
                            className={`w-4 h-4 rounded ${platform.color} flex items-center justify-center`}
                          >
                            <platform.icon className="w-2 h-2 text-white" />
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <Button
          onClick={handleSchedulePost}
          disabled={!postContent || selectedPlatforms.length === 0}
          size="lg"
          className="px-8"
        >
          {scheduleType === "now" ? "Post Now" : "Schedule Post"}
        </Button>

        <p className="text-sm text-muted-foreground mt-2">
          {scheduleType === "now"
            ? "Your post will be published immediately"
            : "Your post will be scheduled for the selected time"}
        </p>
      </motion.div>
    </div>
  )
}
