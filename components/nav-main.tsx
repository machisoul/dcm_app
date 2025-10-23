"use client"

import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PageView } from "@/types/navigation"

interface NavMainProps {
  items: {
    title: string
    view?: PageView
    url?: string
    icon?: Icon
  }[]
  onViewChange?: (view: PageView) => void
  currentView?: PageView
}

export function NavMain({ items, onViewChange, currentView = "dashboard" }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                tooltip={item.title}
                isActive={item.view === currentView}
                onClick={() => {
                  if (item.view && onViewChange) {
                    onViewChange(item.view)
                  }
                }}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
