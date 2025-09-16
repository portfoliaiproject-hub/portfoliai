"use client"

import type { RiskQuestion } from "@/types/risk-assessment"
import { Card, CardContent } from "@/components/ui/card"

export interface QuestionCardProps {
  question: RiskQuestion
  value?: string | number | boolean
  onChange: (value: string | number | boolean) => void
}

export default function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  return (
    <Card className="border rounded-xl shadow-sm bg-white p-0 mb-4">
      <CardContent className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{question.question}</h3>
      {question.type === "multiple_choice" && (
        <div className="space-y-2">
          {question.options?.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name={question.id}
                value={String(opt.value)}
                checked={String(value) === String(opt.value)}
                onChange={(e) => onChange(e.target.value)}
                className="accent-indigo-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
      {question.type === "boolean" && (
        <div className="flex gap-4">
          <button className={`rounded-md px-3 py-1 text-sm font-medium ${value === true ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`} onClick={() => onChange(true)}>Yes</button>
          <button className={`rounded-md px-3 py-1 text-sm font-medium ${value === false ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`} onClick={() => onChange(false)}>No</button>
        </div>
      )}
      {question.type === "scale" && (
        <div>
          <input
            type="range"
            min={question.min ?? 0}
            max={question.max ?? 10}
            step={question.step ?? 1}
            value={Number(value ?? question.min ?? 0)}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label="Scale answer"
            className="accent-indigo-600"
          />
          <div className="mt-1 text-xs text-gray-500">{String(value ?? question.min ?? 0)}</div>
        </div>
      )}
      </CardContent>
    </Card>
  )
}


