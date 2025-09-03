"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { ChatSession, ThreadType } from "@/types"

type ThreadFilter = "all" | "chat" | "idea"

interface AppSidebarProps {
  sessions?: ChatSession[]
  onNewThread?: () => void
  onSelectSession?: (sessionId: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export function AppSidebar({ 
  sessions = [
    { id: "1", title: "Apple Analysis", date: "Today", isActive: true, type: "chat", user_id: "demo" },
    { id: "2", title: "Portfolio Check", date: "Yesterday", isActive: false, type: "chat", user_id: "demo" }
  ],
  onNewThread,
  onSelectSession,
  isOpen = true,
  onClose
}: AppSidebarProps) {
  const [filter, setFilter] = useState<ThreadFilter>("all")

  // Filter sessions based on current filter
  const filteredSessions = sessions.filter(session => {
    if (filter === "all") return true
    return session.type === filter
  })

  // Sort by most recent activity (using date for now, could be enhanced with lastActivity)
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    // Simple date sorting - in a real app, you'd use lastActivity timestamps
    if (a.date === "Today" && b.date !== "Today") return -1
    if (b.date === "Today" && a.date !== "Today") return 1
    if (a.date === "Yesterday" && b.date !== "Yesterday" && b.date !== "Today") return -1
    if (b.date === "Yesterday" && a.date !== "Yesterday" && a.date !== "Today") return 1
    return 0
  })

  const getThreadIcon = (type: ThreadType) => {
    return type === "idea" ? "💡" : "💬"
  }
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:relative
        w-64 h-full
        border-r bg-white p-4 
        flex flex-col gap-4
        transition-transform duration-300 ease-in-out
        z-50 lg:z-auto
        flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between lg:justify-start">
          <Button 
            onClick={onNewThread}
            className="bg-indigo-600 text-white hover:bg-indigo-700 flex-1 lg:flex-none"
          >
            + New Thread
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden ml-2"
          >
            ✕
          </Button>
        </div>

        {/* Thread Filters */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: "all", label: "All" },
            { key: "chat", label: "Chats" },
            { key: "idea", label: "Ideas" }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as ThreadFilter)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                filter === key
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 flex-1 space-y-2 overflow-y-auto">
          {sortedSessions.map((session) => (
            <div 
              key={session.id}
              onClick={() => {
                onSelectSession?.(session.id)
                onClose?.() // Close sidebar on mobile after selection
              }}
              className={`p-2 rounded cursor-pointer transition-colors ${
                session.isActive 
                  ? "bg-gray-100" 
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">{getThreadIcon(session.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {session.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {session.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
} 