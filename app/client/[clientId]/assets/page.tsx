import { ClientAssetLibrary } from "@/components/client/asset-library"

interface ClientAssetsPageProps {
  params: { clientId: string }
}

export default function ClientAssetsPage({ params }: ClientAssetsPageProps) {
  return <ClientAssetLibrary clientId={params.clientId} />
}
