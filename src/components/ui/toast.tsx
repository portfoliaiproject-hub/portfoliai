"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"

export interface Toast {
  id: string
  title?: string
  message: string
  variant?: "default" | "success" | "error" | "warning"
}

interface ToastContextValue {
  toasts: Toast[]
  show: (toast: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => dismiss(id), 4000)
  }, [dismiss])

  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`min-w-64 rounded-xl border px-4 py-3 shadow-sm bg-white ${
              t.variant === "success" ? "border-emerald-500" :
              t.variant === "error" ? "border-red-500" :
              t.variant === "warning" ? "border-amber-500" :
              "border-gray-200"
            }`}
          >
            {t.title && <div className="mb-1 text-sm font-semibold text-gray-900">{t.title}</div>}
            <div className="text-sm text-gray-700">{t.message}</div>
            <button className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium" onClick={() => dismiss(t.id)}>Dismiss</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}


