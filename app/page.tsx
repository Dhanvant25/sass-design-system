import type { Metadata } from "next"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { ScreenshotsSection } from "@/components/sections/screenshots-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BlogSection } from "@/components/sections/blog-section"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Automated Social Content & Brand Asset Manager | Streamline Your Social Media",
  description:
    "Transform your social media strategy with AI-powered content creation, automated scheduling, and comprehensive brand asset management. Start free today.",
  keywords:
    "social media management, content creation, brand assets, AI automation, social media scheduler, content marketing",
  authors: [{ name: "Automated Social Content Team" }],
  creator: "Automated Social Content & Brand Asset Manager",
  publisher: "Automated Social Content & Brand Asset Manager",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Automated Social Content & Brand Asset Manager",
    description: "Transform your social media strategy with AI-powered content creation and automated scheduling.",
    url: "https://yourdomain.com",
    siteName: "Automated Social Content & Brand Asset Manager",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Automated Social Content & Brand Asset Manager Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automated Social Content & Brand Asset Manager",
    description: "Transform your social media strategy with AI-powered content creation and automated scheduling.",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </main>
  )
}
