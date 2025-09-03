"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import type { User } from "@/types"

interface UseAuthReturn {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

export function useAuth(redirectTo?: string): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get current session
    const getSession = async () => {
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

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
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
    })

    return () => subscription.unsubscribe()
  }, [router, redirectTo])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      if (redirectTo) {
        router.push(redirectTo)
      }
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user,
  }
} 