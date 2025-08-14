"use client";

import type React from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/client/sidebar";
import { ClientHeader } from "@/components/client/header";
import { BottomNavigation } from "@/components/mobile/bottom-navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthProvider } from "@/store/AuthContext";

export default function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { clientId: string };
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <AuthProvider>
        <SidebarProvider>
          <div className="min-h-screen bg-background !w-full">
            <div className="pb-20">
              <ClientHeader clientId={params.clientId} />
              <main className="container mx-auto px-4 py-6">{children}</main>
            </div>
            <BottomNavigation userType="client" clientId={params.clientId} />
          </div>
        </SidebarProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <SidebarProvider>
        <ClientSidebar clientId={params.clientId} />
        <SidebarInset>
          <ClientHeader clientId={params.clientId} />
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
