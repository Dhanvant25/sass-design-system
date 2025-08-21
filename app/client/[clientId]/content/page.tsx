"use client";

import * as React from "react";
import { ClientContentPlanner } from "@/components/client/content-planner";

interface ClientContentPageProps {
  params: Promise<{ clientId: string }>;
}

export default function ClientContentPage({ params }: ClientContentPageProps) {
  const { clientId } = React.use(params);
  return <ClientContentPlanner clientId={clientId} />;
}
