"use client"

import { ReactNode } from "react"

interface ChatBubbleProps {
  role: "ai" | "user"
  content?: string
  children?: ReactNode
}

export function ChatBubble({ role, content, children }: ChatBubbleProps) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md p-3 rounded-xl text-sm shadow-sm ${
          role === "user"
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {content && <p>{content}</p>}
        {children}
      </div>
    </div>
  )
} 