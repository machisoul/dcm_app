"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { AuthRedirect } from "@/components/auth-redirect"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { PageView } from "@/types/navigation"

import data from "./data.json"
import { TasksView } from "./tasks-view"
import { InfluencerExpansionView } from "./influencer-expansion-view"
import { ContentAnalysisView } from "./content-analysis-view"

export default function Page() {
  const [currentView, setCurrentView] = useState<PageView>("dashboard")

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        )
      case "influencer-expansion":
        return <InfluencerExpansionView />
      case "content-analysis":
        return <ContentAnalysisView />
      case "tasks":
        return <TasksView />
      default:
        return null
    }
  }

  return (
    <AuthRedirect requireAuth>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" onViewChange={setCurrentView} currentView={currentView} />
        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {renderView()}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthRedirect>
  )
}
