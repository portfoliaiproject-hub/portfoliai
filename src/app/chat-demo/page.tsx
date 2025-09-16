"use client"

import { useState } from "react"
import { ChatArea } from "@/components/chat/chat-area"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Message } from "@/types"
import { ChatProcessor } from "@/lib/services/chatProcessor"

const DEMO_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "ai",
    content: "Welcome to the Enhanced Chat Demo! I can help you with:\n\n• **Stock Analysis**: 'What's the price of AAPL?'\n• **Company Info**: 'Tell me about Microsoft'\n• **News**: 'Latest news for Tesla'\n• **Comparisons**: 'Compare AAPL vs MSFT'\n• **Market Movers**: 'Show me high volume stocks'\n• **Financial Health**: 'Financial health of NVIDIA'\n• **Education**: 'What are dividends?'\n\nTry any of these queries to see the enhanced card-based responses!",
    type: "text",
    timestamp: new Date()
  }
]

const DEMO_QUERIES = [
  { label: "Stock Price", query: "What's the price of AAPL?" },
  { label: "Company Info", query: "Tell me about Microsoft" },
  { label: "Latest News", query: "Latest news for Tesla" },
  { label: "Compare Stocks", query: "Compare AAPL vs MSFT" },
  { label: "Market Movers", query: "Show me high volume stocks" },
  { label: "Financial Health", query: "Financial health of NVIDIA" },
  { label: "Learn Dividends", query: "What are dividends?" },
  { label: "Market Cap", query: "Explain market cap" },
  { label: "Diversification", query: "What is diversification?" }
]

export default function ChatDemoPage() {
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
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
      // Use ChatProcessor to get the appropriate response
      const response = await ChatProcessor.processUserMessage(content)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: response.textResponse,
        type: response.responseType,
        data: response.data,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      
      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Sorry, I encountered an error processing your request. Please try again.",
        type: "text",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoQuery = (query: string) => {
    handleSendMessage(query)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Enhanced Chat Component Demo
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Showcasing the new card-based chat interface with enhanced financial data visualization
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="default">Company Cards</Badge>
              <Badge variant="secondary">Comparison Cards</Badge>
              <Badge variant="outline">Market Movers</Badge>
              <Badge variant="default">Financial Health</Badge>
              <Badge variant="secondary">News Cards</Badge>
              <Badge variant="outline">Educational Content</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Demo Queries Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Try These Queries</h2>
                  <p className="text-sm text-gray-600">
                    Click any query to see how the enhanced chat responds with appropriate card types
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {DEMO_QUERIES.map((demoQuery, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleDemoQuery(demoQuery.query)}
                      disabled={isLoading}
                    >
                      <div>
                        <div className="font-medium text-sm">{demoQuery.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{demoQuery.query}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Features Overview */}
              <Card className="mt-6">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Enhanced Features</h3>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Real-time Stock Data</strong>
                      <p className="text-gray-600">Live prices, changes, and key metrics</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Visual Card Interface</strong>
                      <p className="text-gray-600">Rich, scannable data presentation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Smart Query Processing</strong>
                      <p className="text-gray-600">Intelligent detection of user intent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Educational Content</strong>
                      <p className="text-gray-600">Financial coaching and explanations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <h2 className="text-xl font-semibold">Enhanced Chat Interface</h2>
                  <p className="text-sm text-gray-600">
                    Experience the new card-based responses with real financial data
                  </p>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ChatArea
                    messages={messages}
                    isLoading={isLoading}
                    onSendMessage={handleSendMessage}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Implementation Notes */}
          <Card className="mt-8">
            <CardHeader>
              <h3 className="text-lg font-semibold">Implementation Notes</h3>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">New Card Types Added:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li><strong>Enhanced Company Card:</strong> Real-time stock data, key metrics, visual indicators</li>
                  <li><strong>Market Movers Card:</strong> Daily gainers/losers with volume analysis</li>
                  <li><strong>Financial Health Card:</strong> Comprehensive financial metrics with benchmarks</li>
                  <li><strong>News Card:</strong> Recent headlines with sentiment analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">ChatProcessor Service:</h4>
                <p className="text-gray-600">
                  Intelligent query processing that detects user intent and returns appropriate card types based on the design document scenarios.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Enhanced Types:</h4>
                <p className="text-gray-600">
                  Extended type definitions to support new data structures including StockData, MarketMover, FinancialMetric, and NewsItem.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
