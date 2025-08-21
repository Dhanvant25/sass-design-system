"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/client/sidebar";
import { ClientHeader } from "@/components/client/header";
import { BottomNavigation } from "@/components/mobile/bottom-navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthProvider } from "@/store/AuthContext";

interface ClientLayoutProps {
  children: React.ReactNode;
  params: Promise<{ clientId: string }>;
}

export default function ClientLayout({ children, params }: ClientLayoutProps) {
  const { clientId } = React.use(params);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <AuthProvider>
        <SidebarProvider>
          <div className="min-h-screen bg-background !w-full">
            <div className="pb-20">
              <ClientHeader clientId={clientId} />
              <main className="container mx-auto px-4 py-6">{children}</main>
            </div>
            <BottomNavigation userType="client" clientId={clientId} />
          </div>
        </SidebarProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <SidebarProvider>
        <ClientSidebar clientId={clientId} />
        <SidebarInset>
          <ClientHeader clientId={clientId} />
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
