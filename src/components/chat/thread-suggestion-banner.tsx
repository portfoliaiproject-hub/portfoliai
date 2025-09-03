"use client"

import { Button } from "@/components/ui/button"

interface ThreadSuggestionBannerProps {
  asset: string
  onCreateIdea: () => void
  onDismiss: () => void
}

export function ThreadSuggestionBanner({ 
  asset, 
  onCreateIdea, 
  onDismiss 
}: ThreadSuggestionBannerProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 mx-3 lg:mx-6">
      <div className="flex items-start gap-3">
        <div className="text-2xl">💡</div>
        <div className="flex-1">
          <h4 className="font-medium text-blue-900 mb-1">
            Deep Analysis Detected
          </h4>
          <p className="text-sm text-blue-700 mb-3">
            This looks like detailed <span className="font-medium">{asset}</span> analysis. 
            Idea threads are perfect for saving research and building investment theses.
          </p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={onCreateIdea}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              💡 Create Idea Thread
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onDismiss}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              💬 Keep in Chat
            </Button>
          </div>
        </div>
        <button 
          onClick={onDismiss}
          className="text-blue-400 hover:text-blue-600 transition-colors"
          aria-label="Dismiss suggestion"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
