"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"]

interface PortfolioData {
  name: string
  value: number
}

interface PortfolioSummaryProps {
  portfolioData?: PortfolioData[]
  totalValue?: number
  gain?: number
  topHoldings?: string[]
}

export function PortfolioSummary({ 
  portfolioData = [
    { name: "Stocks", value: 20000 },
    { name: "Real Estate", value: 15000 },
    { name: "Land", value: 10000 }
  ],
  totalValue,
  gain = 2300,
  topHoldings = [
    "AAPL Stock – $20,000",
    "MSFT Stock – $15,000", 
    "Isinya Land (10 acres) – $10,000"
  ]
}: PortfolioSummaryProps) {
  const calculatedTotalValue = totalValue || portfolioData.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <Card className="w-80 border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <h2 className="text-lg font-semibold">Portfolio Summary</h2>
        <p className="text-sm text-gray-500">Overview of holdings</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Value</p>
            <p className="text-xl font-bold text-gray-800">${calculatedTotalValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gain</p>
            <p className={`font-semibold ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {gain >= 0 ? '+' : ''}${gain.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="h-40">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-medium text-gray-800">📊 Top Holdings</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm">
            {topHoldings.map((holding, idx) => (
              <li key={idx}>{holding}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
} 