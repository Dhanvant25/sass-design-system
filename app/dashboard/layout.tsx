"use client";

import type React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { BottomNavigation } from "@/components/mobile/bottom-navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DashboardLayout({
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
            {" "}
            {/* Add padding for bottom navigation */}
            <DashboardHeader />
            <main className="container mx-auto px-4 py-6">{children}</main>
          </div>
          <BottomNavigation userType="individual" />
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
