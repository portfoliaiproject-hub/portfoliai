"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

interface CompanyComparison {
  ticker: string
  name: string
  strengths: string[]
  risks: string[]
  investorFit: string
  revenueData: Array<{ name: string; value: number }>
}

interface ComparisonCardProps {
  companyA: CompanyComparison
  companyB: CompanyComparison
  valuationData: Array<{ metric: string; [key: string]: string | number }>
  verdict?: string
}

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

export function ComparisonCard({ companyA, companyB, valuationData, verdict }: ComparisonCardProps) {
  const [isDetailed, setIsDetailed] = useState(false)

  return (
    <Card className="w-full max-w-2xl border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {companyA.name} ({companyA.ticker}) vs {companyB.name} ({companyB.ticker})
          </h2>
          <span className="text-gray-400">⚖️</span>
        </div>
        <p className="text-sm text-gray-500">Side-by-side investment analysis</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isDetailed ? (
          <>
            {/* Valuation Metrics Comparison */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">💵 Valuation Metrics</h3>
              <div className="h-40">
                <ResponsiveContainer>
                  <BarChart data={valuationData} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                    <XAxis 
                      dataKey="metric" 
                      fontSize={12}
                      tick={{ fill: '#6B7280' }}
                    />
                    <YAxis 
                      fontSize={11}
                      tick={{ fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#F9FAFB', 
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar 
                      dataKey={companyA.ticker} 
                      fill="#4F46E5" 
                      name={companyA.name}
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar 
                      dataKey={companyB.ticker} 
                      fill="#10B981" 
                      name={companyB.name}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Mix Comparison */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">📊 Revenue Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-48">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie 
                          data={companyA.revenueData} 
                          dataKey="value" 
                          nameKey="name" 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={65}
                          innerRadius={25}
                        >
                          {companyA.revenueData.map((entry, index) => (
                            <Cell key={`cell-a-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Revenue']}
                          contentStyle={{ 
                            fontSize: '11px',
                            backgroundColor: '#F9FAFB',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{ fontSize: "10px" }}
                          iconSize={8}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700">{companyA.name}</p>
                </div>

                <div className="space-y-2">
                  <div className="h-48">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie 
                          data={companyB.revenueData} 
                          dataKey="value" 
                          nameKey="name" 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={65}
                          innerRadius={25}
                        >
                          {companyB.revenueData.map((entry, index) => (
                            <Cell key={`cell-b-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Revenue']}
                          contentStyle={{ 
                            fontSize: '11px',
                            backgroundColor: '#F9FAFB',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{ fontSize: "10px" }}
                          iconSize={8}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700">{companyB.name}</p>
                </div>
              </div>
            </div>

            {/* Quick Summary & Action */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-700 text-sm mb-3">
                {verdict || `Both ${companyA.name} and ${companyB.name} offer unique investment opportunities with different risk profiles and growth strategies.`}
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsDetailed(true)}
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              >
                View Detailed Analysis →
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Detailed Strengths & Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    🛡️ {companyA.name} Strengths
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {companyA.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    ⚠️ Key Risks
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {companyA.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    🎯 Investor Fit
                  </h3>
                  <p className="text-sm text-gray-600">{companyA.investorFit}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    🛡️ {companyB.name} Strengths
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {companyB.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    ⚠️ Key Risks
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {companyB.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    🎯 Investor Fit
                  </h3>
                  <p className="text-sm text-gray-600">{companyB.investorFit}</p>
                </div>
              </div>
            </div>

            {/* Final Verdict */}
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 mb-2">💡 Investment Verdict</h3>
                <p className="text-sm text-gray-700">
                  {verdict || `${companyA.name} offers consumer-focused growth potential, while ${companyB.name} provides enterprise stability. Consider your risk tolerance and investment timeline when choosing.`}
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsDetailed(false)}
                className="ml-4 text-gray-600 border-gray-200 hover:bg-gray-50"
              >
                ← Back to Summary
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
} 