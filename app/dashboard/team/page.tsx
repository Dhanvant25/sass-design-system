import type { Metadata } from "next"
import { Team } from "@/components/dashboard/team"

export const metadata: Metadata = {
  title: "Team | Dashboard",
  description: "Manage your team members, roles, and permissions.",
}

export default function TeamPage() {
  return <Team />
}
