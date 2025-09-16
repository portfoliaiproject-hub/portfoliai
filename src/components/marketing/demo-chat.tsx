"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { Message, CompanyComparison, Company } from "@/types"
import { ChatBubble } from "@/components/chat/chat-bubble"
import { ChatInput } from "@/components/chat/chat-input"
import { Card, CardContent } from "@/components/ui/card"
import { CompanyCard } from "@/components/investment/company-card"
import { ComparisonCard } from "@/components/investment/comparison-card"

const SUGGESTIONS = [
  "Should I invest in Apple?",
  "Compare Tesla vs Ford",
  "Analyze my portfolio risk",
  "What's a good growth stock?",
]

export default function DemoChat({ onLimitReached }: { onLimitReached?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", role: "ai", content: "Hi! I'm PortfoliAI. Ask me anything about investments." },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [exchanges, setExchanges] = useState(0)
  const limitReached = exchanges >= 3

  const handleDemoResponse = useCallback(async (content: string) => {
    setIsLoading(true)
    // Simulate latency
    await new Promise((r) => setTimeout(r, 600))

    if (content.toLowerCase().includes("apple")) {
      const company: Company = {
        ticker: "AAPL",
        name: "Apple Inc.",
        snapshot: "Consumer tech leader with robust services ecosystem",
        moat: "Brand, integrated hardware+software, ecosystem lock-in",
        risks: ["Hardware cycles", "Regulatory scrutiny"],
        valuationMetrics: { pe: "28.5x", ps: "7.2x", industryPE: "24.0x", industryPS: "4.1x", marginOfSafety: "-10%" },
        fit: "Core quality compounder",
      }
      setMessages((prev) => [
        ...prev,
        { id: Math.random().toString(), role: "ai", type: "company_card", data: company },
      ])
    } else if (content.toLowerCase().includes("tesla") || content.toLowerCase().includes("ford")) {
      const cmp: CompanyComparison = {
        ticker: "TSLA vs F",
        name: "Tesla vs Ford",
        strengths: ["EV leadership", "Software margins"],
        risks: ["Valuation", "Competition"],
        investorFit: "Growth vs value profiles",
        revenueData: [
          { name: "Tesla", value: 100 },
          { name: "Ford", value: 65 },
        ],
      }
      setMessages((prev) => [
        ...prev,
        { id: Math.random().toString(), role: "ai", type: "comparison_card", data: { companyA: cmp, companyB: { ...cmp, name: "Ford vs Tesla" }, valuationData: [{ metric: "PE", Tesla: 70, Ford: 9 }], verdict: "Depends on risk tolerance" } },
      ])
    } else if (content.toLowerCase().includes("risk")) {
      setMessages((prev) => [
        ...prev,
        { id: Math.random().toString(), role: "ai", content: "Your sample portfolio skews 80% equities. Estimated risk level: Aggressive. Consider modest bond allocation (10-20%) for drawdown control." },
      ])
    } else {
      setMessages((prev) => [
        ...prev,
        { id: Math.random().toString(), role: "ai", content: "Growth themes worth exploring: AI infrastructure, cybersecurity, and developer tooling. Let me tailor picks once you connect your real portfolio." },
      ])
    }

    setIsLoading(false)
    setExchanges((e) => e + 1)
  }, [])

  const onSend = useCallback(async (text: string) => {
    if (limitReached) return
    const userMsg: Message = { id: Math.random().toString(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    await handleDemoResponse(text)
  }, [handleDemoResponse, limitReached])

  useEffect(() => {
    if (limitReached) onLimitReached?.()
  }, [limitReached, onLimitReached])

  return (
    <Card className="border rounded-xl shadow-sm bg-white">
      <CardContent className="p-0">
        <div className="p-3 lg:p-6 space-y-3">
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role} content={m.type ? undefined : m.content}>
              {m.type === "company_card" && m.data && (
                <CompanyCard {...(m.data as Company)} />
              )}
              {m.type === "comparison_card" && m.data && (
                <ComparisonCard {...(m.data as any)} />
              )}
            </ChatBubble>
          ))}
          {isLoading && (
            <ChatBubble role="ai">
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span>Thinking…</span>
              </div>
            </ChatBubble>
          )}
        </div>
        <div className="border-t bg-white">
          <div className="px-3 pt-3 pb-2">
            <div className="text-xs text-gray-500 mb-2">Try a suggestion:</div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => onSend(s)} disabled={limitReached || isLoading} className="px-3 py-1.5 text-xs rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <ChatInput onSend={onSend} disabled={isLoading || limitReached} />
        </div>
        {limitReached && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-2">Want deeper analysis?</div>
              <div className="text-sm text-gray-600 mb-4">Sign up to connect your portfolio and unlock full insights.</div>
              <a href="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2 rounded-lg font-medium">Get full access</a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


