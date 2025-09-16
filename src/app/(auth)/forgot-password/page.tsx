"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

/**
 * ForgotPasswordPage
 *
 * Leverages Supabase Auth UI password reset flow. If an OTP link flow is configured
 * server-side, Supabase will handle email delivery. We provide clear feedback and
 * keep visual consistency across auth pages.
 */
export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) router.replace("/dashboard")
      setLoading(false)
    }
    init()
  }, [router])

  if (loading) return <p className="text-center mt-10">Loading…</p>

  return (
    <Card className="border rounded-xl shadow-sm bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">PortfoliAI</CardTitle>
        <CardDescription className="text-sm text-gray-500 mt-2">Reset your password</CardDescription>
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
          providers={[]}
          view="forgotten_password"
          theme="default"
        />
        <div className="text-sm text-gray-500">
          <button
            onClick={() => router.push("/login")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
            aria-label="Back to login"
          >
            Back to login
          </button>
        </div>
      </CardContent>
    </Card>
  )
}


