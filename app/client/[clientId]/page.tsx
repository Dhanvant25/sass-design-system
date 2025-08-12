import { ClientDashboard } from "@/components/client/dashboard"

interface ClientDashboardPageProps {
  params: { clientId: string }
}

export default function ClientDashboardPage({ params }: ClientDashboardPageProps) {
  return <ClientDashboard clientId={params.clientId} />
}
