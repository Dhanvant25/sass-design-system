import { SubscriptionManagement } from "@/components/admin/subscription-management"

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage pricing plans and subscription settings</p>
      </div>
      <SubscriptionManagement />
    </div>
  )
}
