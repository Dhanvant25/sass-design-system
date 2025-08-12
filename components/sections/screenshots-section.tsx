"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Monitor, Smartphone, Tablet } from "lucide-react"

const screenshots = {
  desktop: {
    title: "Desktop Experience",
    description: "Full-featured dashboard with advanced analytics and team collaboration tools.",
    image: "/placeholder.svg?height=600&width=1000&text=Desktop+Dashboard",
  },
  mobile: {
    title: "Mobile Optimized",
    description: "Native mobile experience with touch-optimized interface and offline support.",
    image: "/placeholder.svg?height=600&width=300&text=Mobile+App",
  },
  tablet: {
    title: "Tablet Ready",
    description: "Perfect for on-the-go content creation and team management.",
    image: "/placeholder.svg?height=600&width=500&text=Tablet+Interface",
  },
}

export function ScreenshotsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              Platform Preview
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Beautiful on{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Every Device
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience seamless social media management across desktop, tablet, and mobile devices.
            </p>
          </motion.div>
        </div>

        {/* Screenshots Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="desktop" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="desktop" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center gap-2">
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline">Tablet</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(screenshots).map(([key, screenshot]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{screenshot.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{screenshot.description}</p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    {/* Device Frame */}
                    <div
                      className={`relative mx-auto ${
                        key === "desktop" ? "max-w-5xl" : key === "mobile" ? "max-w-sm" : "max-w-2xl"
                      }`}
                    >
                      <div
                        className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                          key === "mobile" ? "bg-black p-2" : "bg-gray-200 dark:bg-gray-700 p-3"
                        }`}
                      >
                        {key === "mobile" && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
                        )}

                        <div className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                          <Image
                            src={screenshot.image || "/placeholder.svg"}
                            alt={screenshot.title}
                            width={key === "desktop" ? 1000 : key === "mobile" ? 300 : 500}
                            height={600}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    {key === "desktop" && (
                      <>
                        <motion.div
                          className="absolute -top-8 -right-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hidden lg:block"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Real-time Updates
                            </span>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hidden lg:block"
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                              <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">AI</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              AI-Powered Insights
                            </span>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Desktop Power</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Full-featured dashboard with advanced analytics and team collaboration tools.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Native mobile experience with touch-optimized interface and offline support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tablet className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tablet Ready</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Perfect for on-the-go content creation and team management.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
