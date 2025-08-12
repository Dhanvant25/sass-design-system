import type { Metadata } from "next"
import { Analytics } from "@/components/dashboard/analytics"

export const metadata: Metadata = {
  title: "Analytics | Dashboard",
  description: "View detailed analytics and insights for your social media performance.",
}

export default function AnalyticsPage() {
  return <Analytics />
}
