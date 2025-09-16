"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

/**
 * AuthGuard
 *
 * Higher-order wrapper that ensures its children render only when the user is
 * authenticated. Displays a lightweight loading state while checking session
 * and redirects unauthenticated users.
 */
export function AuthGuard({ children, redirectTo = "/login" }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth(redirectTo)
  const router = useRouter()

  useEffect(() => {
    // If not loading and unauthenticated, redirect is handled in useAuth
    if (!loading && !isAuthenticated) {
      // no-op
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center" role="status" aria-live="polite">
        <span className="text-sm text-white/70">Checking authentication…</span>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return <>{children}</>
}

export default AuthGuard


