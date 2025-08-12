"use client";

import type React from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AgencySidebar } from "@/components/agency/sidebar";
import { AgencyHeader } from "@/components/agency/header";
import { BottomNavigation } from "@/components/mobile/bottom-navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <SidebarProvider>
        <div className="min-h-screen bg-background !w-full">
          <div className="pb-20">
            <AgencyHeader />
            <main className="container mx-auto px-4 py-6">{children}</main>
          </div>
          <BottomNavigation userType="agency" />
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AgencySidebar />
      <SidebarInset>
        <AgencyHeader />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
