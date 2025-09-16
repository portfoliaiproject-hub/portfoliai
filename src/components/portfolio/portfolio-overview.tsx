"use client"

import { useMemo } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

/**
 * Performance data point interface for chart visualization
 */
interface PerformanceDataPoint {
  date: string
  portfolio: number
  sp500: number
}

/**
 * Portfolio overview component props
 */
interface PortfolioOverviewProps {
  /** Total portfolio value in USD */
  totalValue: number
  /** Total portfolio gain/loss in USD */
  totalGain: number
  /** Total deposits made to portfolio */
  totalDeposits?: number
  /** Total withdrawals from portfolio */
  totalWithdrawals?: number
  /** Performance data for chart visualization */
  performanceData?: PerformanceDataPoint[]
}

/**
 * Default performance data for demonstration purposes
 * In production, this should come from real market data
 */
const DEFAULT_PERFORMANCE_DATA: PerformanceDataPoint[] = [
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

/**
 * Available time range options for performance charts
 */
const TIME_RANGES = ["1W", "1M", "3M", "YTD", "1Y", "All"] as const

/**
 * Formats a number as USD currency string
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
function formatUSD(amount: number): string {
  return amount.toLocaleString(undefined, { 
    style: "currency", 
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

/**
 * Portfolio metric card component
 * Displays a single portfolio metric with label and value
 */
function PortfolioMetric({ 
  label, 
  value, 
  subtitle, 
  isLarge = false 
}: { 
  label: string
  value: string
  subtitle?: string
  isLarge?: boolean 
}) {
  return (
    <div className="space-y-1">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`font-medium text-gray-700 ${isLarge ? 'text-3xl font-semibold text-gray-800' : 'text-lg'}`}>
        {value}
      </div>
      {subtitle && (
        <div className="text-sm font-medium">{subtitle}</div>
      )}
    </div>
  )
}

/**
 * Performance chart component
 * Renders a line chart comparing portfolio vs S&P 500 performance
 */
function PerformanceChart({ data }: { data: PerformanceDataPoint[] }) {
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
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
  )
}

/**
 * Time range selector component
 * Allows users to select different time periods for performance data
 */
function TimeRangeSelector() {
  return (
    <Tabs defaultValue="1M" className="w-auto">
      <TabsList className="bg-gray-100">
        {TIME_RANGES.map((range) => (
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
  )
}

/**
 * Main portfolio overview component
 * Displays comprehensive portfolio information including metrics and performance chart
 * 
 * @param totalValue - Total portfolio value in USD
 * @param totalGain - Total portfolio gain/loss in USD
 * @param totalDeposits - Total deposits made to portfolio (default: 15000)
 * @param totalWithdrawals - Total withdrawals from portfolio (default: 3500)
 * @param performanceData - Performance data for chart (default: demo data)
 * @returns Portfolio overview component with metrics and chart
 */
export function PortfolioOverview({ 
  totalValue, 
  totalGain, 
  totalDeposits = 15000, 
  totalWithdrawals = 3500,
  performanceData = DEFAULT_PERFORMANCE_DATA
}: PortfolioOverviewProps) {
  // Calculate net contributions
  const netContributions = useMemo(() => totalDeposits - totalWithdrawals, [totalDeposits, totalWithdrawals])

  // Determine performance subtitle color based on gain/loss
  const performanceColor = totalGain >= 0 ? "text-green-600" : "text-red-600"
  const performancePrefix = totalGain >= 0 ? "+" : ""

  return (
    <Card className="w-full border rounded-xl shadow-sm bg-white">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Portfolio Overview</h2>
          <p className="text-sm text-gray-500">Updated just now • Live data</p>
        </div>
        <TimeRangeSelector />
      </CardHeader>
      
      <CardContent className="grid gap-6 md:grid-cols-4">
        {/* Total Value */}
        <PortfolioMetric 
          label="Total Value"
          value={formatUSD(totalValue)}
          subtitle={`${performancePrefix}${formatUSD(totalGain)} Performance`}
          isLarge={true}
        />
        
        {/* Total Deposits */}
        <PortfolioMetric 
          label="Total Deposits"
          value={formatUSD(totalDeposits)}
        />
        
        {/* Total Withdrawals */}
        <PortfolioMetric 
          label="Total Withdrawals"
          value={formatUSD(totalWithdrawals)}
        />
        
        {/* Net Contributions */}
        <PortfolioMetric 
          label="Net Contributions"
          value={formatUSD(netContributions)}
        />
        
        {/* Performance Chart */}
        <div className="md:col-span-4">
          <PerformanceChart data={performanceData} />
        </div>
      </CardContent>
    </Card>
  )
} 