import { RevenueDashboard } from "@/components/admin/revenue-dashboard"

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Revenue Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Track platform revenue and subscription metrics</p>
      </div>
      <RevenueDashboard />
    </div>
  )
}
