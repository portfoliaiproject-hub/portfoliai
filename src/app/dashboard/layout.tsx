"use client"

import Link from "next/link"
import { ReactNode } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-900 text-white flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold mb-8">Menu</h2>
        <Link href="/dashboard" className="hover:bg-gray-800 px-3 py-2 rounded transition">Dashboard</Link>
        <Link href="/dashboard/risk-assessment" className="hover:bg-gray-800 px-3 py-2 rounded transition">Risk Assessment</Link>
        <Link href="/dashboard/portfolio" className="hover:bg-gray-800 px-3 py-2 rounded transition">Portfolio</Link>
        <button
          className="mt-auto px-4 py-2 bg-red-500 text-white rounded"
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/")
          }}
        >
          Sign Out
        </button>
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}