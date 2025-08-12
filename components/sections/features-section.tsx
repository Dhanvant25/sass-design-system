"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Calendar,
  ImageIcon,
  BarChart3,
  Users,
  Smartphone,
  Brain,
  Shield,
  Globe,
  Palette,
  Clock,
  Target,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Content Generation",
    description: "Create engaging posts with AI-powered content suggestions tailored to your brand voice and audience.",
    badge: "AI Powered",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automatically schedule posts at optimal times for maximum engagement across all platforms.",
    badge: "Automation",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ImageIcon,
    title: "Brand Asset Library",
    description: "Organize and manage all your brand assets in one centralized, searchable library.",
    badge: "Organization",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track performance with detailed insights and actionable recommendations.",
    badge: "Insights",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with your team with role-based permissions and approval workflows.",
    badge: "Teamwork",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Manage your social media on-the-go with our fully responsive mobile interface.",
    badge: "Mobile",
    color: "from-teal-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SOC 2 compliance and advanced data protection.",
    badge: "Security",
    color: "from-gray-500 to-slate-500",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description: "Connect and manage all your social media accounts from one unified dashboard.",
    badge: "Integration",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "Brand Consistency",
    description: "Maintain consistent branding across all platforms with automated brand guidelines.",
    badge: "Branding",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Clock,
    title: "Time Zones",
    description: "Schedule content across multiple time zones for global audience reach.",
    badge: "Global",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Audience Targeting",
    description: "Reach the right audience with advanced targeting and segmentation tools.",
    badge: "Targeting",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Instant Publishing",
    description: "Publish content instantly or schedule for later with our lightning-fast platform.",
    badge: "Speed",
    color: "from-yellow-500 to-amber-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
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
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to streamline your social media workflow and maximize your impact.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Social Media?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses already using our platform to streamline their social media management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
