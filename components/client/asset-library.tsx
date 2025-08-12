"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Upload,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
  Eye,
  Tag,
  Folder,
  ImageIcon,
  Video,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ClientAssetLibraryProps {
  clientId: string
}

// Mock agency branding
const agencyBranding = {
  primaryColor: "#6366F1",
}

const assets = [
  {
    id: 1,
    name: "summer-campaign-hero.jpg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadedAt: "2024-01-15T10:30:00",
    tags: ["summer", "campaign", "hero", "lifestyle"],
    folder: "Summer Campaign 2024",
    url: "/placeholder.svg?height=300&width=400&text=Summer+Hero",
    thumbnail: "/placeholder.svg?height=150&width=200&text=Summer+Hero",
  },
  {
    id: 2,
    name: "product-showcase-video.mp4",
    type: "video",
    size: "15.7 MB",
    dimensions: "1080x1920",
    uploadedAt: "2024-01-14T15:45:00",
    tags: ["product", "showcase", "vertical", "mobile"],
    folder: "Product Assets",
    url: "/placeholder.svg?height=400&width=300&text=Product+Video",
    thumbnail: "/placeholder.svg?height=200&width=150&text=Product+Video",
  },
  {
    id: 3,
    name: "brand-guidelines.pdf",
    type: "document",
    size: "5.2 MB",
    dimensions: null,
    uploadedAt: "2024-01-13T09:15:00",
    tags: ["brand", "guidelines", "document", "reference"],
    folder: "Brand Assets",
    url: "/placeholder.svg?height=300&width=200&text=Brand+Guidelines",
    thumbnail: "/placeholder.svg?height=150&width=100&text=PDF",
  },
]

const folders = [
  { name: "All Assets", count: assets.length },
  { name: "Summer Campaign 2024", count: 1 },
  { name: "Product Assets", count: 1 },
  { name: "Brand Assets", count: 1 },
]

export function ClientAssetLibrary({ clientId }: ClientAssetLibraryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFolder, setSelectedFolder] = useState("All Assets")
  const [searchQuery, setSearchQuery] = useState("")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "document":
        return FileText
      default:
        return FileText
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "text-green-500"
      case "video":
        return "text-blue-500"
      case "document":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Asset Library</h1>
            <p className="text-muted-foreground">Organize and manage all your brand assets</p>
          </div>
          <Button
            style={{ backgroundColor: agencyBranding.primaryColor }}
            className="w-fit text-white hover:opacity-90"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Assets
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  onClick={() => setSelectedFolder(folder.name)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    selectedFolder === folder.name ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    <span className="text-sm">{folder.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {folder.count}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters and Controls */}
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
                      placeholder="Search assets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Assets Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset, index) => {
                  const FileIcon = getFileIcon(asset.type)
                  return (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="border-border/50 hover:border-primary/20 transition-colors group cursor-pointer">
                        <CardContent className="p-4">
                          <div className="relative mb-4">
                            <img
                              src={asset.thumbnail || "/placeholder.svg"}
                              alt={asset.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <Button size="sm" variant="secondary">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="secondary">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div
                              className={`absolute top-2 left-2 w-6 h-6 rounded bg-background/90 flex items-center justify-center ${getFileTypeColor(asset.type)}`}
                            >
                              <FileIcon className="w-3 h-3" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-medium text-sm truncate">{asset.name}</h3>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{asset.size}</span>
                              {asset.dimensions && <span>{asset.dimensions}</span>}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {asset.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {asset.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{asset.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xs text-muted-foreground">
                              {new Date(asset.uploadedAt).toLocaleDateString()}
                            </span>
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
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tag className="w-4 h-4 mr-2" />
                                  Manage Tags
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <Card className="border-border/50">
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {assets.map((asset, index) => {
                      const FileIcon = getFileIcon(asset.type)
                      return (
                        <motion.div
                          key={asset.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="flex items-center gap-4 p-4 border-b border-border/50 last:border-b-0 hover:bg-muted/50 transition-colors"
                        >
                          <img
                            src={asset.thumbnail || "/placeholder.svg"}
                            alt={asset.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <FileIcon className={`w-4 h-4 ${getFileTypeColor(asset.type)}`} />
                              <h3 className="font-medium text-sm truncate">{asset.name}</h3>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{asset.size}</span>
                              {asset.dimensions && <span>{asset.dimensions}</span>}
                              <span>{new Date(asset.uploadedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {asset.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
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
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Tag className="w-4 h-4 mr-2" />
                                Manage Tags
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
