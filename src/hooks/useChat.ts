"use client"

import { useState, useCallback, useEffect } from "react"
import type { Message, ChatSession, ThreadType } from "@/types"
import { MOCK_DATA, DEMO_STOCK_PRICES } from "@/constants"

interface UseChatReturn {
  messages: Message[]
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
  addMessage: (message: Message) => void
  sessions: ChatSession[]
  currentSession: ChatSession | null
  createNewSession: () => void
  createNewThread: (type: ThreadType, title?: string) => void
  selectSession: (sessionId: string) => void
  pendingTrade: PendingTrade | null
  isIdeaCandidate: boolean
  showIdeaPrompt: boolean
  handleIdeaChoice: (choice: 'continue_chat' | 'start_idea') => void
}

interface PendingTrade {
  action: 'buy' | 'sell'
  ticker: string
  quantity: number
  price: number
  totalCost: number
}

// Helper function to detect if user is asking about Apple
const detectAppleRequest = (content: string): boolean => {
  const lowerContent = content.toLowerCase()
  const appleKeywords = ['apple', 'aapl', 'show me apple', 'apple analysis', 'apple stock']
  return appleKeywords.some(keyword => lowerContent.includes(keyword))
}

// Helper function to detect if a message is an idea candidate
const detectIdeaCandidate = (content: string): boolean => {
  const lowerContent = content.toLowerCase().trim()
  
  // Single stock analysis patterns (more specific)
  const singleStockPatterns = [
    /^analyze\s+([a-z]{1,5})$/i,
    /^([a-z]{1,5})\s+analysis$/i,
    /^show\s+me\s+([a-z]{1,5})$/i,
    /^tell\s+me\s+about\s+([a-z]{1,5})$/i,
    /^what\s+about\s+([a-z]{1,5})$/i,
    /^([a-z]{1,5})\s+stock$/i,
    /^([a-z]{1,5})\s+investment$/i
  ]
  
  // Comparison patterns
  const comparisonPatterns = [
    /compare\s+([a-z]{1,5})\s+and\s+([a-z]{1,5})/i,
    /([a-z]{1,5})\s+vs\s+([a-z]{1,5})/i,
    /([a-z]{1,5})\s+versus\s+([a-z]{1,5})/i,
    /([a-z]{1,5})\s+or\s+([a-z]{1,5})/i
  ]
  
  // Check if it matches any idea candidate pattern
  const isSingleStock = singleStockPatterns.some(pattern => pattern.test(lowerContent))
  const isComparison = comparisonPatterns.some(pattern => pattern.test(lowerContent))
  
  // Only check for common stock tickers if it's a simple ticker (not part of a longer sentence)
  const commonTickers = ['aapl', 'msft', 'googl', 'amzn', 'tsla', 'meta', 'nvda', 'nflx', 'amd', 'intc']
  const isSimpleTicker = commonTickers.some(ticker => 
    lowerContent === ticker || 
    lowerContent === `$${ticker}` ||
    lowerContent.startsWith(`${ticker} `) ||
    lowerContent.endsWith(` ${ticker}`)
  )
  
  return isSingleStock || isComparison || isSimpleTicker
}

// Helper function to detect comparison requests
const detectComparisonRequest = (content: string): string | null => {
  const lowerContent = content.toLowerCase()
  
  // Apple vs Microsoft variations
  const appleVsMsftPatterns = [
    /apple.*vs.*microsoft/,
    /microsoft.*vs.*apple/,
    /aapl.*vs.*msft/,
    /msft.*vs.*aapl/,
    /compare.*apple.*microsoft/,
    /compare.*microsoft.*apple/,
    /apple.*microsoft.*comparison/,
    /apple.*or.*microsoft/,
    /microsoft.*or.*apple/
  ]
  
  if (appleVsMsftPatterns.some(pattern => pattern.test(lowerContent))) {
    return 'apple_vs_microsoft'
  }
  
  return null
}

// Helper function to parse trading commands
const parseTradeCommand = (content: string): PendingTrade | null => {
  const lowerContent = content.toLowerCase().trim()
  
  // Patterns for buy/sell commands
  const buyPatterns = [
    /buy\s+(\d+(?:\.\d+)?)\s+([a-z]{1,5})\s*shares?/i,
    /buy\s+([a-z]{1,5})\s+(\d+(?:\.\d+)?)\s*shares?/i,
    /purchase\s+(\d+(?:\.\d+)?)\s+([a-z]{1,5})\s*shares?/i,
    /(\d+(?:\.\d+)?)\s+([a-z]{1,5})\s*shares?\s+buy/i
  ]
  
  const sellPatterns = [
    /sell\s+(\d+(?:\.\d+)?)\s+([a-z]{1,5})\s*shares?/i,
    /sell\s+([a-z]{1,5})\s+(\d+(?:\.\d+)?)\s*shares?/i,
    /(\d+(?:\.\d+)?)\s+([a-z]{1,5})\s*shares?\s+sell/i
  ]
  
  // Try buy patterns
  for (const pattern of buyPatterns) {
    const match = content.match(pattern)
    if (match) {
      let quantity: number
      let ticker: string
      
      // Handle different capture group orders
      if (pattern.toString().includes('buy\\s+([a-z]')) {
        ticker = match[1].toUpperCase()
        quantity = parseFloat(match[2])
      } else {
        quantity = parseFloat(match[1])
        ticker = match[2].toUpperCase()
      }
      
      const price = DEMO_STOCK_PRICES[ticker as keyof typeof DEMO_STOCK_PRICES]
      if (price && quantity > 0) {
        return {
          action: 'buy',
          ticker,
          quantity,
          price,
          totalCost: price * quantity
        }
      }
    }
  }
  
  // Try sell patterns
  for (const pattern of sellPatterns) {
    const match = content.match(pattern)
    if (match) {
      let quantity: number
      let ticker: string
      
      if (pattern.toString().includes('sell\\s+([a-z]')) {
        ticker = match[1].toUpperCase()
        quantity = parseFloat(match[2])
      } else {
        quantity = parseFloat(match[1])
        ticker = match[2].toUpperCase()
      }
      
      const price = DEMO_STOCK_PRICES[ticker as keyof typeof DEMO_STOCK_PRICES]
      if (price && quantity > 0) {
        return {
          action: 'sell',
          ticker,
          quantity,
          price,
          totalCost: price * quantity
        }
      }
    }
  }
  
  return null
}

// Helper function to generate contextual AI responses
const generateAIResponse = (userMessage: string, pendingTrade: PendingTrade | null): { messages: Message[], newPendingTrade: PendingTrade | null } => {
  const lowerMessage = userMessage.toLowerCase()
  
  // Handle trade confirmation
  if (pendingTrade && (lowerMessage.includes('yes') || lowerMessage.includes('confirm') || lowerMessage === 'y')) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: `✅ Trade confirmed! ${pendingTrade.action === 'buy' ? 'Purchased' : 'Sold'} ${pendingTrade.quantity} ${pendingTrade.ticker} shares for $${pendingTrade.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}. Your portfolio and recent activity have been updated.`,
          type: "text",
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Handle trade cancellation
  if (pendingTrade && (lowerMessage.includes('no') || lowerMessage.includes('cancel') || lowerMessage === 'n')) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: "Trade cancelled. Is there anything else I can help you with?",
          type: "text",
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Parse new trade command
  const tradeCommand = parseTradeCommand(userMessage)
  if (tradeCommand) {
    const availableTickers = Object.keys(DEMO_STOCK_PRICES).join(', ')
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: `💰 **Trade Confirmation Required**\n\n${tradeCommand.action === 'buy' ? 'Purchasing' : 'Selling'} **${tradeCommand.quantity} ${tradeCommand.ticker} shares** at **$${tradeCommand.price}** per share.\n\n**Total Cost:** $${tradeCommand.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n*📝 Note: Using demo prices for simulation*\n\nType **'yes'** to confirm or **'no'** to cancel this trade.`,
          type: "text",
          timestamp: new Date()
        }
      ],
      newPendingTrade: tradeCommand
    }
  }
  
  // Check for comparison requests first
  const comparisonType = detectComparisonRequest(userMessage)
  if (comparisonType === 'apple_vs_microsoft') {
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: "Great question! Let me provide a comprehensive comparison of Apple vs Microsoft for you:",
          type: "text",
          timestamp: new Date()
        },
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          type: "comparison_card",
          data: MOCK_DATA.comparisons.appleVsMicrosoft,
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Apple company card request
  if (detectAppleRequest(userMessage)) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: "Here's my analysis of Apple (AAPL):",
          type: "text",
          timestamp: new Date()
        },
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          type: "company_card",
          data: MOCK_DATA.companies.apple,
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Portfolio-related requests
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('holdings')) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: "You can see your portfolio summary on the right side of the screen. Your current portfolio is diversified across stocks, real estate, and land holdings with a total value of $45,000.",
          type: "text",
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Trading help
  if (lowerMessage.includes('trade') || lowerMessage.includes('stock') || lowerMessage.includes('shares')) {
    const availableTickers = Object.keys(DEMO_STOCK_PRICES).join(', ')
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: `📈 **Stock Trading Available**\n\nI can help you buy or sell stocks! Try commands like:\n• "buy 5 AAPL shares"\n• "sell 2 MSFT shares"\n• "purchase 10 AMZN shares"\n\n**Available stocks (demo prices):**\n${availableTickers}\n\n*Note: This is a demo using simulated prices. Your portfolio will update in real-time!*`,
          type: "text",
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Investment advice requests
  if (lowerMessage.includes('invest') || lowerMessage.includes('buy') || lowerMessage.includes('recommendation')) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: "I'd be happy to help with investment advice! To give you personalized recommendations, I'd need to understand your risk tolerance and investment goals better. Have you completed your risk assessment yet?\n\nOr if you want to trade stocks directly, try: 'buy 5 AAPL shares'",
          type: "text",
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Risk assessment requests
  if (lowerMessage.includes('risk') || lowerMessage.includes('assessment')) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: "A risk assessment helps me understand your investment personality and recommend suitable strategies. Would you like to start your risk assessment now?",
          type: "text",
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          role: "ai",
          content: "Hello! I'm your AI investment assistant. I can help you analyze companies, manage your portfolio, and execute trades. What would you like to explore today?",
          type: "text",
          timestamp: new Date()
        }
      ],
      newPendingTrade: null
    }
  }
  
  // Default response
  return {
    messages: [
      {
        id: Date.now().toString(),
        role: "ai",
        content: "I understand you're asking about that! I can help you with:\n• Company analysis (try 'Apple')\n• Stock comparisons (try 'Apple vs Microsoft')\n• Stock trading (try 'buy 5 AAPL shares')\n• Portfolio reviews (try 'portfolio')\n\nWhat would you like to explore?",
        type: "text",
        timestamp: new Date()
      }
    ],
    newPendingTrade: null
  }
}

export function useChat(userId?: string, onTradeExecuted?: (trade: PendingTrade) => void): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content: "Welcome back! I can help you analyze companies, compare stocks, trade stocks, and review your portfolio. Try asking me about 'Apple', 'buy 5 AAPL shares', or your 'portfolio'!",
      type: "text",
      timestamp: new Date()
    }
  ])
  
  const [isLoading, setIsLoading] = useState(false)
  const [demoTipShown, setDemoTipShown] = useState(false)
  const [pendingTrade, setPendingTrade] = useState<PendingTrade | null>(null)
  const [isIdeaCandidate, setIsIdeaCandidate] = useState(false)
  const [showIdeaPrompt, setShowIdeaPrompt] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "default",
      title: "Investment Chat",
      date: "Today",
      isActive: true,
      user_id: userId || "demo",
      messages: [],
      type: "chat",
      threadTypeLocked: false,
      ideaPromptShown: false
    },
    {
      id: "idea-1",
      title: "Tesla Analysis",
      date: "Today",
      isActive: false,
      user_id: userId || "demo",
      messages: [],
      type: "idea",
      threadTypeLocked: true,
      ideaPromptShown: false
    },
    {
      id: "idea-2",
      title: "Tech Stock Comparison",
      date: "Yesterday",
      isActive: false,
      user_id: userId || "demo",
      messages: [],
      type: "idea",
      threadTypeLocked: true,
      ideaPromptShown: false
    }
  ])
  
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(sessions[0])

  // Show demo tip once after a delay (only in chat threads)
  useEffect(() => {
    if (!demoTipShown && currentSession?.type === "chat") {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `demo-tip-${Date.now()}`,
          role: "ai",
          content: "💡 **Demo Tips**: Try 'Apple' for analysis, 'Apple vs Microsoft' for comparison, or 'buy 5 AAPL shares' for trading!",
          type: "text",
          timestamp: new Date()
        }])
        setDemoTipShown(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [demoTipShown, currentSession])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      type: "text",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Check if this is an idea candidate (only in chat threads that aren't locked and haven't shown the prompt)
      const isIdeaCandidateMessage = currentSession && 
                                   currentSession.type === "chat" && 
                                   !currentSession.threadTypeLocked && 
                                   !currentSession.ideaPromptShown && 
                                   detectIdeaCandidate(content)
      
      // Debug logging
      console.log('Idea detection check:', {
        content,
        currentSession: currentSession?.id,
        type: currentSession?.type,
        threadTypeLocked: currentSession?.threadTypeLocked,
        ideaPromptShown: currentSession?.ideaPromptShown,
        isIdeaCandidate: detectIdeaCandidate(content),
        willShowPrompt: isIdeaCandidateMessage && !showIdeaPrompt
      })
      
      if (isIdeaCandidateMessage && !showIdeaPrompt) {
        setIsIdeaCandidate(true)
        setShowIdeaPrompt(true)
        
        // Mark that we've shown the idea prompt for this session
        setSessions(prev => prev.map(s => 
          s.id === currentSession?.id 
            ? { ...s, ideaPromptShown: true }
            : s
        ))
        
        // Don't add any message - just show the banner
        setIsLoading(false)
        return
      }

      // Simulate a brief delay for more realistic feel
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const { messages: aiResponses, newPendingTrade } = generateAIResponse(content, pendingTrade)
      
      // If trade was confirmed, execute it
      if (pendingTrade && !newPendingTrade && (content.toLowerCase().includes('yes') || content.toLowerCase().includes('confirm'))) {
        onTradeExecuted?.(pendingTrade)
      }
      
      setPendingTrade(newPendingTrade)
      
      // Add AI responses with slight delays between them
      for (let i = 0; i < aiResponses.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i * 500))
        setMessages(prev => [...prev, aiResponses[i]])
      }
      
    } catch (error) {
      console.error("Failed to send message:", error)
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        type: "text",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [pendingTrade, onTradeExecuted, currentSession, showIdeaPrompt])

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
  }, [])

  const clearChat = useCallback(() => {
    setMessages([{
      id: Date.now().toString(),
      role: "ai",
      content: "Welcome back! I can help you analyze companies, compare stocks, trade stocks, and review your portfolio. Try asking me about 'Apple', 'buy 5 AAPL shares', or your 'portfolio'!",
      type: "text",
      timestamp: new Date()
    }])
    setDemoTipShown(false) // Reset demo tip for new chat
    setPendingTrade(null) // Clear any pending trades
    setShowIdeaPrompt(false) // Clear any idea prompts
    setIsIdeaCandidate(false) // Clear idea candidate state
  }, [])

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Investment Chat",
      date: "Today",
      isActive: true,
      user_id: userId || "demo",
      messages: [],
      type: "chat",
      threadTypeLocked: false,
      ideaPromptShown: false
    }

    setSessions(prev => [...prev.map(s => ({ ...s, isActive: false })), newSession])
    setCurrentSession(newSession)
    clearChat()
  }, [userId, clearChat])

  const createNewThread = useCallback((type: ThreadType, title?: string) => {
    const defaultTitle = type === "idea" 
      ? (title || "New Investment Idea")
      : "New Investment Chat"
    
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: defaultTitle,
      date: "Today",
      isActive: true,
      user_id: userId || "demo",
      messages: [],
      type,
      threadTypeLocked: type === "idea", // Idea threads are immediately locked
      ideaPromptShown: false
    }

    setSessions(prev => [...prev.map(s => ({ ...s, isActive: false })), newSession])
    setCurrentSession(newSession)
    
    // Set up initial messages based on thread type
    if (type === "idea") {
      setMessages([
        {
          id: "idea-welcome",
          role: "ai",
          content: "💡 You are in an Idea Thread — a space for capturing and exploring investment ideas in depth.",
          type: "text",
          timestamp: new Date()
        }
      ])
    } else {
      clearChat()
    }
  }, [userId, clearChat])

  const handleIdeaChoice = useCallback((choice: 'continue_chat' | 'start_idea') => {
    if (choice === 'continue_chat') {
      // Continue as normal chat - lock this thread as a chat thread
      setShowIdeaPrompt(false)
      setIsIdeaCandidate(false)
      
      // Lock the current session as a chat thread
      setSessions(prev => prev.map(s => 
        s.id === currentSession?.id 
          ? { ...s, threadTypeLocked: true, type: "chat" }
          : s
      ))
      
      // Process the last user message (the one that triggered the idea detection)
      const lastUserMessage = messages[messages.length - 1] // Last message (the user's message)
      if (lastUserMessage && lastUserMessage.role === "user") {
        // Process the message normally
        sendMessage(lastUserMessage.content || "")
      }
    } else {
      // Start as idea thread
      const lastUserMessage = messages[messages.length - 1] // Last message (the user's message)
      const ideaTitle = lastUserMessage?.content || "New Investment Idea"
      
      // Create new idea thread
      createNewThread("idea", ideaTitle)
      
      // Process the original message in the new idea thread
      if (lastUserMessage && lastUserMessage.role === "user") {
        setTimeout(() => {
          sendMessage(lastUserMessage.content || "")
        }, 100)
      }
    }
  }, [messages, sendMessage, createNewThread, currentSession])

  const selectSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.map(s => ({ 
      ...s, 
      isActive: s.id === sessionId 
    })))
    
    const session = sessions.find(s => s.id === sessionId)
    if (session) {
      setCurrentSession(session)
      setMessages(session.messages || [])
      
      // Reset idea prompt state when switching sessions
      setShowIdeaPrompt(false)
      setIsIdeaCandidate(false)
    }
  }, [sessions])

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    addMessage,
    sessions,
    currentSession,
    createNewSession,
    createNewThread,
    selectSession,
    pendingTrade,
    isIdeaCandidate,
    showIdeaPrompt,
    handleIdeaChoice
  }
} 