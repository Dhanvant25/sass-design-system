"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Target, Users } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Content",
      description: "Generate engaging posts with artificial intelligence",
    },
    {
      icon: Zap,
      title: "Automated Scheduling",
      description: "Schedule posts across all your social platforms",
    },
    {
      icon: Target,
      title: "Brand Management",
      description: "Keep your brand assets organized and accessible",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team seamlessly",
    },
  ]

  return (
    <div className="text-center space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Welcome to Automated Social Content!</h1>

        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Let's get you set up in just a few minutes. We'll help you connect your accounts, upload your brand assets,
          and create your first post.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
      >
        {features.map((feature, index) => (
          <Card key={index} className="border-0 bg-card/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-sm text-muted-foreground"
      >
        This will only take about 3 minutes to complete
      </motion.div>
    </div>
  )
}
