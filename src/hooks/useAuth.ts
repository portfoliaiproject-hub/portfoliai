"use client"

import { useAuthContext } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

/**
 * Hook to access authentication state and methods
 * Provides a simplified interface for components that need auth functionality
 * 
 * @param redirectTo - Optional path to redirect to when user is not authenticated
 * @returns Object containing user, loading state, and auth methods
 */
export function useAuth(redirectTo?: string) {
  const { user, loading, signOut, isAuthenticated } = useAuthContext()
  const router = useRouter()

  // Handle redirect if user is not authenticated and redirectTo is provided
  useEffect(() => {
    if (!loading && !isAuthenticated && redirectTo) {
      router.push(redirectTo)
    }
  }, [loading, isAuthenticated, redirectTo, router])

  return {
    user,
    loading,
    signOut,
    isAuthenticated
  }
}

