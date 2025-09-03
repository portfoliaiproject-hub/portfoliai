"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface OnTrackProps {
  target: number
  actual: number
  label: string
}

const TrackRow = ({ target, actual, label }: OnTrackProps) => {
  const diff = actual - target
  const diffAbs = Math.abs(diff)
  
  // Determine status and styling
  let status: string
  let statusColor: string
  let progressColor: string
  
  if (diff === 0) {
    status = "✅ On Track"
    statusColor = "text-green-600"
    progressColor = "bg-green-500"
  } else if (diff > 0) {
    status = "⬆️ Overweight"
    statusColor = "text-orange-600"
    progressColor = "bg-orange-500"
  } else {
    status = "⬇️ Underweight"
    statusColor = "text-blue-600"
    progressColor = "bg-blue-500"
  }

  // Calculate progress percentage (actual vs target)
  const progressPercentage = Math.min((actual / target) * 100, 100)

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <div className="text-right">
          <div className="text-gray-600">
            {actual}% / {target}%
          </div>
          <div className={`text-xs ${statusColor}`}>
            {status}
          </div>
        </div>
      </div>
      
      {/* Progress bar showing actual vs target */}
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-gray-200"
        />
        {/* Target line indicator */}
        <div 
          className="absolute top-0 h-2 w-0.5 bg-gray-400"
          style={{ left: `${Math.min((target / target) * 100, 100)}%` }}
        />
      </div>
      
      {/* Difference indicator */}
      {diffAbs > 0 && (
        <div className={`text-xs mt-1 ${statusColor}`}>
          {diff > 0 ? `+${diffAbs.toFixed(1)}%` : `${diffAbs.toFixed(1)}%`} from target
        </div>
      )}
    </div>
  )
}

interface OnTrackCardProps {
  className?: string
  variant?: 'compact' | 'detailed'
}

export default function OnTrackCard({ className, variant = 'compact' }: OnTrackCardProps) {
  // For now, use placeholder values - these would come from user's risk profile and actual portfolio
  const buckets = [
    { label: "Foundation", target: 40, actual: 38 },
    { label: "Growth", target: 40, actual: 42 },
    { label: "Adventurous", target: 20, actual: 20 },
  ]

  // Calculate overall status
  const totalDeviation = buckets.reduce((sum, bucket) => {
    return sum + Math.abs(bucket.actual - bucket.target)
  }, 0)

  const overallStatus = totalDeviation < 5 ? "✅ On Track" : 
                       totalDeviation < 10 ? "⚠️ Slightly Off" : 
                       "🔄 Needs Rebalancing"

  // Calculate additional metrics for detailed view
  const totalValue = 45000 // This would come from actual portfolio data
  const rebalanceAmount = buckets.reduce((sum, bucket) => {
    const diff = bucket.actual - bucket.target
    return sum + Math.abs(diff * totalValue / 100)
  }, 0)

  if (variant === 'detailed') {
    return (
      <Card className={`p-6 rounded-lg shadow-sm border ${className}`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            📊 Portfolio Allocation Status
          </CardTitle>
          <p className="text-sm text-gray-600">
            Track how your current allocation compares to your target strategy
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{overallStatus}</div>
              <div className="text-sm text-gray-600">Overall Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalDeviation.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Total Deviation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">${rebalanceAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Rebalance Amount</div>
            </div>
          </div>

          {/* Allocation Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Allocation Breakdown</h3>
            {buckets.map((bucket, index) => (
              <TrackRow 
                key={index} 
                target={bucket.target}
                actual={bucket.actual}
                label={bucket.label}
              />
            ))}
          </div>

          {/* Recommendations */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h3>
            <div className="space-y-2">
              {totalDeviation < 5 ? (
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">✅</span>
                  <div>
                    <div className="text-sm font-medium text-green-800">Portfolio is well-balanced</div>
                    <div className="text-xs text-green-600">Your allocation closely matches your target strategy. No immediate action needed.</div>
                  </div>
                </div>
              ) : totalDeviation < 10 ? (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-600">⚠️</span>
                  <div>
                    <div className="text-sm font-medium text-yellow-800">Minor adjustments recommended</div>
                    <div className="text-xs text-yellow-600">Consider small rebalancing to align with your target allocation.</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                  <span className="text-orange-600">🔄</span>
                  <div>
                    <div className="text-sm font-medium text-orange-800">Rebalancing recommended</div>
                    <div className="text-xs text-orange-600">Your portfolio has drifted significantly from target. Consider rebalancing soon.</div>
                  </div>
                </div>
              )}
              
              {/* Specific recommendations */}
              {buckets.map((bucket, index) => {
                const diff = bucket.actual - bucket.target
                if (Math.abs(diff) > 2) {
                  return (
                    <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                      <span className="text-blue-600">💡</span>
                      <div className="text-xs text-blue-700">
                        <strong>{bucket.label}:</strong> {diff > 0 ? 'Reduce' : 'Increase'} allocation by {Math.abs(diff).toFixed(1)}% 
                        (${Math.abs(diff * totalValue / 100).toLocaleString()})
                      </div>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Compact version (for dashboard sidebar)
  return (
    <Card className={`p-4 rounded-2xl shadow-sm border ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          📊 On Track?
        </CardTitle>
        <p className="text-sm text-gray-600">
          How your portfolio compares to your target allocation
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {buckets.map((bucket, index) => (
          <TrackRow 
            key={index} 
            target={bucket.target}
            actual={bucket.actual}
            label={bucket.label}
          />
        ))}
        
        {/* Overall summary */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Overall Status</span>
            <span className="text-sm font-medium">
              {overallStatus}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {totalDeviation < 5 
              ? "Your portfolio is well-balanced!" 
              : totalDeviation < 10 
                ? "Consider minor adjustments"
                : "Consider rebalancing your portfolio"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
