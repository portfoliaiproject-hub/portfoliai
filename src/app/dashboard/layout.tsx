"use client"

import { ReactNode } from "react"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        {children}
      </div>
    </AuthGuard>
  )
}