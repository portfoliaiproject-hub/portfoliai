import type { RiskProfile } from "@/types/risk-assessment"
import { Card, CardContent } from "@/components/ui/card"

export default function ResultsSummary({ result }: { result: RiskProfile }) {
  return (
    <div className="space-y-4">
      <Card className="border rounded-xl shadow-sm bg-white p-0">
        <CardContent className="p-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Your risk profile</h3>
          <p className="text-sm text-gray-700">Category: <span className="font-medium text-gray-900">{result.category}</span></p>
          <p className="text-sm text-gray-700">Score: <span className="font-medium text-gray-900">{result.score}</span></p>
        </CardContent>
      </Card>
      <Card className="border rounded-xl shadow-sm bg-white p-0">
        <CardContent className="p-6">
          <h4 className="mb-2 font-semibold text-gray-900">Recommendations</h4>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            {result.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}


