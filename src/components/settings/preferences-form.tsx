"use client"

import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/toast"

export interface PreferencesFormValues {
  theme: "system" | "light" | "dark"
  compactMode: boolean
  notificationsEmail?: boolean
  notificationsPush?: boolean
}

export default function PreferencesForm({ isNotifications = false }: { isNotifications?: boolean }) {
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<PreferencesFormValues>({
    defaultValues: { theme: "system", compactMode: false, notificationsEmail: true, notificationsPush: false },
  })
  const { show } = useToast()

  const onSubmit = async (values: PreferencesFormValues) => {
    await new Promise((r) => setTimeout(r, 500))
    show({ title: "Preferences saved", message: "Your settings were updated.", variant: "success" })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label={isNotifications ? "Notifications form" : "Preferences form"}>
      {!isNotifications && (
        <>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-gray-500">Theme</legend>
            <div className="flex gap-4" role="radiogroup" aria-label="Theme selection">
              {(["system", "light", "dark"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="radio" value={opt} {...register("theme")} className="accent-indigo-600" />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" {...register("compactMode")} className="accent-indigo-600" />
            Compact mode
          </label>
        </>
      )}

      {isNotifications && (
        <>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" {...register("notificationsEmail")} className="accent-indigo-600" />
            Email notifications
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" {...register("notificationsPush")} className="accent-indigo-600" />
            Push notifications
          </label>
        </>
      )}

      <button type="submit" className="rounded-md bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm font-medium disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save"}
      </button>
    </form>
  )
}


