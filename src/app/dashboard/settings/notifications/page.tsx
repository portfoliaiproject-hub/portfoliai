"use client"

import PreferencesForm from "@/components/settings/preferences-form"

export default function NotificationsSettingsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Notifications</h1>
      <PreferencesForm isNotifications />
    </div>
  )
}



