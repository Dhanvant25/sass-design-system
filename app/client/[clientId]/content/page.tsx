import { ClientContentPlanner } from "@/components/client/content-planner"

interface ClientContentPageProps {
  params: { clientId: string }
}

export default function ClientContentPage({ params }: ClientContentPageProps) {
  return <ClientContentPlanner clientId={params.clientId} />
}
