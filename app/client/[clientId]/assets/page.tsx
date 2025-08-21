"use client";

import * as React from "react";
import { ClientAssetLibrary } from "@/components/client/asset-library";

interface ClientAssetsPageProps {
  params: Promise<{ clientId: string }>;
}

export default function ClientAssetsPage({ params }: ClientAssetsPageProps) {
  const { clientId } = React.use(params);
  return <ClientAssetLibrary clientId={clientId} />;
}
