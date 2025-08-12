"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "@/schema/dashboard/postSchema";

import * as yup from "yup";
import { useState } from "react";
import {
  X,
  ImageIcon,
  Video,
  Sparkles,
  RefreshCw,
  Send,
  Save,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📷",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "𝕏",
    color: "from-gray-800 to-black",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    color: "from-blue-500 to-blue-600",
  },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "from-black to-red-500" },
];

const aiSuggestions = [
  "🌟 Exciting news! Our latest product launch is here. Discover what makes it special and join thousands of happy customers. #Innovation #NewProduct",
  "💡 Pro tip: Did you know that 73% of marketers say social media marketing has been effective for their business? Here's how to make it work for you...",
  "🎯 Behind the scenes: Take a look at our team's creative process and see how we bring ideas to life. What's your creative process like?",
];

interface FormValues {
  postTitle: string;
  postContent: string;
  scheduledDate?: string | null;
  scheduledTime?: string | null;
  selectedPlatforms?: string[];
}

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      postTitle: "",
      postContent: "",
      scheduledDate: "",
      scheduledTime: "",
      selectedPlatforms: [],
    },
  });

  const selectedPlatforms = watch("selectedPlatforms");
  const postContent = watch("postContent");

  const togglePlatform = (id: string) => {
    const current = watch("selectedPlatforms") || [];
    if (current.includes(id)) {
      setValue(
        "selectedPlatforms",
        current.filter((p) => p !== id)
      );
    } else {
      setValue("selectedPlatforms", [...current, id]);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedMedia(file);
    }
  };

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true);
    await new Promise((res) => setTimeout(res, 1500));
    const suggestion =
      aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setValue("postContent", suggestion);
    setIsGeneratingAI(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Create and schedule content across your social media platforms
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Platforms</Label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    type="button"
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                      selectedPlatforms?.includes(platform.id)
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
              {errors.selectedPlatforms && (
                <p className="text-sm text-red-500">
                  {errors.selectedPlatforms.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Post Title</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAIGenerate}
                  disabled={isGeneratingAI}
                >
                  {isGeneratingAI ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Input
                placeholder="Enter post title"
                {...register("postTitle")}
              />
              {errors.postTitle && (
                <p className="text-sm text-red-500">
                  {errors.postTitle.message}
                </p>
              )}
            </div>

            {/* Content */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Post Content</Label>
              <Textarea
                rows={6}
                placeholder="What's on your mind?"
                {...register("postContent")}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{postContent.length} characters</span>
                <span>Recommended: 125-150 characters for Twitter</span>
              </div>
              {errors.postContent && (
                <p className="text-sm text-red-500">
                  {errors.postContent.message}
                </p>
              )}
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
                      <p className="text-sm font-medium">
                        {selectedMedia.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedMedia.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMedia(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-muted mx-auto mb-3 flex items-center justify-center rounded-lg">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop or click to browse
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
                  <Label className="text-xs text-muted-foreground">Date</Label>
                  <Input type="date" {...register("scheduledDate")} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Time</Label>
                  <Input type="time" {...register("scheduledTime")} />
                </div>
              </div>
              {errors.scheduledDate && (
                <p className="text-sm text-red-500">
                  {errors.scheduledDate.message}
                </p>
              )}
              {errors.scheduledTime && (
                <p className="text-sm text-red-500">
                  {errors.scheduledTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Suggestions
                </CardTitle>
                <CardDescription className="text-xs">
                  Click a suggestion to use it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiSuggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full p-3 text-left text-xs bg-muted/50 hover:bg-muted rounded-lg border border-border/50 hover:border-primary/20 transition-colors"
                    onClick={() => setValue("postContent", s)}
                  >
                    {s}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Preview</CardTitle>
                <CardDescription className="text-xs">
                  How your post will look
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {(selectedPlatforms ?? []).length > 0 ? (
                  (selectedPlatforms ?? []).map((id) => {
                    const platform = platforms.find((p) => p.id === id);
                    return (
                      <div
                        key={id}
                        className="p-3 border border-border/50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-5 h-5 rounded bg-gradient-to-br ${platform?.color} flex items-center justify-center text-white text-xs`}
                          >
                            {platform?.icon}
                          </div>
                          <span className="text-xs font-medium">
                            {platform?.name}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium mb-1">
                          {watch("postTitle")}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {postContent || "Your content will appear here..."}
                        </p>
                        {selectedMedia && (
                          <div className="mt-2 w-full h-20 bg-muted rounded border border-border/50 flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                              Media Preview
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Select platforms to see preview
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/50 col-span-full">
            <Button
              type="submit"
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <Clock className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Publish Now
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
