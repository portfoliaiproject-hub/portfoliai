"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message)
      setMessage("")
    }
  }

  return (
    <div className="border-t p-3 flex items-center gap-2 bg-white">
      <Input
        type="text"
        placeholder={disabled ? "AI is thinking..." : "Type your message..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend()
          }
        }}
        disabled={disabled}
        className="flex-1 focus:ring-2 focus:ring-indigo-500"
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
      >
        Send
      </Button>
    </div>
  )
} 