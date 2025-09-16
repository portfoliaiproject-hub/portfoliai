"use client"

import { useCallback, useMemo, useState } from "react"

export interface SettingsState {
  theme: "system" | "light" | "dark"
  compactMode: boolean
  notificationsEmail: boolean
  notificationsPush: boolean
}

/**
 * useSettings
 * Local state hook with a stubbed persistence layer. Replace with Supabase
 * mutations/queries later. Returns getters, setters, and a save function.
 */
export function useSettings() {
  const [settings, setSettings] = useState<SettingsState>({
    theme: "system",
    compactMode: false,
    notificationsEmail: true,
    notificationsPush: false,
  })

  const update = useCallback(<K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const save = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 300))
    return true
  }, [])

  return useMemo(() => ({ settings, update, save }), [settings, update, save])
}

export default useSettings






