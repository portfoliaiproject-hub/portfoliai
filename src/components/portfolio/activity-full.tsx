"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import type { ActivityItem } from "@/types"

interface ActivityFullProps {
  activities?: ActivityItem[]
}

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "buy":
      return "🟢"
    case "sell":
      return "🔴"
    case "deposit":
      return "💵"
    case "withdrawal":
      return "💸"
    case "dividend":
      return "💰"
    case "rebalance":
      return "⚖️"
    default:
      return "📊"
  }
}

function formatUSD(amount: string): string {
  // Remove the + or - sign and parse
  const numericAmount = parseFloat(amount.replace(/[+\-$,]/g, ''))
  const isPositive = amount.startsWith('+')
  
  return `${isPositive ? '+' : '-'}$${numericAmount.toLocaleString(undefined, { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`
}

export function ActivityFull({ activities = [] }: ActivityFullProps) {
  return (
    <Card className="w-full border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <p className="text-sm text-gray-500">Complete transaction history</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <span className="text-lg">{getActivityIcon(activity.type)}</span>
              <div className="flex-1">
                <p className="text-gray-700 font-medium">{activity.text}</p>
                {activity.ticker && (
                  <p className="text-xs text-gray-500 font-mono bg-gray-100 rounded px-2 py-0.5 inline-block mt-1">
                    {activity.ticker}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              {activity.amount && (
                <span className={`font-medium ${
                  activity.amount.startsWith('+') ? "text-green-600" : "text-red-600"
                }`}>
                  {formatUSD(activity.amount)}
                </span>
              )}
              <span className="text-gray-500 text-xs min-w-[60px]">{activity.date}</span>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 