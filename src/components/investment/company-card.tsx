"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, AlertTriangle } from "lucide-react"

interface StockData {
  currentPrice: number
  change: number
  changePercent: number
  marketCap: number
  peRatio: number
  dividendYield: number
  volume: number
  avgVolume: number
  dayRange: { low: number; high: number }
  yearRange: { low: number; high: number }
}

interface CompanyCardProps {
  ticker: string
  name: string
  snapshot: string
  moat: string
  risks: string[]
  valuationMetrics: {
    pe: string
    ps: string
    industryPE: string
    industryPS: string
    marginOfSafety: string
  }
  fit: string
  stockData?: StockData
  industry?: string
  sector?: string
}

function generateLinks(ticker: string, name: string): { label: string; url: string }[] {
  return [
    {
      label: `${name} SEC Filings (Google Search)`,
      url: `https://www.google.com/search?q=${name}+${ticker}+SEC+filings`
    },
    {
      label: `${name} Financial Ratios (Google Search)`,
      url: `https://www.google.com/search?q=${name}+${ticker}+financial+ratios`
    },
    {
      label: `${name} Stock News`,
      url: `https://www.google.com/search?q=${name}+${ticker}+stock+news`
    },
    {
      label: "Investopedia: P/E Ratio",
      url: "https://www.investopedia.com/terms/p/price-earningsratio.asp"
    }
  ]
}

function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(1)}T`
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(1)}B`
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(1)}M`
  return `$${marketCap.toLocaleString()}`
}

function formatVolume(volume: number): string {
  if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`
  return volume.toLocaleString()
}

export function CompanyCard({
  ticker,
  name,
  snapshot,
  moat,
  risks,
  valuationMetrics,
  fit,
  stockData,
  industry,
  sector
}: CompanyCardProps) {
  const links = generateLinks(ticker, name)
  const isPositive = stockData ? stockData.change >= 0 : true

  return (
    <Card className="w-full max-w-md sm:max-w-lg border rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        {/* Header with company info and stock price */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs font-medium">
                {ticker}
              </Badge>
              {industry && (
                <Badge variant="secondary" className="text-xs">
                  {industry}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Stock Price Display */}
          {stockData && (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${stockData.currentPrice.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* Key Metrics Grid */}
        {stockData && (
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <div className="text-xs text-gray-500 font-medium">Market Cap</div>
              <div className="font-semibold text-gray-900">{formatMarketCap(stockData.marketCap)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500 font-medium">P/E Ratio</div>
              <div className="font-semibold text-gray-900">{stockData.peRatio.toFixed(1)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500 font-medium">Dividend Yield</div>
              <div className="font-semibold text-gray-900">{stockData.dividendYield > 0 ? `${stockData.dividendYield.toFixed(2)}%` : 'N/A'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500 font-medium">Volume</div>
              <div className="font-semibold text-gray-900">{formatVolume(stockData.volume)}</div>
            </div>
          </div>
        )}

        {/* Company Snapshot */}
        <div>
          <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4" />
            Company Overview
          </h3>
          <p className="text-gray-600 leading-relaxed">{snapshot}</p>
        </div>

        {/* Competitive Moat */}
        <div>
          <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4" />
            Competitive Moat
          </h3>
          <p className="text-gray-600 leading-relaxed">{moat}</p>
        </div>

        {/* Key Risks */}
        <div>
          <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" />
            Key Risks
          </h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {risks.map((risk, idx) => (
              <li key={idx} className="text-sm">{risk}</li>
            ))}
          </ul>
        </div>

        {/* Valuation Metrics */}
        <div>
          <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4" />
            Valuation Analysis
          </h3>
          <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="space-y-1">
              <div className="text-xs text-gray-500 font-medium">P/E Ratio</div>
              <div className="font-semibold text-gray-900">{valuationMetrics.pe}</div>
              <div className="text-xs text-gray-500">Industry: {valuationMetrics.industryPE}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500 font-medium">P/S Ratio</div>
              <div className="font-semibold text-gray-900">{valuationMetrics.ps}</div>
              <div className="text-xs text-gray-500">Industry: {valuationMetrics.industryPS}</div>
            </div>
          </div>
          <div className="mt-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
            <div className="text-xs font-medium text-yellow-800">Margin of Safety: {valuationMetrics.marginOfSafety}</div>
          </div>
        </div>

        {/* Investor Fit */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2">🎯 Investor Fit</h3>
          <p className="text-gray-600 leading-relaxed">{fit}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
          >
            Add to Watchlist
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-gray-600 border-gray-200 hover:bg-gray-50"
          >
            View Full Profile
          </Button>
        </div>

        {/* External Links */}
        {links && (
          <div className="border-t border-gray-100 pt-3">
            <h3 className="font-medium text-gray-800 mb-2">🔎 Dig Deeper</h3>
            <div className="space-y-1">
              {links.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-xs text-blue-600 hover:text-blue-800 hover:underline break-words"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 