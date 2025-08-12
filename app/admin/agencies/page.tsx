import { AgencyManagement } from "@/components/admin/agency-management"

export default function AgenciesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agency Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage agency accounts and their clients</p>
      </div>
      <AgencyManagement />
    </div>
  )
}
