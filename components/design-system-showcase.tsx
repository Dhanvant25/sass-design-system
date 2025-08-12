"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Palette,
  Type,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Calendar,
  Users,
  TrendingUp,
  ImageIcon,
  Video,
  FileText,
} from "lucide-react"

export function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Automated Social Content & Brand Asset Manager</h1>
          <p className="text-xl text-muted-foreground">Global UI Design System</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Design System Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-6 lg:w-fit">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">Typography</span>
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Components</span>
          </TabsTrigger>
          <TabsTrigger value="responsive" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Responsive</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Color System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Primary, secondary, and neutral colors with dark mode support
                </p>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary"></div>
                  <div className="w-6 h-6 rounded-full bg-secondary"></div>
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Type className="w-5 h-5 text-secondary" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Inter font family with responsive scaling</p>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">Heading</div>
                  <div className="text-base">Body text</div>
                  <div className="text-sm text-muted-foreground">Caption</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-green-500" />
                  Responsive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Mobile-first design with breakpoint system</p>
                <div className="flex gap-1">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <Tablet className="w-4 h-4 text-muted-foreground" />
                  <Monitor className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layout className="w-5 h-5 text-purple-500" />
                  Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">WCAG 2.1 AA compliant components</p>
                <Badge variant="secondary" className="text-xs">
                  AA Compliant
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle>Design System Features</CardTitle>
              <CardDescription>Built with modern web standards and best practices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Modern & Minimal</h4>
                  <p className="text-sm text-muted-foreground">
                    Clean, professional interface with focus on usability and clarity
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Component Library</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive set of reusable UI components built with shadcn/ui
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Dark Mode Ready</h4>
                  <p className="text-sm text-muted-foreground">
                    Seamless light and dark theme switching with system preference detection
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Primary, secondary, and neutral colors with semantic variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Primary Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Primary Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-primary"></div>
                    <div className="text-sm">
                      <div className="font-medium">Primary</div>
                      <div className="text-muted-foreground">#3B82F6</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-primary/90"></div>
                    <div className="text-sm">
                      <div className="font-medium">Primary 90%</div>
                      <div className="text-muted-foreground">rgba(59,130,246,0.9)</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-primary/50"></div>
                    <div className="text-sm">
                      <div className="font-medium">Primary 50%</div>
                      <div className="text-muted-foreground">rgba(59,130,246,0.5)</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-primary/20"></div>
                    <div className="text-sm">
                      <div className="font-medium">Primary 20%</div>
                      <div className="text-muted-foreground">rgba(59,130,246,0.2)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Secondary Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-secondary"></div>
                    <div className="text-sm">
                      <div className="font-medium">Secondary</div>
                      <div className="text-muted-foreground">#F59E0B</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-secondary/90"></div>
                    <div className="text-sm">
                      <div className="font-medium">Secondary 90%</div>
                      <div className="text-muted-foreground">rgba(245,158,11,0.9)</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-secondary/50"></div>
                    <div className="text-sm">
                      <div className="font-medium">Secondary 50%</div>
                      <div className="text-muted-foreground">rgba(245,158,11,0.5)</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-secondary/20"></div>
                    <div className="text-sm">
                      <div className="font-medium">Secondary 20%</div>
                      <div className="text-muted-foreground">rgba(245,158,11,0.2)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neutral Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Neutral Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-foreground"></div>
                    <div className="text-sm">
                      <div className="font-medium">Foreground</div>
                      <div className="text-muted-foreground">Text Primary</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-muted-foreground"></div>
                    <div className="text-sm">
                      <div className="font-medium">Muted Foreground</div>
                      <div className="text-muted-foreground">Text Secondary</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-muted border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Muted</div>
                      <div className="text-muted-foreground">Background Alt</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-lg bg-border border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Border</div>
                      <div className="text-muted-foreground">Dividers</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Typography System</CardTitle>
              <CardDescription>Inter font family with responsive scaling and semantic hierarchy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Heading 1 - Display Large</h1>
                  <p className="text-sm text-muted-foreground">text-4xl font-bold - Used for main page titles</p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Heading 2 - Display Medium</h2>
                  <p className="text-sm text-muted-foreground">text-3xl font-bold - Used for section titles</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Heading 3 - Display Small</h3>
                  <p className="text-sm text-muted-foreground">text-2xl font-semibold - Used for subsection titles</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Heading 4 - Title Large</h4>
                  <p className="text-sm text-muted-foreground">text-xl font-semibold - Used for card titles</p>
                </div>
                <div>
                  <h5 className="text-lg font-medium mb-2">Heading 5 - Title Medium</h5>
                  <p className="text-sm text-muted-foreground">text-lg font-medium - Used for component titles</p>
                </div>
                <div>
                  <h6 className="text-base font-medium mb-2">Heading 6 - Title Small</h6>
                  <p className="text-sm text-muted-foreground">text-base font-medium - Used for small titles</p>
                </div>
                <div>
                  <p className="text-base mb-2">Body Large - Regular paragraph text for main content areas</p>
                  <p className="text-sm text-muted-foreground">text-base - Primary body text</p>
                </div>
                <div>
                  <p className="text-sm mb-2">Body Medium - Secondary text for descriptions and captions</p>
                  <p className="text-sm text-muted-foreground">text-sm - Secondary body text</p>
                </div>
                <div>
                  <p className="text-xs mb-2">Body Small - Tertiary text for labels and metadata</p>
                  <p className="text-sm text-muted-foreground">text-xs - Tertiary body text</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-8">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles and states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive Button</Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </CardContent>
          </Card>

          {/* Form Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>Input fields, selects, and form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="select">Select Option</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </CardContent>
          </Card>

          {/* Cards and Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Cards & Badges</CardTitle>
              <CardDescription>Content containers and status indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Analytics
                    </CardTitle>
                    <CardDescription>View your performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">1,234</span>
                      <Badge variant="secondary">+12%</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-secondary" />
                      Team Members
                    </CardTitle>
                    <CardDescription>Manage your team access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">8</span>
                      <Badge>Active</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-500" />
                      Scheduled Posts
                    </CardTitle>
                    <CardDescription>Content ready to publish</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">24</span>
                      <Badge variant="outline">This Week</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Modal Example */}
          <Card>
            <CardHeader>
              <CardTitle>Modal Dialog</CardTitle>
              <CardDescription>Interactive modal components</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Modal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Campaign</DialogTitle>
                    <DialogDescription>Set up a new social media campaign for your brand.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input id="campaign-name" placeholder="Enter campaign name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="campaign-type">Campaign Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select campaign type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="email">Email Marketing</SelectItem>
                          <SelectItem value="content">Content Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Create Campaign</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Responsive Tab */}
        <TabsContent value="responsive" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Design System</CardTitle>
              <CardDescription>Mobile-first approach with flexible breakpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Mobile (320px+)</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Single column layouts</p>
                    <p>• Touch-friendly buttons (44px min)</p>
                    <p>• Collapsible navigation</p>
                    <p>• Stacked form elements</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Tablet className="w-5 h-5 text-secondary" />
                    <h3 className="font-semibold">Tablet (768px+)</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Two column layouts</p>
                    <p>• Expanded navigation</p>
                    <p>• Side-by-side forms</p>
                    <p>• Larger touch targets</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-green-500" />
                    <h3 className="font-semibold">Desktop (1024px+)</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Multi-column layouts</p>
                    <p>• Full navigation menus</p>
                    <p>• Hover interactions</p>
                    <p>• Dense information display</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responsive Grid Example */}
          <Card>
            <CardHeader>
              <CardTitle>Responsive Grid Example</CardTitle>
              <CardDescription>Adaptive grid that changes based on screen size</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-muted rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Item {i + 1}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Dashboard</h2>
              <p className="text-muted-foreground">Manage your social content and brand assets</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Content
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                  <ImageIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+12%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Video className="w-8 h-8 text-secondary" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+8%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Scheduled Posts</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+23%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+2</span>
                  <span className="text-muted-foreground ml-1">new this month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Recent Content</CardTitle>
                  <CardDescription>Your latest social media content and brand assets</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search content..." className="pl-10 w-full sm:w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/placeholder-bxzvb.png" />
                          <AvatarFallback>SP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Summer Campaign Launch</p>
                          <p className="text-sm text-muted-foreground">Brand awareness campaign</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        Image
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>Published</Badge>
                    </TableCell>
                    <TableCell>Instagram</TableCell>
                    <TableCell>2 hours ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/diverse-people-watching-content.png" />
                          <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Product Demo Video</p>
                          <p className="text-sm text-muted-foreground">Feature showcase</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <Video className="w-3 h-3 mr-1" />
                        Video
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Scheduled</Badge>
                    </TableCell>
                    <TableCell>YouTube</TableCell>
                    <TableCell>1 day ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/blog-post-image.png" />
                          <AvatarFallback>BP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Industry Insights Blog</p>
                          <p className="text-sm text-muted-foreground">Thought leadership</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        Article
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Draft</Badge>
                    </TableCell>
                    <TableCell>LinkedIn</TableCell>
                    <TableCell>3 days ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
