"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarContextValue {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile()
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile)

  // Update collapsed state when mobile state changes
  React.useEffect(() => {
    setIsCollapsed(isMobile)
  }, [isMobile])

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="flex min-h-screen">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { isCollapsed, setIsCollapsed } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsCollapsed(!isCollapsed)}
      className={cn("h-8 w-8", className)}
    >
      {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
    </Button>
  )
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className={cn(
      "flex flex-1 flex-col transition-all duration-300",
      isCollapsed ? "ml-0" : "ml-0"
    )}>
      {children}
    </div>
  )
} 