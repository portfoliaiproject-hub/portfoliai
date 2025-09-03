"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useChat } from "@/hooks/useChat"
import { usePortfolio } from "@/hooks/usePortfolio"
import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ChatArea } from "@/components/chat/chat-area"
import { ThreadCreationModal } from "@/components/chat/thread-creation-modal"
import { IdeaChoiceBanner } from "@/components/chat/idea-choice-banner"
import { IdeaThreadBanner } from "@/components/chat/idea-thread-banner"
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary"
import { RecentActivity } from "@/components/portfolio/recent-activity"
import OnTrackCard from "@/components/OnTrackCard"

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth("/")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [showThreadModal, setShowThreadModal] = useState(false)
  
  const { portfolio, executeTrade } = usePortfolio()
  
  const {
    messages,
    isLoading: chatLoading,
    sendMessage,
    sessions,
    createNewSession,
    createNewThread,
    selectSession,
    currentSession,
    showIdeaPrompt,
    handleIdeaChoice
  } = useChat(user?.id, (trade) => {
    // Execute the trade when confirmed in chat
    executeTrade(trade.ticker, trade.quantity, trade.action)
  })

  const handleSendMessage = async (content: string) => {
    await sendMessage(content)
  }

  const handleNewThread = () => {
    setShowThreadModal(true)
  }

  const handleCreateThread = (type: any, title?: string) => {
    createNewThread(type, title)
    setShowThreadModal(false)
    setSidebarOpen(false) // Close sidebar on mobile
  }

  const handleSelectSession = (sessionId: string) => {
    selectSession(sessionId)
    setSidebarOpen(false) // Close sidebar on mobile
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your investment dashboard...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return null // useAuth hook will redirect
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Fixed Header */}
      <AppHeader 
        user={user} 
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      {/* Main Layout - Fixed Height */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Fixed */}
        <AppSidebar 
          sessions={sessions}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewThread={handleNewThread}
          onSelectSession={handleSelectSession}
        />
        
        {/* Chat Area - Scrollable */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Idea Thread Banner */}
          {currentSession?.type === "idea" && <IdeaThreadBanner />}
          
          {/* Idea Choice Banner */}
          {showIdeaPrompt && (
            <div className="p-4">
              <IdeaChoiceBanner
                onContinueChat={() => handleIdeaChoice('continue_chat')}
                onStartIdea={() => handleIdeaChoice('start_idea')}
              />
            </div>
          )}
          
          <ChatArea 
            messages={messages}
            isLoading={chatLoading}
            onSendMessage={handleSendMessage}
          />
        </div>
        
        {/* Right Sidebar - Fixed */}
        <aside className="w-96 border-l bg-gray-50 p-4 space-y-4 overflow-y-auto hidden xl:block flex-shrink-0">
          <OnTrackCard variant="compact" />
          <PortfolioSummary 
            portfolioData={portfolio.allocation}
            totalValue={portfolio.totalValue}
            gain={portfolio.totalGain}
          />
          <RecentActivity 
            activities={portfolio.activities}
            onViewAll={() => console.log('View all activity clicked')}
          />
        </aside>
        
        {/* Mobile Portfolio Toggle */}
        <div className="xl:hidden fixed bottom-20 right-4 z-30">
          <button
            onClick={() => setPortfolioOpen(!portfolioOpen)}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            aria-label="Toggle portfolio view"
          >
            📊
          </button>
        </div>
        
        {/* Mobile Portfolio Overlay */}
        {portfolioOpen && (
          <div className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg p-4 max-w-sm w-full max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setPortfolioOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
                aria-label="Close portfolio"
              >
                ✕
              </button>
              <div className="space-y-4">
                <OnTrackCard variant="compact" />
                <PortfolioSummary 
                  portfolioData={portfolio.allocation}
                  totalValue={portfolio.totalValue}
                  gain={portfolio.totalGain}
                />
                <RecentActivity 
                  activities={portfolio.activities}
                  onViewAll={() => {
                    setPortfolioOpen(false)
                    console.log('View all activity clicked')
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Thread Creation Modal */}
      <ThreadCreationModal
        isOpen={showThreadModal}
        onClose={() => setShowThreadModal(false)}
        onCreateThread={handleCreateThread}
      />
    </div>
  )
}
