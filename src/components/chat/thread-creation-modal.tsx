"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { ThreadType } from "@/types"

interface ThreadCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateThread: (type: ThreadType, title?: string) => void
}

export function ThreadCreationModal({ 
  isOpen, 
  onClose, 
  onCreateThread 
}: ThreadCreationModalProps) {
  const [selectedType, setSelectedType] = useState<ThreadType | null>(null)
  const [ideaTitle, setIdeaTitle] = useState("")

  if (!isOpen) return null

  const handleCreate = () => {
    if (!selectedType) return
    
    if (selectedType === "idea" && ideaTitle.trim()) {
      onCreateThread(selectedType, ideaTitle.trim())
    } else if (selectedType === "chat") {
      onCreateThread(selectedType)
    }
    
    // Reset form
    setSelectedType(null)
    setIdeaTitle("")
    onClose()
  }

  const handleClose = () => {
    setSelectedType(null)
    setIdeaTitle("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Create New Thread</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Choose the type of thread you'd like to create:
          </p>

          {/* Thread Type Selection */}
          <div className="space-y-3">
            <div
              onClick={() => setSelectedType("chat")}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedType === "chat"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-medium text-gray-900">Chat Thread</div>
                  <div className="text-sm text-gray-600">
                    General conversation and quick questions
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedType("idea")}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedType === "idea"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="font-medium text-gray-900">Idea Thread</div>
                  <div className="text-sm text-gray-600">
                    Deep dive into investment ideas and analysis
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Idea Title Input */}
          {selectedType === "idea" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Idea Title (Optional)
              </label>
              <input
                type="text"
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                placeholder="e.g., Tesla Analysis, Tech Stock Comparison"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500">
                Leave blank to auto-generate from your first message
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!selectedType || (selectedType === "idea" && !ideaTitle.trim())}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            Create {selectedType === "idea" ? "Idea" : "Chat"} Thread
          </Button>
        </div>
      </div>
    </div>
  )
}


