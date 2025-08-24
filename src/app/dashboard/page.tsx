"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
   

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) {
        router.push("/") // if not logged in, go to login
      } else {
        setUser(data.session.user)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push("/") // if logged out, go to login
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (!user) return <p className="text-center mt-20">Loading...</p>

return (
  <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <p>This is your dashboard. Use the sidebar to navigate.</p>
    </div>
)
}
