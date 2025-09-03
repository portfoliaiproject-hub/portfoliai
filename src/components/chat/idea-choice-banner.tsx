"use client"

import { Button } from "@/components/ui/button"

interface IdeaChoiceBannerProps {
  onContinueChat: () => void
  onStartIdea: () => void
}

export function IdeaChoiceBanner({ onContinueChat, onStartIdea }: IdeaChoiceBannerProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <span className="text-2xl">💡</span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-amber-800 mb-2">
            This looks like an investment idea!
          </h3>
          <p className="text-sm text-amber-700 mb-3">
            Would you like to continue this as a normal chat, or save it as a new Idea thread for deeper analysis?
          </p>
          <div className="flex space-x-2">
            <Button
              onClick={onContinueChat}
              variant="outline"
              size="sm"
              className="text-amber-700 border-amber-300 hover:bg-amber-100"
            >
              Continue Chat
            </Button>
            <Button
              onClick={onStartIdea}
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Start Idea Thread
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


