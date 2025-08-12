"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon, Palette, Type, X } from "lucide-react"

interface BrandAssetsStepProps {
  onNext: () => void
}

export function BrandAssetsStep({ onNext }: BrandAssetsStepProps) {
  const [logo, setLogo] = useState<File | null>(null)
  const [brandColors, setBrandColors] = useState({
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#f59e0b",
  })
  const [brandInfo, setBrandInfo] = useState({
    name: "",
    tagline: "",
    description: "",
  })

  const logoInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
    }
  }

  const removeLogo = () => {
    setLogo(null)
    if (logoInputRef.current) {
      logoInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Upload Your Brand Assets</h2>
        <p className="text-muted-foreground">
          Add your logo, brand colors, and information to maintain consistency across all your posts.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        {/* Logo Upload */}
        <Card className="border-0 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ImageIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Brand Logo</h3>
            </div>

            {logo ? (
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{logo.name}</p>
                    <p className="text-sm text-muted-foreground">{(logo.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={removeLogo}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => logoInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Click to upload your logo or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, SVG up to 5MB</p>
              </div>
            )}

            <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
          </CardContent>
        </Card>

        {/* Brand Colors */}
        <Card className="border-0 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Brand Colors</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary</Label>
                <div className="flex items-center space-x-2">
                  <input
                    id="primary-color"
                    type="color"
                    value={brandColors.primary}
                    onChange={(e) => setBrandColors({ ...brandColors, primary: e.target.value })}
                    className="w-12 h-10 rounded border border-input cursor-pointer"
                  />
                  <Input
                    value={brandColors.primary}
                    onChange={(e) => setBrandColors({ ...brandColors, primary: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary</Label>
                <div className="flex items-center space-x-2">
                  <input
                    id="secondary-color"
                    type="color"
                    value={brandColors.secondary}
                    onChange={(e) => setBrandColors({ ...brandColors, secondary: e.target.value })}
                    className="w-12 h-10 rounded border border-input cursor-pointer"
                  />
                  <Input
                    value={brandColors.secondary}
                    onChange={(e) => setBrandColors({ ...brandColors, secondary: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent</Label>
                <div className="flex items-center space-x-2">
                  <input
                    id="accent-color"
                    type="color"
                    value={brandColors.accent}
                    onChange={(e) => setBrandColors({ ...brandColors, accent: e.target.value })}
                    className="w-12 h-10 rounded border border-input cursor-pointer"
                  />
                  <Input
                    value={brandColors.accent}
                    onChange={(e) => setBrandColors({ ...brandColors, accent: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brand Information */}
        <Card className="border-0 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Type className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Brand Information</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input
                  id="brand-name"
                  placeholder="Enter your brand name"
                  value={brandInfo.name}
                  onChange={(e) => setBrandInfo({ ...brandInfo, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline (Optional)</Label>
                <Input
                  id="tagline"
                  placeholder="Your brand tagline"
                  value={brandInfo.tagline}
                  onChange={(e) => setBrandInfo({ ...brandInfo, tagline: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Brand Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your brand in a few sentences..."
                  value={brandInfo.description}
                  onChange={(e) => setBrandInfo({ ...brandInfo, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center text-sm text-muted-foreground"
      >
        Don't worry, you can always update these assets later in your settings.
      </motion.div>
    </div>
  )
}
