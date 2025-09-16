"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

interface AppHeaderProps {
  user?: {
    email?: string
    name?: string
  }
  onMenuClick?: () => void
}

export function AppHeader({ user, onMenuClick }: AppHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          ☰
        </Button>
        <Link href="/dashboard" className="font-bold text-indigo-600 text-xl hover:text-indigo-700 transition-colors">
          PortfoliAI
        </Link>
      </div>
      
      <nav className="hidden md:flex gap-6 text-sm text-gray-600">
        <Link 
          href="/dashboard" 
          className={`hover:text-gray-900 transition-colors ${isActive('/dashboard') ? 'text-indigo-600 font-medium' : ''}`}
        >
          Dashboard
        </Link>
        <Link 
          href="/dashboard/risk-assessment" 
          className={`hover:text-gray-900 transition-colors ${isActive('/dashboard/risk-assessment') ? 'text-indigo-600 font-medium' : ''}`}
        >
          Risk Assessment
        </Link>
        <Link 
          href="/dashboard/portfolio" 
          className={`hover:text-gray-900 transition-colors ${isActive('/dashboard/portfolio') ? 'text-indigo-600 font-medium' : ''}`}
        >
          Portfolio
        </Link>
        <Link 
          href="/dashboard/settings" 
          className={`hover:text-gray-900 transition-colors ${isActive('/dashboard/settings') ? 'text-indigo-600 font-medium' : ''}`}
        >
          Settings
        </Link>
      </nav>
      
      <div className="flex items-center gap-3">
        {user?.email && (
          <span className="text-sm text-gray-600 hidden sm:inline">
            {user.email}
          </span>
        )}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-400 transition-colors"
          >
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 text-sm text-gray-600 border-b">
                {user?.email}
              </div>
              <Link 
                href="/dashboard/settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setUserMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside to close menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </header>
  )
} 