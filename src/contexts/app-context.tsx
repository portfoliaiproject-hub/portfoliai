"use client"

import { createContext, useContext, useMemo, useState } from "react"

export interface AppContextValue {
  isSidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const value = useMemo(() => ({ isSidebarOpen, setSidebarOpen }), [isSidebarOpen])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useAppContext must be used within AppProvider")
  return ctx
}






