"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import type { User } from "@/types"

/**
 * Authentication context value interface
 * Provides user state, loading status, and authentication methods
 */
export interface AuthContextValue {
  /** Current authenticated user or null if not authenticated */
  user: User | null
  /** Loading state during authentication checks */
  loading: boolean
  /** Sign out function that clears user session */
  signOut: () => Promise<void>
  /** Boolean indicating if user is authenticated */
  isAuthenticated: boolean
  /** Redirect to specified path after authentication check */
  redirectTo?: string
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * Authentication provider component
 * Manages user authentication state and provides auth methods to child components
 * 
 * @param children - React components to be wrapped by auth provider
 * @param redirectTo - Optional path to redirect to when user is not authenticated
 * @returns AuthContext provider wrapped component tree
 */
export function AuthProvider({ 
  children, 
  redirectTo 
}: { 
  children: React.ReactNode
  redirectTo?: string 
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    /**
     * Initialize authentication state by checking current session
     */
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("Auth session error:", error)
          setLoading(false)
          return
        }

        if (!data.session?.user) {
          if (redirectTo) {
            router.push(redirectTo)
          }
        } else {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || "",
            name: data.session.user.user_metadata?.name,
            created_at: data.session.user.created_at,
          })
        }
      } catch (error) {
        console.error("Unexpected auth error:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session?.user) {
          setUser(null)
          if (redirectTo) {
            router.push(redirectTo)
          }
        } else if (event === 'SIGNED_IN' && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name,
            created_at: session.user.created_at,
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, redirectTo])

  /**
   * Sign out the current user and clear authentication state
   * @returns Promise that resolves when sign out is complete
   */
  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      if (redirectTo) {
        router.push(redirectTo)
      }
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  }

  const value = useMemo(() => ({ 
    user, 
    loading, 
    signOut, 
    isAuthenticated: !!user,
    redirectTo 
  }), [user, loading, redirectTo])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to access authentication context
 * Must be used within AuthProvider component
 * 
 * @returns AuthContextValue with user state and auth methods
 * @throws Error if used outside AuthProvider
 */
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }
  return context
}



