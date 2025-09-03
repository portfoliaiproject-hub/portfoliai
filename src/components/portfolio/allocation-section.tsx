"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#06B6D4", "#8B5CF6"]

interface AllocationData {
  name: string
  value: number
}

interface AllocationSectionProps {
  assetClassData?: AllocationData[]
  sectorData?: AllocationData[]
  strategyData?: AllocationData[]
}

const defaultAssetClassData = [
  { name: "Equities", value: 62 },
  { name: "Bonds", value: 18 },
  { name: "Cash", value: 8 },
  { name: "Alt/Real Estate", value: 12 },
]

const defaultSectorData = [
  { name: "Technology", value: 45 },
  { name: "Consumer", value: 15 },
  { name: "Healthcare", value: 10 },
  { name: "Financials", value: 12 },
  { name: "Energy", value: 8 },
  { name: "Other", value: 10 },
]

const defaultStrategyData = [
  { name: "Foundation", value: 38 },
  { name: "Growth", value: 42 },
  { name: "Adventurous", value: 20 },
]

export function AllocationSection({ 
  assetClassData = defaultAssetClassData, 
  sectorData = defaultSectorData,
  strategyData = defaultStrategyData
}: AllocationSectionProps) {
  const [mode, setMode] = useState<"class" | "sector" | "strategy">("class")
  const data = mode === "class" ? assetClassData : mode === "sector" ? sectorData : strategyData

  return (
    <Card className="w-full border rounded-xl shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Allocation Breakdown</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={mode === "class" ? "default" : "outline"} 
            onClick={() => setMode("class")}
            className={mode === "class" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            By Asset Class
          </Button>
          <Button 
            size="sm" 
            variant={mode === "sector" ? "default" : "outline"} 
            onClick={() => setMode("sector")}
            className={mode === "sector" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            By Sector
          </Button>
          <Button 
            size="sm" 
            variant={mode === "strategy" ? "default" : "outline"} 
            onClick={() => setMode("strategy")}
            className={mode === "strategy" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            By Strategy
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie 
                data={data} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80}
                innerRadius={30}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Allocation']}
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Bar Chart */}
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                fontSize={12} 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                fontSize={12} 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Allocation']}
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#4F46E5" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 