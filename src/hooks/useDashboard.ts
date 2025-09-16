"use client"

import { useMemo, useState } from "react"
import { usePortfolioContext } from "@/contexts/portfolio-context"
import { useAuthContext } from "@/contexts/auth-context"

export interface DashboardState {
  isLoading: boolean
  error?: string
}

/**
 * useDashboard
 * Central orchestrator hook keeping auth and portfolio state decoupled but
 * discoverable from dashboard screens. Future: wire trade events and sync.
 */
export function useDashboard() {
  const { user } = useAuthContext()
  const { portfolio } = usePortfolioContext()
  const [error] = useState<string | undefined>(undefined)
  const isLoading = false

  return useMemo<DashboardState & { userId?: string }>(() => ({
    isLoading,
    error,
    userId: user?.id,
  }), [isLoading, error, user?.id])
}

export default useDashboard






