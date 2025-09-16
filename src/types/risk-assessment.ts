export type RiskQuestionType = "multiple_choice" | "scale" | "boolean"

export interface RiskQuestionOption {
  id: string
  label: string
  value: string | number
  score?: number
}

export interface RiskQuestion {
  id: string
  question: string
  type: RiskQuestionType
  options?: RiskQuestionOption[]
  min?: number
  max?: number
  step?: number
  weight: number
}

export interface RiskResponse {
  questionId: string
  answer: string | number | boolean
  score: number
}

export type RiskProfileCategory = "conservative" | "moderate" | "aggressive" | "very_aggressive"

export interface RiskProfile {
  score: number
  category: RiskProfileCategory
  recommendations: string[]
}

export interface AssessmentState {
  currentIndex: number
  responses: Record<string, RiskResponse>
  completed: boolean
}






