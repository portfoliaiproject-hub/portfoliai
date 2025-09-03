"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface ActivityItem {
  id: string
  type: "buy" | "sell" | "deposit" | "withdrawal" | "dividend" | "rebalance"
  text: string
  date: string
  amount?: string
}

interface RecentActivityProps {
  activities?: ActivityItem[]
  onViewAll?: () => void
}

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "buy":
      return "📈"
    case "sell":
      return "📉"
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

const getActivityColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "buy":
    case "deposit":
    case "dividend":
      return "text-green-600"
    case "sell":
    case "withdrawal":
      return "text-red-600"
    case "rebalance":
      return "text-blue-600"
    default:
      return "text-gray-600"
  }
}

export function RecentActivity({ 
  activities = [
    { id: "1", type: "buy", text: "Bought 5 AAPL shares", date: "Aug 25", amount: "+$875" },
    { id: "2", type: "deposit", text: "Added cash to portfolio", date: "Aug 20", amount: "+$2,000" },
    { id: "3", type: "sell", text: "Sold 2 TSLA shares", date: "Aug 18", amount: "+$560" },
    { id: "4", type: "dividend", text: "MSFT dividend received", date: "Aug 15", amount: "+$24" }
  ],
  onViewAll
}: RecentActivityProps) {
  return (
    <Card className="w-80 border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <span className="text-gray-400">📊</span>
        </div>
        <p className="text-sm text-gray-500">Latest portfolio changes</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <span className="text-lg flex-shrink-0">
                {getActivityIcon(item.type)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{item.text}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
            {item.amount && (
              <span className={`text-sm font-medium flex-shrink-0 ml-2 ${getActivityColor(item.type)}`}>
                {item.amount}
              </span>
            )}
          </div>
        ))}
        
        <div className="pt-3 border-t border-gray-100">
          <button
            onClick={onViewAll}
            className="w-full text-sm text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer text-center"
          >
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  )
} 