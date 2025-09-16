"use client"

import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/toast"
import { useState } from "react"

interface SecurityFormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  enable2fa: boolean
}

export default function SecuritySettings() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SecurityFormValues>({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "", enable2fa: false },
  })
  const { show } = useToast()
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  const onSubmit = async (values: SecurityFormValues) => {
    if (values.newPassword !== values.confirmPassword) return
    await new Promise((r) => setTimeout(r, 600))
    setSavedAt(new Date())
    show({ title: "Security updated", message: "Your security settings were saved.", variant: "success" })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Security settings form">
      <div>
        <label htmlFor="currentPassword" className="mb-1 block text-sm text-gray-500">Current password</label>
        <input id="currentPassword" type="password" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register("currentPassword", { required: "Required" })} />
        {errors.currentPassword && <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>}
      </div>
      <div>
        <label htmlFor="newPassword" className="mb-1 block text-sm text-gray-500">New password</label>
        <input id="newPassword" type="password" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register("newPassword", { required: "Required", minLength: { value: 8, message: "Min 8 chars" } })} />
        {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm text-gray-500">Confirm password</label>
        <input id="confirmPassword" type="password" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register("confirmPassword", {
          required: "Required",
          validate: (v) => v === watch("newPassword") || "Passwords do not match",
        })} />
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" {...register("enable2fa")} className="accent-indigo-600" />
        Enable 2FA (coming soon)
      </label>
      <button type="submit" className="rounded-md bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm font-medium disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save"}
      </button>
      {savedAt && <p className="text-xs text-gray-500">Last saved {savedAt.toLocaleTimeString()}</p>}
    </form>
  )
}


