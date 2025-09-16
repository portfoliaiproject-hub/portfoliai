"use client"

import { ReactNode } from "react"
import { SettingsSidebar } from "@/components/settings/settings-sidebar"
import { AppHeader } from "@/components/layout/app-header"

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          <aside className="w-64 border rounded-xl bg-white p-4">
            <SettingsSidebar />
          </aside>
          <main className="flex-1">
            <div className="border rounded-xl shadow-sm bg-white p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}


