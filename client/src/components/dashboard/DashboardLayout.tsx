"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { DashboardNavbar } from "./DashboardNavbar"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </SidebarProvider>
  )
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  const isMobile = useMobile();

  return (
    <div className="w-full">
      <DashboardNavbar />
      <div className={cn(
        "fixed top-15 z-40 h-screen transition-all duration-300",
        isMobile ? "left-0" : "left-0"
      )}>
        <AppSidebar />
      </div>
      <div className={cn(
        "transition-all duration-300",
        isMobile ? "w-full" : isCollapsed ? "pl-16" : "pl-64"
      )}>
        <SidebarInset>
          <div className="w-full h-full flex flex-col">
            {children}
          </div>
        </SidebarInset>
      </div>
    </div>
  );
}