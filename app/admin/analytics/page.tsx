import { ServiceAnalytics } from "@/components/admin/service-analytics"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Platform usage patterns and integration analytics</p>
      </div>
      <ServiceAnalytics />
    </div>
  )
}
