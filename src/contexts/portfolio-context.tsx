"use client"

import { createContext, useContext, useMemo, useState } from "react"
import type { Portfolio } from "@/types"

export interface PortfolioContextValue {
  portfolio: Portfolio | null
  setPortfolio: (p: Portfolio | null) => void
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const value = useMemo(() => ({ portfolio, setPortfolio }), [portfolio])
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolioContext() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error("usePortfolioContext must be used within PortfolioProvider")
  return ctx
}






