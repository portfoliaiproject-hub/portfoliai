"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

/**
 * LoginPage
 *
 * Renders Supabase Auth UI for user sign-in. Handles loading, error feedback,
 * and redirects authenticated users to the dashboard. This page intentionally
 * relies on managed UI from Supabase to ensure consistency and low maintenance.
 */
export default function LoginPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Failed to get session:", error)
      }
      if (data.session?.user) {
        router.replace("/dashboard")
      }
      setLoading(false)
    }
    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) router.replace("/dashboard")
    })
    return () => subscription.unsubscribe()
  }, [router])

  if (loading) return <p className="text-center mt-10">Loading…</p>

  return (
    <Card className="border rounded-xl shadow-sm bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">PortfoliAI</CardTitle>
        <CardDescription className="text-sm text-gray-500 mt-2">Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              input: { border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 12px" },
              label: { color: "#6B7280" },
              button: { backgroundColor: "#4F46E5", color: "#fff", borderRadius: 8 },
              anchor: { color: "#4F46E5" },
              message: { color: "#EF4444" },
            },
            variables: { default: { colors: { brand: "#4F46E5", brandAccent: "#4338CA" } } },
          }}
          redirectTo={typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined}
          providers={[]}
          view="sign_in"
          theme="default"
        />
        <div className="text-sm text-gray-500">
          <button
            onClick={() => router.push("/signup")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
            aria-label="Go to signup"
          >
            Don’t have an account? Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  )
}


