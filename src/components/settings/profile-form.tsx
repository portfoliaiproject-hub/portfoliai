"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useToast } from "@/components/ui/toast"

export interface ProfileFormValues {
  name: string
  email: string
}

/**
 * ProfileForm
 *
 * Accessible, validated profile editor. Currently local-only; replace save
 * handlers with Supabase mutations later. Provides optimistic feedback via
 * the toast system.
 */
export default function ProfileForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
    defaultValues: { name: "", email: "" },
    mode: "onBlur",
  })
  const { show } = useToast()
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  const onSubmit = async (data: ProfileFormValues) => {
    await new Promise((r) => setTimeout(r, 600))
    setSavedAt(new Date())
    show({ title: "Profile updated", message: "Your profile was saved.", variant: "success" })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Profile form">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-gray-500">Name</label>
        <input
          id="name"
          type="text"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name is too short" } })}
        />
        {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-gray-500">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: "Enter a valid email" },
          })}
        />
        {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm font-medium disabled:opacity-50"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Saving…" : "Save changes"}
      </button>
      {savedAt && <p className="text-xs text-gray-500">Last saved {savedAt.toLocaleTimeString()}</p>}
    </form>
  )
}


