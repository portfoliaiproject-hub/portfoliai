"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Get session on load
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user)
        router.push("/dashboard") // redirect if already logged in
      }
      setLoading(false)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        router.push("/dashboard")
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) return <p className="text-center mt-20">Loading...</p>

  // If no user, show login form
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            input: { color: "white" },
            label: { color: "white" },
            message: { color: "white" },
            anchor: { color: "#3b82f6" },
          },
          variables: {
            default: {
              colors: {
                brand: "#3b82f6",
                brandAccent: "#2563eb",
                inputText: "white",
              },
            },
          },
        }}
        theme="dark"
        providers={[]}
      />
    </div>
  )
}
