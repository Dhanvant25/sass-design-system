"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Smartphone, Key, Copy, CheckCircle, AlertTriangle } from "lucide-react"

export default function TwoFactorPage() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [step, setStep] = useState<"setup" | "verify" | "complete">("setup")
  const [qrCode] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5RUiBDb2RlPC90ZXh0Pgo8L3N2Zz4K",
  )
  const [secretKey] = useState("JBSWY3DPEHPK3PXP")
  const [verificationCode, setVerificationCode] = useState("")
  const [backupCodes] = useState([
    "1a2b3c4d",
    "5e6f7g8h",
    "9i0j1k2l",
    "3m4n5o6p",
    "7q8r9s0t",
    "1u2v3w4x",
    "5y6z7a8b",
    "9c0d1e2f",
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEnable2FA = () => {
    setStep("setup")
  }

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep("complete")
      setIsEnabled(true)
    }, 2000)
  }

  const handleDisable2FA = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEnabled(false)
      setStep("setup")
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (step === "complete") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              <h2 className="text-2xl font-bold mb-2">Two-Factor Authentication Enabled!</h2>
              <p className="text-muted-foreground mb-6">
                Your account is now protected with two-factor authentication.
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Key className="w-4 h-4 mr-2" />
                  Backup Codes
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Save these backup codes in a safe place. You can use them to access your account if you lose your
                  authenticator device.
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="bg-background p-2 rounded border">
                      {code}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 bg-transparent"
                  onClick={() => copyToClipboard(backupCodes.join("\n"))}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All Codes
                </Button>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={() => (window.location.href = "/dashboard/settings")}>Back to Settings</Button>
                <Button variant="outline" onClick={() => setStep("setup")}>
                  View Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Two-Factor Authentication</h1>
          <p className="text-muted-foreground">
            Add an extra layer of security to your account with two-factor authentication.
          </p>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className={`w-6 h-6 ${isEnabled ? "text-green-600" : "text-muted-foreground"}`} />
                <div>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    {isEnabled ? "Your account is protected" : "Secure your account with 2FA"}
                  </CardDescription>
                </div>
              </div>

              <Badge
                variant={isEnabled ? "secondary" : "outline"}
                className={isEnabled ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : ""}
              >
                {isEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {!isEnabled ? (
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Two-factor authentication is currently disabled. Enable it to add an extra layer of security to your
                    account.
                  </AlertDescription>
                </Alert>

                <Button onClick={handleEnable2FA}>Enable Two-Factor Authentication</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Two-factor authentication is enabled and protecting your account.</AlertDescription>
                </Alert>

                <Button variant="destructive" onClick={handleDisable2FA} disabled={isLoading}>
                  {isLoading ? "Disabling..." : "Disable Two-Factor Authentication"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Setup Process */}
        {step === "setup" && !isEnabled && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Step 1: Install Authenticator App
              </CardTitle>
              <CardDescription>Download and install an authenticator app on your mobile device</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Google Authenticator</h4>
                  <p className="text-sm text-muted-foreground">Free • iOS & Android</p>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Authy</h4>
                  <p className="text-sm text-muted-foreground">Free • iOS & Android</p>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium">1Password</h4>
                  <p className="text-sm text-muted-foreground">Premium • iOS & Android</p>
                </div>
              </div>

              <Button onClick={() => setStep("verify")} className="w-full">
                I've Installed an Authenticator App
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Verification Step */}
        {step === "verify" && (
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Scan QR Code</CardTitle>
              <CardDescription>
                Scan this QR code with your authenticator app, or enter the secret key manually
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center">
                  <img
                    src={qrCode || "/placeholder.svg"}
                    alt="QR Code"
                    className="w-48 h-48 border rounded-lg mx-auto"
                  />
                  <p className="text-sm text-muted-foreground mt-2">Scan with your authenticator app</p>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <Label>Or enter this secret key manually:</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input value={secretKey} readOnly className="font-mono" />
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(secretKey)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Enter 6-digit code from your app:</Label>
                    <Input
                      id="verification-code"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="text-center text-lg font-mono tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep("setup")}>
                      Back
                    </Button>
                    <Button
                      onClick={handleVerify}
                      disabled={isLoading || verificationCode.length !== 6}
                      className="flex-1"
                    >
                      {isLoading ? "Verifying..." : "Verify & Enable"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
