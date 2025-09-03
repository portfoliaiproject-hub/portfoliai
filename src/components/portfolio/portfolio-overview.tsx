"use client"

import { useMemo } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface PortfolioOverviewProps {
  totalValue: number
  totalGain: number
  totalDeposits?: number
  totalWithdrawals?: number
  performanceData?: Array<{
    date: string
    portfolio: number
    sp500: number
  }>
}

const defaultPerformanceData = [
  { date: "Jul 01", portfolio: 42000, sp500: 41500 },
  { date: "Jul 08", portfolio: 43250, sp500: 42300 },
  { date: "Jul 15", portfolio: 43800, sp500: 43050 },
  { date: "Jul 22", portfolio: 44600, sp500: 43950 },
  { date: "Jul 29", portfolio: 45150, sp500: 44400 },
  { date: "Aug 05", portfolio: 46200, sp500: 45250 },
  { date: "Aug 12", portfolio: 46650, sp500: 45850 },
  { date: "Aug 19", portfolio: 47200, sp500: 46220 },
  { date: "Aug 26", portfolio: 45900, sp500: 45520 },
]

function formatUSD(amount: number): string {
  return amount.toLocaleString(undefined, { 
    style: "currency", 
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export function PortfolioOverview({ 
  totalValue, 
  totalGain, 
  totalDeposits = 15000, 
  totalWithdrawals = 3500,
  performanceData = defaultPerformanceData
}: PortfolioOverviewProps) {
  const netContributions = useMemo(() => totalDeposits - totalWithdrawals, [totalDeposits, totalWithdrawals])

  return (
    <Card className="w-full border rounded-xl shadow-sm bg-white">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Portfolio Overview</h2>
          <p className="text-sm text-gray-500">Updated just now • Live data</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs defaultValue="1M" className="w-auto">
            <TabsList className="bg-gray-100">
              {(["1W", "1M", "3M", "YTD", "1Y", "All"] as const).map((range) => (
                <TabsTrigger 
                  key={range} 
                  value={range} 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-600"
                >
                  {range}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="grid gap-6 md:grid-cols-4">
        {/* Total Value */}
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Total Value</div>
          <div className="text-3xl font-semibold text-gray-800">{formatUSD(totalValue)}</div>
          <div className={`text-sm font-medium ${totalGain >= 0 ? "text-green-600" : "text-red-600"}`}>
            {totalGain >= 0 ? "+" : ""}{formatUSD(totalGain)} Performance
          </div>
        </div>
        
        {/* Total Deposits */}
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Total Deposits</div>
          <div className="text-lg font-medium text-gray-700">{formatUSD(totalDeposits)}</div>
        </div>
        
        {/* Total Withdrawals */}
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Total Withdrawals</div>
          <div className="text-lg font-medium text-gray-700">{formatUSD(totalWithdrawals)}</div>
        </div>
        
        {/* Net Contributions */}
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Net Contributions</div>
          <div className="text-lg font-medium text-gray-700">{formatUSD(netContributions)}</div>
        </div>
        
        {/* Performance Chart */}
        <div className="md:col-span-4 h-48">
          <ResponsiveContainer>
            <LineChart data={performanceData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                fontSize={12} 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                fontSize={12} 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                labelStyle={{ color: '#374151' }}
                formatter={(value: number, name: string) => [
                  formatUSD(value), 
                  name === 'portfolio' ? 'Your Portfolio' : 'S&P 500'
                ]}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="#4F46E5" 
                strokeWidth={3} 
                dot={false} 
                name="Your Portfolio"
                activeDot={{ r: 4, fill: '#4F46E5' }}
              />
              <Line 
                type="monotone" 
                dataKey="sp500" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={false} 
                name="S&P 500"
                activeDot={{ r: 4, fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 