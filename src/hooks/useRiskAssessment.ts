"use client"

import { useCallback, useMemo, useState } from "react"
import type { AssessmentState, RiskProfile, RiskQuestion, RiskResponse } from "@/types/risk-assessment"

/**
 * Risk categories based on assessment scores
 * Determines investment strategy recommendations
 */
type RiskCategory = RiskProfile["category"]

/**
 * Categorizes a risk score into investment profile categories
 * 
 * @param score - Risk assessment score (0-100)
 * @returns Risk category for investment strategy
 */
function categorizeRiskScore(score: number): RiskCategory {
  if (score < 25) return "conservative"
  if (score < 50) return "moderate"
  if (score < 75) return "aggressive"
  return "very_aggressive"
}

/**
 * Generates investment recommendations based on risk category
 * 
 * @param category - Risk category from assessment
 * @returns Array of investment recommendations
 */
function generateRecommendations(category: RiskCategory): string[] {
  const recommendations = {
    conservative: [
      "Prefer bonds and blue-chip equities",
      "Maintain high cash buffer (20-30%)",
      "Focus on dividend-paying stocks",
      "Consider government bonds and CDs",
      "Avoid high-volatility investments"
    ],
    moderate: [
      "Balance equities and fixed income",
      "Dollar-cost average into positions",
      "Consider index funds and ETFs",
      "Maintain 10-20% cash buffer",
      "Diversify across sectors"
    ],
    aggressive: [
      "Higher equity exposure (70-80%)",
      "Long-term growth sectors",
      "Consider international markets",
      "Include some alternative investments",
      "Accept higher volatility for growth"
    ],
    very_aggressive: [
      "Very high equity/alt exposure (80-90%)",
      "Expect high volatility",
      "Consider emerging markets",
      "Include crypto and commodities",
      "Focus on growth over stability"
    ]
  }

  return recommendations[category] || recommendations.moderate
}

/**
 * Calculates weighted score for different question types
 * 
 * @param question - Risk assessment question
 * @param answerValue - User's answer to the question
 * @returns Calculated weighted score
 */
function calculateQuestionScore(question: RiskQuestion, answerValue: RiskResponse["answer"]): number {
  let baseScore = 0

  switch (question.type) {
    case "multiple_choice":
      const option = question.options?.find((o) => String(o.value) === String(answerValue))
      baseScore = option?.score ?? 0
      break
    case "boolean":
      baseScore = answerValue ? 50 : 0
      break
    case "scale":
      const min = question.min ?? 0
      const max = question.max ?? 10
      const value = Number(answerValue)
      baseScore = ((value - min) / (max - min)) * 100
      break
    default:
      baseScore = 0
  }

  return Math.round((baseScore * question.weight))
}

/**
 * Custom hook for managing risk assessment state and logic
 * Provides comprehensive risk assessment functionality with state management
 * 
 * @param initialQuestions - Array of risk assessment questions
 * @returns Object containing assessment state, navigation methods, and results
 */
export function useRiskAssessment(initialQuestions: RiskQuestion[]) {
  const [state, setState] = useState<AssessmentState>({ 
    currentIndex: 0, 
    responses: {}, 
    completed: false 
  })

  // Get current question being displayed
  const current = initialQuestions[state.currentIndex]

  /**
   * Records user's answer to a specific question
   * Calculates weighted score and updates assessment state
   * 
   * @param questionId - Unique identifier for the question
   * @param answerValue - User's answer (string, number, or boolean)
   */
  const answer = useCallback((questionId: string, answerValue: RiskResponse["answer"]) => {
    const question = initialQuestions.find((q) => q.id === questionId)
    if (!question) {
      console.warn(`Question with ID ${questionId} not found`)
      return
    }

    const weightedScore = calculateQuestionScore(question, answerValue)

    setState((prev) => ({
      ...prev,
      responses: { 
        ...prev.responses, 
        [questionId]: { 
          questionId, 
          answer: answerValue, 
          score: weightedScore 
        } 
      },
    }))
  }, [initialQuestions])

  /**
   * Advances to the next question or completes the assessment
   * Validates that current question has been answered before proceeding
   */
  const next = useCallback(() => {
    setState((prev) => {
      const isLastQuestion = prev.currentIndex >= initialQuestions.length - 1
      const hasAnsweredCurrent = current && prev.responses[current.id]
      
      if (!hasAnsweredCurrent) {
        console.warn("Current question must be answered before proceeding")
        return prev
      }

      return { 
        ...prev, 
        currentIndex: isLastQuestion ? prev.currentIndex : prev.currentIndex + 1, 
        completed: isLastQuestion ? true : prev.completed 
      }
    })
  }, [current, initialQuestions.length])

  /**
   * Returns to the previous question
   * Allows users to review and modify previous answers
   */
  const back = useCallback(() => {
    setState((prev) => ({ 
      ...prev, 
      currentIndex: Math.max(0, prev.currentIndex - 1) 
    }))
  }, [])

  /**
   * Resets the assessment to start over
   * Clears all responses and returns to first question
   */
  const reset = useCallback(() => {
    setState({ 
      currentIndex: 0, 
      responses: {}, 
      completed: false 
    })
  }, [])

  /**
   * Calculated risk profile result based on completed assessment
   * Returns null if assessment is not yet complete
   */
  const result: RiskProfile | null = useMemo(() => {
    if (!state.completed) return null

    const totalScore = Object.values(state.responses).reduce((acc, r) => acc + r.score, 0)
    const normalizedScore = Math.min(100, Math.round(totalScore / initialQuestions.length))
    const category = categorizeRiskScore(normalizedScore)
    const recommendations = generateRecommendations(category)

    return { 
      score: normalizedScore, 
      category, 
      recommendations,
      responses: Object.values(state.responses),
      completed_at: new Date()
    }
  }, [state.completed, state.responses, initialQuestions.length])

  /**
   * Progress percentage for the assessment
   */
  const progress = useMemo(() => {
    return Math.round((state.currentIndex / initialQuestions.length) * 100)
  }, [state.currentIndex, initialQuestions.length])

  /**
   * Whether the current question has been answered
   */
  const isCurrentAnswered = useMemo(() => {
    return current ? !!state.responses[current.id] : false
  }, [current, state.responses])

  return { 
    state, 
    current, 
    answer, 
    next, 
    back, 
    reset,
    result, 
    questions: initialQuestions,
    progress,
    isCurrentAnswered
  }
}

export default useRiskAssessment



