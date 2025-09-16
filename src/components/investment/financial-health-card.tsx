"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react"

interface FinancialMetric {
  name: string
  value: number
  unit: string
  benchmark: number
  isHigherBetter: boolean
  description: string
}

interface FinancialHealthCardProps {
  ticker: string
  name: string
  metrics: FinancialMetric[]
  overallScore: number // 0-100
  lastUpdated: string
}

function getHealthStatus(value: number, benchmark: number, isHigherBetter: boolean): {
  status: 'strong' | 'weak' | 'neutral'
  color: string
  icon: React.ReactNode
} {
  const ratio = value / benchmark
  
  if (isHigherBetter) {
    if (ratio >= 1.2) return { status: 'strong', color: 'text-green-600', icon: <TrendingUp className="w-3 h-3" /> }
    if (ratio <= 0.8) return { status: 'weak', color: 'text-red-600', icon: <TrendingDown className="w-3 h-3" /> }
    return { status: 'neutral', color: 'text-yellow-600', icon: <Minus className="w-3 h-3" /> }
  } else {
    if (ratio <= 0.8) return { status: 'strong', color: 'text-green-600', icon: <TrendingUp className="w-3 h-3" /> }
    if (ratio >= 1.2) return { status: 'weak', color: 'text-red-600', icon: <TrendingDown className="w-3 h-3" /> }
    return { status: 'neutral', color: 'text-yellow-600', icon: <Minus className="w-3 h-3" /> }
  }
}

function getOverallHealthScore(score: number): {
  label: string
  color: string
  bgColor: string
} {
  if (score >= 80) return { label: 'Excellent', color: 'text-green-700', bgColor: 'bg-green-100' }
  if (score >= 60) return { label: 'Good', color: 'text-blue-700', bgColor: 'bg-blue-100' }
  if (score >= 40) return { label: 'Fair', color: 'text-yellow-700', bgColor: 'bg-yellow-100' }
  return { label: 'Poor', color: 'text-red-700', bgColor: 'bg-red-100' }
}

export function FinancialHealthCard({ 
  ticker, 
  name, 
  metrics, 
  overallScore, 
  lastUpdated 
}: FinancialHealthCardProps) {
  const overallHealth = getOverallHealthScore(overallScore)

  return (
    <Card className="w-full max-w-md sm:max-w-lg border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs font-medium">
                {ticker}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Financial Health
              </Badge>
            </div>
          </div>
          
          {/* Overall Health Score */}
          <div className={`text-center p-3 rounded-lg ${overallHealth.bgColor}`}>
            <div className={`text-lg font-bold ${overallHealth.color}`}>
              {overallScore}
            </div>
            <div className={`text-xs font-medium ${overallHealth.color}`}>
              {overallHealth.label}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">Financial stability assessment</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="space-y-3">
          {metrics.map((metric, index) => {
            const health = getHealthStatus(metric.value, metric.benchmark, metric.isHigherBetter)
            
            return (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800 text-sm">{metric.name}</h3>
                  <div className="flex items-center gap-1">
                    {health.icon}
                    <Badge 
                      variant={health.status === 'strong' ? 'default' : health.status === 'weak' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {health.status === 'strong' ? 'Strong' : health.status === 'weak' ? 'Weak' : 'Neutral'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-900">
                    {metric.value.toFixed(2)}{metric.unit}
                  </div>
                  <div className="text-xs text-gray-500">
                    Benchmark: {metric.benchmark.toFixed(2)}{metric.unit}
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
              </div>
            )
          })}
        </div>

        {/* Health Summary */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Health Summary
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Strong Metrics:</span>
              <span className="font-medium text-green-600">
                {metrics.filter(m => getHealthStatus(m.value, m.benchmark, m.isHigherBetter).status === 'strong').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Neutral Metrics:</span>
              <span className="font-medium text-yellow-600">
                {metrics.filter(m => getHealthStatus(m.value, m.benchmark, m.isHigherBetter).status === 'neutral').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weak Metrics:</span>
              <span className="font-medium text-red-600">
                {metrics.filter(m => getHealthStatus(m.value, m.benchmark, m.isHigherBetter).status === 'weak').length}
              </span>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
          Last updated: {lastUpdated}
        </div>
      </CardContent>
    </Card>
  )
}
