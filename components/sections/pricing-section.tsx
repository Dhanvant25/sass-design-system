"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small businesses",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    monthly: 29,
    yearly: 290,
    features: [
      "5 Social Media Accounts",
      "100 Posts per Month",
      "Basic Analytics",
      "Content Calendar",
      "Email Support",
      "Mobile App Access",
    ],
    popular: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses and teams",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    monthly: 79,
    yearly: 790,
    features: [
      "15 Social Media Accounts",
      "500 Posts per Month",
      "Advanced Analytics",
      "Team Collaboration (5 users)",
      "AI Content Generation",
      "Priority Support",
      "Brand Asset Library",
      "Custom Branding",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations and agencies",
    icon: Crown,
    color: "from-orange-500 to-red-500",
    monthly: 199,
    yearly: 1990,
    features: [
      "Unlimited Social Accounts",
      "Unlimited Posts",
      "Advanced Team Management",
      "White-label Solution",
      "API Access",
      "Dedicated Account Manager",
      "Custom Integrations",
      "SLA Guarantee",
    ],
    popular: false,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

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
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Simple,{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Transparent
              </span>{" "}
              Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!isYearly ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                Monthly
              </span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-indigo-600" />
              <span className={`text-sm font-medium ${isYearly ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                Yearly
              </span>
              <Badge
                variant="secondary"
                className="ml-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              >
                Save 20%
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-indigo-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <Card
                className={`h-full relative overflow-hidden ${
                  plan.popular
                    ? "border-2 border-indigo-200 dark:border-indigo-800 shadow-xl"
                    : "border border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 opacity-50" />
                )}

                <CardHeader className="relative z-10 text-center pb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center shadow-lg`}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</CardTitle>

                  <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${isYearly ? plan.yearly : plan.monthly}
                      </span>
                      <span className="text-gray-500 ml-1">/{isYearly ? "year" : "month"}</span>
                    </div>
                    {isYearly && (
                      <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Save ${plan.monthly * 12 - plan.yearly} per year
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                    }`}
                    size="lg"
                  >
                    <Link href="/auth/signup">Start Free Trial</Link>
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">No credit card required</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Contact our sales team for custom pricing, dedicated support, and enterprise features.
            </p>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
