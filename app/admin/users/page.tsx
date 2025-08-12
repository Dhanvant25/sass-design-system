import { UserManagement } from "@/components/admin/user-management"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage platform users, agencies, and clients</p>
      </div>
      <UserManagement />
    </div>
  )
}
