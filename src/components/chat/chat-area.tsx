"use client"

import { useEffect, useRef, useState } from "react"
import { ChatBubble } from "./chat-bubble"
import { ChatInput } from "./chat-input"
import { CompanyCard } from "@/components/investment/company-card"
import { ComparisonCard } from "@/components/investment/comparison-card"
import { MarketMoversCard } from "@/components/investment/market-movers-card"
import { FinancialHealthCard } from "@/components/investment/financial-health-card"
import { NewsCard } from "@/components/investment/news-card"
import type { Message, Company, ComparisonData, MarketMoversData, FinancialHealthData, NewsData } from "@/types"

interface ChatAreaProps {
  messages: Message[]
  isLoading: boolean
  onSendMessage: (content: string) => Promise<void>
}

export function ChatArea({ messages, isLoading, onSendMessage }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(100) // Start at bottom (100%)
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle scroll events to update scroll button visibility
  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const maxScroll = scrollHeight - clientHeight

    if (maxScroll <= 0) {
      setScrollProgress(100)
      setShowScrollButton(false)
      return
    }

    const progress = (scrollTop / maxScroll) * 100
    setScrollProgress(Math.min(100, Math.max(0, progress)))
    
    // Show scroll-to-bottom button when not near the bottom
    setShowScrollButton(progress < 90 && maxScroll > 10)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      // Initial check
      handleScroll()
      
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [messages])

  return (
    <main className="flex-1 flex flex-col min-w-0 relative">
      {/* Messages Container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-3 lg:p-6 space-y-4"
        style={{ 
          scrollBehavior: 'smooth',
          // Ensure proper scrolling area
          maxHeight: 'calc(100vh - 140px)' // Account for header and input
        }}
      >
        {messages.map((message) => (
          <ChatBubble 
            key={message.id} 
            role={message.role} 
            content={message.type === "company_card" || message.type === "comparison_card" || message.type === "market_movers_card" || message.type === "financial_health_card" || message.type === "news_card" ? undefined : message.content}
          >
            {message.type === "company_card" && message.data && (
              <CompanyCard {...(message.data as Company)} />
            )}
            {message.type === "comparison_card" && message.data && (
              <ComparisonCard {...(message.data as ComparisonData)} />
            )}
            {message.type === "market_movers_card" && message.data && (
              <MarketMoversCard {...(message.data as MarketMoversData)} />
            )}
            {message.type === "financial_health_card" && message.data && (
              <FinancialHealthCard {...(message.data as FinancialHealthData)} />
            )}
            {message.type === "news_card" && message.data && (
              <NewsCard {...(message.data as NewsData)} />
            )}
          </ChatBubble>
        ))}
        
        {isLoading && (
          <ChatBubble role="ai">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span>Analyzing...</span>
            </div>
          </ChatBubble>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Fixed Chat Input */}
      <div className="flex-shrink-0 border-t bg-white">
        <ChatInput 
          onSend={onSendMessage}
          disabled={isLoading}
        />
      </div>

      {/* Scroll to Bottom Button (appears when not at bottom) */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-6 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-10"
          aria-label="Scroll to bottom"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </main>
  )
} 