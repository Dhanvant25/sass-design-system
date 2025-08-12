"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Instagram, Facebook, Twitter, Linkedin, Youtube, CheckCircle } from "lucide-react"

interface ConnectAccountStepProps {
  onNext: () => void
}

const socialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    description: "Connect your Instagram Business account",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    description: "Connect your Facebook Page",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "bg-sky-500",
    description: "Connect your Twitter account",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700",
    description: "Connect your LinkedIn Page",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "bg-red-600",
    description: "Connect your YouTube Channel",
  },
]

export function ConnectAccountStep({ onNext }: ConnectAccountStepProps) {
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([])
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const handleConnect = async (platformId: string) => {
    setIsConnecting(platformId)

    // Simulate API call
    setTimeout(() => {
      setConnectedAccounts([...connectedAccounts, platformId])
      setIsConnecting(null)
    }, 2000)
  }

  const handleDisconnect = (platformId: string) => {
    setConnectedAccounts(connectedAccounts.filter((id) => id !== platformId))
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Connect Your Social Accounts</h2>
        <p className="text-muted-foreground">
          Connect at least one social media account to start scheduling posts. You can add more accounts later.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        {socialPlatforms.map((platform, index) => {
          const isConnected = connectedAccounts.includes(platform.id)
          const isLoading = isConnecting === platform.id

          return (
            <Card key={platform.id} className="border-0 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center`}>
                      <platform.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{platform.name}</h3>
                        {isConnected && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{platform.description}</p>
                    </div>
                  </div>

                  <div>
                    {isConnected ? (
                      <Button variant="outline" size="sm" onClick={() => handleDisconnect(platform.id)}>
                        Disconnect
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleConnect(platform.id)} disabled={isLoading}>
                        {isLoading ? "Connecting..." : "Connect"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {connectedAccounts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-sm text-muted-foreground">
            Great! You've connected {connectedAccounts.length} account{connectedAccounts.length > 1 ? "s" : ""}. You can
            continue to the next step or connect more accounts.
          </div>
        </motion.div>
      )}
    </div>
  )
}
