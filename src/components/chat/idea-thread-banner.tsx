"use client"

export function IdeaThreadBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <span className="text-2xl">💡</span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-indigo-800">
            You are in an Idea Thread
          </h3>
          <p className="text-sm text-indigo-700 mt-1">
            A space for capturing and exploring investment ideas in depth. Perfect for detailed analysis, comparisons, and research.
          </p>
        </div>
      </div>
    </div>
  )
}


