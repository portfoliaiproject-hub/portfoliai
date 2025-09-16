"use client"

import Questionnaire from "@/components/risk-assessment/questionnaire"
import type { RiskQuestion } from "@/types/risk-assessment"

const QUESTIONS: RiskQuestion[] = [
  {
    id: "horizon",
    question: "What is your investment time horizon?",
    type: "multiple_choice",
    options: [
      { id: "h1", label: "< 1 year", value: "short", score: 10 },
      { id: "h2", label: "1-3 years", value: "mid", score: 30 },
      { id: "h3", label: "3-7 years", value: "long", score: 60 },
      { id: "h4", label: "> 7 years", value: "very_long", score: 90 },
    ],
    weight: 1,
  },
  {
    id: "drawdown",
    question: "How would you react to a 20% portfolio drawdown?",
    type: "multiple_choice",
    options: [
      { id: "d1", label: "Sell to prevent further losses", value: "sell", score: 10 },
      { id: "d2", label: "Hold and wait", value: "hold", score: 50 },
      { id: "d3", label: "Buy more at lower prices", value: "buy", score: 90 },
    ],
    weight: 1,
  },
  {
    id: "volatility",
    question: "How comfortable are you with volatility?",
    type: "scale",
    min: 0,
    max: 10,
    step: 1,
    weight: 1,
  },
  {
    id: "alts",
    question: "Are you open to alternative assets?",
    type: "boolean",
    weight: 1,
  },
]

export default function RiskAssessment() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Risk Assessment</h1>
      <Questionnaire questions={QUESTIONS} />
    </div>
  )
}
