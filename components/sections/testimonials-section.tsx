"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    avatar: "/placeholder.svg?height=60&width=60&text=SJ",
    rating: 5,
    content:
      "This platform has completely transformed our social media strategy. The AI-powered content suggestions are incredibly accurate and save us hours every week.",
    metrics: "300% increase in engagement",
  },
  {
    name: "Michael Chen",
    role: "Social Media Manager",
    company: "Creative Agency",
    avatar: "/placeholder.svg?height=60&width=60&text=MC",
    rating: 5,
    content:
      "The team collaboration features are outstanding. We can now manage multiple client accounts seamlessly with proper approval workflows.",
    metrics: "50% faster content creation",
  },
  {
    name: "Emily Rodriguez",
    role: "Brand Manager",
    company: "Fashion Forward",
    avatar: "/placeholder.svg?height=60&width=60&text=ER",
    rating: 5,
    content:
      "The brand asset library is a game-changer. All our assets are organized and easily accessible to the entire team. No more searching through folders!",
    metrics: "90% reduction in asset search time",
  },
  {
    name: "David Thompson",
    role: "CEO",
    company: "Local Business Co.",
    avatar: "/placeholder.svg?height=60&width=60&text=DT",
    rating: 5,
    content:
      "As a small business owner, this platform gives me enterprise-level social media management at an affordable price. The ROI has been incredible.",
    metrics: "200% increase in leads",
  },
  {
    name: "Lisa Park",
    role: "Digital Marketing Specialist",
    company: "E-commerce Plus",
    avatar: "/placeholder.svg?height=60&width=60&text=LP",
    rating: 5,
    content:
      "The analytics dashboard provides insights we never had before. We can now make data-driven decisions and optimize our content strategy effectively.",
    metrics: "150% improvement in conversion",
  },
  {
    name: "James Wilson",
    role: "Agency Owner",
    company: "Wilson Digital",
    avatar: "/placeholder.svg?height=60&width=60&text=JW",
    rating: 5,
    content:
      "Managing multiple client accounts has never been easier. The white-label solution allows us to provide a professional experience to our clients.",
    metrics: "40% increase in client retention",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900">
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
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what our customers are saying about their experience with our platform.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-indigo-600 dark:text-indigo-400 opacity-50" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Metrics */}
                  <div className="mb-6">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                    >
                      {testimonial.metrics}
                    </Badge>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                      <div className="text-sm text-indigo-600 dark:text-indigo-400">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2M+</div>
                <div className="text-gray-600 dark:text-gray-300">Posts Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">99.9%</div>
                <div className="text-gray-600 dark:text-gray-300">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">4.9/5</div>
                <div className="text-gray-600 dark:text-gray-300">Customer Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
