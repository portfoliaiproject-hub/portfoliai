"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SettingsSidebar() {
  const pathname = usePathname()
  const items = [
    { href: "/dashboard/settings/profile", label: "Profile" },
    { href: "/dashboard/settings/preferences", label: "Preferences" },
    { href: "/dashboard/settings/security", label: "Security" },
    { href: "/dashboard/settings/notifications", label: "Notifications" },
  ]
  return (
    <nav aria-label="Settings navigation" className="space-y-1">
      {items.map((item) => {
        const active = pathname?.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
              active ? "bg-gray-100 text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default SettingsSidebar


