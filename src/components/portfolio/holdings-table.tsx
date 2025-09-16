"use client"

import { useMemo, useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Holding {
  asset: string
  ticker: string
  qty: number
  price: number
  costBasis: number
  value: number
  allocation: number
  sector?: string
  assetClass?: string
  strategy?: string
}

interface HoldingsTableProps {
  holdings?: Holding[]
  onAddHolding?: () => void
  onSelectHolding?: (holding: Holding) => void
  selectedHolding?: Holding | null
}

const defaultHoldings: Holding[] = [
  {
    asset: "Apple",
    ticker: "AAPL",
    qty: 120,
    price: 180,
    costBasis: 150,
    value: 21600,
    allocation: 0.28,
    sector: "Technology",
    assetClass: "Equities",
    strategy: "Growth",
  },
  {
    asset: "Microsoft",
    ticker: "MSFT",
    qty: 60,
    price: 320,
    costBasis: 280,
    value: 19200,
    allocation: 0.25,
    sector: "Technology",
    assetClass: "Equities",
    strategy: "Growth",
  },
  {
    asset: "Total Bond Market ETF",
    ticker: "BND",
    qty: 100,
    price: 80,
    costBasis: 77,
    value: 8000,
    allocation: 0.10,
    sector: "Financials",
    assetClass: "Bonds",
    strategy: "Foundation",
  },
  {
    asset: "Cash",
    ticker: "USD",
    qty: 1,
    price: 1,
    costBasis: 1,
    value: 3500,
    allocation: 0.05,
    sector: "Cash",
    assetClass: "Cash",
    strategy: "Foundation",
  },
  {
    asset: "Isinya Land (10 acres)",
    ticker: "ALT-ISY",
    qty: 1,
    price: 10000,
    costBasis: 9000,
    value: 10000,
    allocation: 0.13,
    sector: "Real Estate",
    assetClass: "Alt/Real Estate",
    strategy: "Adventurous",
  },
  {
    asset: "Tesla",
    ticker: "TSLA",
    qty: 20,
    price: 250,
    costBasis: 200,
    value: 5000,
    allocation: 0.06,
    sector: "Consumer",
    assetClass: "Equities",
    strategy: "Adventurous",
  },
  {
    asset: "Johnson & Johnson",
    ticker: "JNJ",
    qty: 30,
    price: 160,
    costBasis: 155,
    value: 4800,
    allocation: 0.06,
    sector: "Healthcare",
    assetClass: "Equities",
    strategy: "Foundation",
  },
  {
    asset: "Vanguard REIT ETF",
    ticker: "VNQ",
    qty: 50,
    price: 85,
    costBasis: 80,
    value: 4250,
    allocation: 0.05,
    sector: "Real Estate",
    assetClass: "Alt/Real Estate",
    strategy: "Growth",
  },
  {
    asset: "Berkshire Hathaway",
    ticker: "BRK.B",
    qty: 15,
    price: 350,
    costBasis: 320,
    value: 5250,
    allocation: 0.07,
    sector: "Financials",
    assetClass: "Equities",
    strategy: "Foundation",
  },
]

function formatUSD(amount: number): string {
  return amount.toLocaleString(undefined, { 
    style: "currency", 
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export function HoldingsTable({ holdings = [], onAddHolding, onSelectHolding, selectedHolding }: HoldingsTableProps) {
  const [query, setQuery] = useState("")
  const [filterMode, setFilterMode] = useState<"all" | "assetClass" | "sector" | "strategy">("all")
  const [filterValue, setFilterValue] = useState("")
  
  // Get unique values for filter dropdowns
  const uniqueAssetClasses = useMemo(() => 
    [...new Set(holdings.map(h => h.assetClass).filter(Boolean))], 
    [holdings]
  )
  const uniqueSectors = useMemo(() => 
    [...new Set(holdings.map(h => h.sector).filter(Boolean))], 
    [holdings]
  )
  const uniqueStrategies = useMemo(() => 
    [...new Set(holdings.map(h => h.strategy).filter(Boolean))], 
    [holdings]
  )
  
  const processedData = useMemo(() => 
    holdings
      .map((holding) => ({
        ...holding,
        gain: holding.value - holding.qty * holding.costBasis,
        gainPct: ((holding.value - holding.qty * holding.costBasis) / (holding.qty * holding.costBasis)) * 100,
      }))
      .filter((holding) => {
        // Text search filter
        const matchesSearch = (holding.asset + holding.ticker).toLowerCase().includes(query.toLowerCase())
        
        // Category filter
        let matchesFilter = true
        if (filterMode !== "all" && filterValue) {
          switch (filterMode) {
            case "assetClass":
              matchesFilter = holding.assetClass === filterValue
              break
            case "sector":
              matchesFilter = holding.sector === filterValue
              break
            case "strategy":
              matchesFilter = holding.strategy === filterValue
              break
          }
        }
        
        return matchesSearch && matchesFilter
      }), 
    [holdings, query, filterMode, filterValue]
  )

  return (
    <Card className="w-full border rounded-xl shadow-sm bg-white">
      <CardHeader className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Holdings</h3>
          <Button 
            size="sm" 
            onClick={onAddHolding}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            + Add Holding
          </Button>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search holdings…" 
            className="max-w-xs"
          />
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filter by:</span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={filterMode === "all" ? "default" : "outline"} 
                onClick={() => {
                  setFilterMode("all")
                  setFilterValue("")
                }}
                className={filterMode === "all" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
              >
                All
              </Button>
              <Button 
                size="sm" 
                variant={filterMode === "assetClass" ? "default" : "outline"} 
                onClick={() => {
                  setFilterMode("assetClass")
                  setFilterValue("")
                }}
                className={filterMode === "assetClass" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
              >
                Asset Class
              </Button>
              <Button 
                size="sm" 
                variant={filterMode === "sector" ? "default" : "outline"} 
                onClick={() => {
                  setFilterMode("sector")
                  setFilterValue("")
                }}
                className={filterMode === "sector" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
              >
                Sector
              </Button>
              <Button 
                size="sm" 
                variant={filterMode === "strategy" ? "default" : "outline"} 
                onClick={() => {
                  setFilterMode("strategy")
                  setFilterValue("")
                }}
                className={filterMode === "strategy" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
              >
                Strategy
              </Button>
            </div>
          </div>
          
          {/* Filter Value Dropdown */}
          {filterMode !== "all" && (
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select {filterMode === "assetClass" ? "Asset Class" : filterMode === "sector" ? "Sector" : "Strategy"}...</option>
              {(filterMode === "assetClass" ? uniqueAssetClasses : 
                filterMode === "sector" ? uniqueSectors : 
                uniqueStrategies).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-3 pr-4 font-medium">Asset</th>
              <th className="py-3 pr-4 font-medium">Ticker</th>
              <th className="py-3 pr-4 font-medium">Sector</th>
              <th className="py-3 pr-4 font-medium">Asset Class</th>
              <th className="py-3 pr-4 font-medium">Strategy</th>
              <th className="py-3 pr-4 font-medium">Qty</th>
              <th className="py-3 pr-4 font-medium">Price</th>
              <th className="py-3 pr-4 font-medium">Value</th>
              <th className="py-3 pr-4 font-medium">Allocation</th>
              <th className="py-3 pr-4 font-medium">Gain/Loss</th>
              <th className="py-3 pr-4 font-medium">Gain %</th>
            </tr>
          </thead>
          <tbody>
            {processedData.map((holding) => (
              <tr 
                key={holding.ticker} 
                className={`border-b border-gray-100 transition-colors cursor-pointer ${
                  selectedHolding?.ticker === holding.ticker 
                    ? 'bg-indigo-50 border-indigo-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelectHolding?.(holding)}
              >
                <td className="py-4 pr-4 font-medium text-gray-800">{holding.asset}</td>
                <td className="py-4 pr-4 text-gray-600 font-mono text-xs bg-gray-100 rounded px-2 py-1 inline-block">
                  {holding.ticker}
                </td>
                <td className="py-4 pr-4 text-gray-700">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {holding.sector || "N/A"}
                  </span>
                </td>
                <td className="py-4 pr-4 text-gray-700">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {holding.assetClass || "N/A"}
                  </span>
                </td>
                <td className="py-4 pr-4 text-gray-700">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {holding.strategy || "N/A"}
                  </span>
                </td>
                <td className="py-4 pr-4 text-gray-700">
                  {holding.qty === 1 && holding.ticker !== "USD" ? "1 unit" : holding.qty.toLocaleString()}
                </td>
                <td className="py-4 pr-4 text-gray-700">{formatUSD(holding.price)}</td>
                <td className="py-4 pr-4 font-medium text-gray-800">{formatUSD(holding.value)}</td>
                <td className="py-4 pr-4 text-gray-700">{(holding.allocation * 100).toFixed(0)}%</td>
                <td className={`py-4 pr-4 font-medium ${holding.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {holding.gain >= 0 ? "+" : ""}{formatUSD(holding.gain)}
                </td>
                <td className={`py-4 pr-4 font-medium ${holding.gainPct >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {holding.gain >= 0 ? "+" : ""}{holding.gainPct.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {processedData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>
              {query ? `No holdings found matching "${query}"` : 
               filterMode !== "all" && filterValue ? 
               `No holdings found in ${filterMode === "assetClass" ? "Asset Class" : filterMode === "sector" ? "Sector" : "Strategy"}: ${filterValue}` :
               "No holdings found"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 