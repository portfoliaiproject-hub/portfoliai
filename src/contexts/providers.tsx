"use client"

import { AppProvider } from "./app-context"
import { AuthProvider } from "./auth-context"
import { PortfolioProvider } from "./portfolio-context"

/**
 * Root provider component that wraps all application context providers
 * Ensures proper provider hierarchy and prevents context nesting issues
 * 
 * @param children - React components to be wrapped by providers
 * @returns Provider-wrapped component tree
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </AuthProvider>
    </AppProvider>
  )
}

