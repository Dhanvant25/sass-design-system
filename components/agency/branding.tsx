"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Save, Eye, Globe, Camera, Trash2, Copy, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function AgencyBranding() {
  const [agencyName, setAgencyName] = useState("Digital Marketing Pro")
  const [customDomain, setCustomDomain] = useState("clients.digitalmarketingpro.com")
  const [primaryColor, setPrimaryColor] = useState("#6366F1")
  const [secondaryColor, setSecondaryColor] = useState("#F59E0B")
  const [logo, setLogo] = useState("/placeholder.svg?height=60&width=200&text=Agency+Logo")
  const [favicon, setFavicon] = useState("/placeholder.svg?height=32&width=32&text=Fav")
  const [domainCopied, setDomainCopied] = useState(false)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setLogo(url)
    }
  }

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFavicon(url)
    }
  }

  const handleCopyDomain = async () => {
    await navigator.clipboard.writeText(`https://${customDomain}`)
    setDomainCopied(true)
    setTimeout(() => setDomainCopied(false), 2000)
  }

  const presetColors = [
    { name: "Indigo", primary: "#6366F1", secondary: "#F59E0B" },
    { name: "Blue", primary: "#3B82F6", secondary: "#10B981" },
    { name: "Purple", primary: "#8B5CF6", secondary: "#F59E0B" },
    { name: "Green", primary: "#10B981", secondary: "#F59E0B" },
    { name: "Red", primary: "#EF4444", secondary: "#F59E0B" },
    { name: "Pink", primary: "#EC4899", secondary: "#8B5CF6" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agency Branding</h1>
            <p className="text-muted-foreground">Customize your white-label portal with your agency's branding</p>
          </div>
          <Button style={{ backgroundColor: primaryColor }} className="w-fit text-white hover:opacity-90">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branding Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Logo & Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Logo & Identity</CardTitle>
                <CardDescription>Upload your agency logo and set your brand identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Agency Name */}
                <div className="space-y-2">
                  <Label htmlFor="agency-name">Agency Name</Label>
                  <Input
                    id="agency-name"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="Enter your agency name"
                  />
                </div>

                {/* Logo Upload */}
                <div className="space-y-4">
                  <Label>Agency Logo</Label>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-16 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50">
                      {logo ? (
                        <img
                          src={logo || "/placeholder.svg"}
                          alt="Agency Logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Logo</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button variant="outline" size="sm" asChild className="bg-transparent">
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Logo
                        </label>
                      </Button>
                      {logo && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLogo("")}
                          className="bg-transparent text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                      <p className="text-xs text-muted-foreground">Recommended: PNG or SVG, max 2MB, 200x60px</p>
                    </div>
                  </div>
                </div>

                {/* Favicon Upload */}
                <div className="space-y-4">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50">
                      {favicon ? (
                        <img
                          src={favicon || "/placeholder.svg"}
                          alt="Favicon"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Icon</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFaviconUpload}
                        className="hidden"
                        id="favicon-upload"
                      />
                      <Button variant="outline" size="sm" asChild className="bg-transparent">
                        <label htmlFor="favicon-upload" className="cursor-pointer">
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Favicon
                        </label>
                      </Button>
                      {favicon && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFavicon("")}
                          className="bg-transparent text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                      <p className="text-xs text-muted-foreground">Recommended: ICO or PNG, 32x32px</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Color Scheme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
                <CardDescription>Set your brand colors for the client portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-12 h-10 rounded-md border border-border"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <Input
                        id="primary-color"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-12 h-10 rounded-md border border-border"
                        style={{ backgroundColor: secondaryColor }}
                      />
                      <Input
                        id="secondary-color"
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Preset Colors */}
                <div className="space-y-3">
                  <Label>Color Presets</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {presetColors.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          setPrimaryColor(preset.primary)
                          setSecondaryColor(preset.secondary)
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex gap-1">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                        </div>
                        <span className="text-sm font-medium">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Custom Domain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Custom Domain</CardTitle>
                <CardDescription>Set up your custom domain for the client portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-domain">Domain</Label>
                  <div className="flex gap-2">
                    <Input
                      id="custom-domain"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="clients.youragency.com"
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm" onClick={handleCopyDomain} className="bg-transparent">
                      {domainCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Point your domain's CNAME record to: portal.socialmgr.com
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Domain Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                    <span className="text-xs text-muted-foreground">SSL Certificate: Valid</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-border/50 sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </CardTitle>
              <CardDescription>How your client portal will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Header Preview */}
                <div
                  className="p-4 rounded-lg border border-border/50"
                  style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {agencyName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{agencyName}</p>
                      <p className="text-xs text-muted-foreground">Client Portal</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">https://{customDomain}</div>
                </div>

                {/* Button Preview */}
                <div className="space-y-3">
                  <p className="text-sm font-medium">Button Styles</p>
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      className="w-full text-white hover:opacity-90"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Primary Button
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      Secondary Button
                    </Button>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="space-y-3">
                  <p className="text-sm font-medium">Color Palette</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <div
                        className="w-full h-12 rounded-md border border-border mb-2"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <p className="text-xs text-muted-foreground">Primary</p>
                      <p className="text-xs font-mono">{primaryColor}</p>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-full h-12 rounded-md border border-border mb-2"
                        style={{ backgroundColor: secondaryColor }}
                      />
                      <p className="text-xs text-muted-foreground">Secondary</p>
                      <p className="text-xs font-mono">{secondaryColor}</p>
                    </div>
                  </div>
                </div>

                {/* Logo Preview */}
                {logo && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Logo Preview</p>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <img
                        src={logo || "/placeholder.svg"}
                        alt="Logo Preview"
                        className="max-w-full h-8 object-contain mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
