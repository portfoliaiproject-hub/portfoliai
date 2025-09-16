"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

/**
 * SignupPage
 *
 * Provides Supabase-managed sign-up UI with immediate feedback and post-auth
 * redirect. Uses the same styling as login to keep UX consistent.
 */
export default function SignupPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) router.replace("/dashboard")
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
        <CardDescription className="text-sm text-gray-500 mt-2">Create your account</CardDescription>
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
          view="sign_up"
          theme="default"
        />
        <div className="text-sm text-gray-500">
          <button
            onClick={() => router.push("/login")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
            aria-label="Go to login"
          >
            Already have an account? Sign in
          </button>
        </div>
      </CardContent>
    </Card>
  )
}


