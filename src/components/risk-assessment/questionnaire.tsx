"use client"

import QuestionCard from "./question-card"
import ProgressIndicator from "./progress-indicator"
import ResultsSummary from "./results-summary"
import useRiskAssessment from "@/hooks/useRiskAssessment"
import type { RiskQuestion } from "@/types/risk-assessment"

export interface QuestionnaireProps {
  questions: RiskQuestion[]
}

export default function Questionnaire({ questions }: QuestionnaireProps) {
  const { state, current, answer, next, back, result } = useRiskAssessment(questions)

  if (result) {
    return (
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Assessment results</h2>
        <ResultsSummary result={result} />
      </div>
    )
  }

  if (!current) return null

  const currentValue = state.responses[current.id]?.answer

  return (
    <div>
      <ProgressIndicator current={state.currentIndex} total={questions.length} />
      <QuestionCard question={current} value={currentValue} onChange={(v) => answer(current.id, v)} />
      <div className="mt-4 flex items-center justify-between">
        <button className="rounded bg-white/10 px-4 py-2 text-sm" onClick={back} disabled={state.currentIndex === 0}>
          Back
        </button>
        <button className="rounded bg-blue-600 px-4 py-2 text-sm" onClick={next}>
          {state.currentIndex >= questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  )
}






