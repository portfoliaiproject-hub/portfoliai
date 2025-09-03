"use client"

import { useState, useCallback } from "react"
import { DEMO_STOCK_PRICES } from "@/constants"

interface ThreadSuggestionState {
  showSuggestion: boolean
  suggestedAsset: string | null
  suggestedContext: string | null
}

interface UseThreadSuggestionReturn {
  suggestionState: ThreadSuggestionState
  detectAnalysisIntent: (message: string) => boolean
  dismissSuggestion: () => void
  createIdeaThread: () => {
    type: 'idea'
    title: string
    initialMessage: string
    asset: string
  }
}

export function useThreadSuggestion(): UseThreadSuggestionReturn {
  const [suggestionState, setSuggestionState] = useState<ThreadSuggestionState>({
    showSuggestion: false,
    suggestedAsset: null,
    suggestedContext: null
  })

  const detectAnalysisIntent = useCallback((message: string): boolean => {
    const lowerMessage = message.toLowerCase()
    
    // Analysis keywords that suggest deep research
    const analysisKeywords = [
      'analyze', 'analysis', 'thesis', 'fundamentals',
      'valuation', 'deep dive', 'research', 'break down',
      'competitive position', 'moat', 'financials', 'dive into',
      'comprehensive', 'detailed', 'thorough', 'in-depth'
    ]
    
    // Check for specific asset mentions
    const assetTickers = Object.keys(DEMO_STOCK_PRICES)
    const mentionedAsset = assetTickers.find(ticker => 
      lowerMessage.includes(ticker.toLowerCase())
    )
    
    // Check if message contains analysis keywords
    const hasAnalysisKeywords = analysisKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    // Additional patterns that suggest analysis
    const analysisPatterns = [
      /what.*think.*about/i,
      /your.*opinion.*on/i,
      /should.*invest.*in/i,
      /worth.*buying/i,
      /investment.*potential/i,
      /growth.*prospects/i,
      /risk.*assessment/i
    ]
    
    const hasAnalysisPatterns = analysisPatterns.some(pattern => 
      pattern.test(lowerMessage)
    )
    
    // Trigger suggestion if we have asset + analysis intent
    if (mentionedAsset && (hasAnalysisKeywords || hasAnalysisPatterns)) {
      setSuggestionState({
        showSuggestion: true,
        suggestedAsset: mentionedAsset,
        suggestedContext: message
      })
      return true
    }
    
    return false
  }, [])

  const dismissSuggestion = useCallback(() => {
    setSuggestionState({
      showSuggestion: false,
      suggestedAsset: null,
      suggestedContext: null
    })
  }, [])

  const createIdeaThread = useCallback(() => {
    const { suggestedAsset, suggestedContext } = suggestionState
    
    if (!suggestedAsset) {
      throw new Error('No suggested asset found')
    }

    // Generate smart thread title based on context
    const generateTitle = (asset: string, context: string) => {
      const lowerContext = context.toLowerCase()
      
      if (lowerContext.includes('valuation')) return `${asset} Valuation Analysis`
      if (lowerContext.includes('competitive') || lowerContext.includes('moat')) return `${asset} Competitive Analysis`
      if (lowerContext.includes('thesis')) return `${asset} Investment Thesis`
      if (lowerContext.includes('fundamentals')) return `${asset} Fundamentals Analysis`
      if (lowerContext.includes('growth')) return `${asset} Growth Prospects`
      if (lowerContext.includes('risk')) return `${asset} Risk Assessment`
      
      return `${asset} Investment Analysis`
    }

    const title = generateTitle(suggestedAsset, suggestedContext || '')
    
    const initialMessage = `💡 **${title}**\n\nBased on our discussion: "${suggestedContext}"\n\nLet's dive deep into this analysis...`

    // Clear suggestion state
    dismissSuggestion()

    return {
      type: 'idea' as const,
      title,
      initialMessage,
      asset: suggestedAsset
    }
  }, [suggestionState, dismissSuggestion])

  return {
    suggestionState,
    detectAnalysisIntent,
    dismissSuggestion,
    createIdeaThread
  }
}
