"use client"

import { useState } from "react"
import {
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  FolderPlus,
  MoreVertical,
  Download,
  Trash2,
  Eye,
  Heart,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OptimizedImage } from "@/components/optimized-image"
import { SwipeableCarousel } from "@/components/mobile/swipeable-carousel"
import { MobileModal } from "@/components/mobile/mobile-modal"
import { useIsMobile } from "@/hooks/use-mobile"

// Mock data
const folders = [
  { id: 1, name: "Brand Assets", count: 24, color: "#6366F1" },
  { id: 2, name: "Social Media", count: 156, color: "#F59E0B" },
  { id: 3, name: "Product Photos", count: 89, color: "#10B981" },
  { id: 4, name: "Templates", count: 45, color: "#EF4444" },
  { id: 5, name: "Videos", count: 12, color: "#8B5CF6" },
]

const assets = [
  {
    id: 1,
    name: "Brand Logo Primary",
    type: "image",
    format: "PNG",
    size: "2.4 MB",
    dimensions: "1200x800",
    url: "/placeholder.svg?height=400&width=600&text=Brand+Logo",
    folder: "Brand Assets",
    tags: ["logo", "brand", "primary"],
    createdAt: "2024-01-15",
    likes: 12,
  },
  {
    id: 2,
    name: "Social Media Template",
    type: "image",
    format: "JPG",
    size: "1.8 MB",
    dimensions: "1080x1080",
    url: "/placeholder.svg?height=400&width=400&text=Social+Template",
    folder: "Social Media",
    tags: ["template", "social", "instagram"],
    createdAt: "2024-01-14",
    likes: 8,
  },
  {
    id: 3,
    name: "Product Hero Image",
    type: "image",
    format: "JPG",
    size: "3.2 MB",
    dimensions: "1920x1080",
    url: "/placeholder.svg?height=400&width=600&text=Product+Hero",
    folder: "Product Photos",
    tags: ["product", "hero", "banner"],
    createdAt: "2024-01-13",
    likes: 15,
  },
  {
    id: 4,
    name: "Promotional Video",
    type: "video",
    format: "MP4",
    size: "45.6 MB",
    dimensions: "1920x1080",
    url: "/placeholder.svg?height=400&width=600&text=Video+Thumbnail",
    folder: "Videos",
    tags: ["video", "promo", "marketing"],
    createdAt: "2024-01-12",
    likes: 23,
  },
]

export function AssetLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const isMobile = useIsMobile()

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFolder = !selectedFolder || asset.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  const FolderCard = ({ folder }: { folder: any }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedFolder(folder.name)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${folder.color}20` }}
          >
            <div className="w-4 h-4 rounded" style={{ backgroundColor: folder.color }} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{folder.name}</h3>
            <p className="text-sm text-muted-foreground">{folder.count} items</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const AssetCard = ({ asset }: { asset: any }) => (
    <Card className="group cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <OptimizedImage
            src={asset.url}
            alt={asset.name}
            fill
            className="rounded-t-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedAsset(asset)
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary">
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Type Badge */}
          <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
            {asset.format}
          </Badge>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-3 h-3" />
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
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-sm text-foreground truncate">{asset.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              {asset.dimensions} • {asset.size}
            </span>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{asset.likes}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Asset Library</h1>
          <p className="text-muted-foreground">Manage your brand assets, images, and media files</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline">
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedFolder && (
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => setSelectedFolder(null)} className="text-primary hover:underline">
            All Folders
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{selectedFolder}</span>
        </div>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Assets</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Mobile Folder Carousel */}
          {isMobile && !selectedFolder && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Folders</h2>
              <SwipeableCarousel
                items={folders.map((folder) => <FolderCard key={folder.id} folder={folder} />)}
                itemsPerView={1.2}
                showDots={false}
              />
            </div>
          )}

          {/* Desktop Folders Grid */}
          {!isMobile && !selectedFolder && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Folders</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {folders.map((folder) => (
                  <FolderCard key={folder.id} folder={folder} />
                ))}
              </div>
            </div>
          )}

          {/* Assets Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {selectedFolder || "All Assets"} ({filteredAssets.length})
              </h2>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredAssets.map((asset) => (
                  <Card key={asset.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                        <OptimizedImage src={asset.url} alt={asset.name} fill sizes="64px" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{asset.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {asset.format} • {asset.dimensions} • {asset.size}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Preview</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="folders">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {assets.slice(0, 8).map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <MobileModal
          isOpen={!!selectedAsset}
          onClose={() => setSelectedAsset(null)}
          title={selectedAsset.name}
          size="lg"
        >
          <div className="p-6 space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <OptimizedImage
                src={selectedAsset.url}
                alt={selectedAsset.name}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Format</span>
                <Badge variant="secondary">{selectedAsset.format}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Dimensions</span>
                <span className="text-sm">{selectedAsset.dimensions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">File Size</span>
                <span className="text-sm">{selectedAsset.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">{selectedAsset.createdAt}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </MobileModal>
      )}

      {/* Upload Modal */}
      <MobileModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Assets" size="md">
        <div className="p-6">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload your assets</h3>
            <p className="text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
            <Button>Choose Files</Button>
          </div>
        </div>
      </MobileModal>
    </div>
  )
}
