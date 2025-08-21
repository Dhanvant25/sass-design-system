"use client";

import * as React from "react";
import { ClientDashboard } from "@/components/client/dashboard";

interface ClientDashboardPageProps {
  params: Promise<{ clientId: string }>;
}

export default function ClientDashboardPage({ params }: ClientDashboardPageProps) {
  const { clientId } = React.use(params);
  return <ClientDashboard clientId={clientId} />;
}
