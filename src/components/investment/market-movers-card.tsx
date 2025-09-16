"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MarketMover {
  ticker: string
  name: string
  currentPrice: number
  change: number
  changePercent: number
  volume: number
  avgVolume: number
}

interface MarketMoversCardProps {
  gainers: MarketMover[]
  losers: MarketMover[]
  date?: string
}

function formatVolume(volume: number): string {
  if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`
  return volume.toLocaleString()
}

function MarketMoverRow({ mover, isGainer }: { mover: MarketMover; isGainer: boolean }) {
  const volumeRatio = mover.volume / mover.avgVolume
  const volumeBarWidth = Math.min(volumeRatio * 100, 100)
  
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-900">{mover.ticker}</span>
          <span className="text-xs text-gray-500 truncate">{mover.name}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Vol: {formatVolume(mover.volume)} ({volumeRatio.toFixed(1)}x avg)
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-sm text-gray-900">
          ${mover.currentPrice.toFixed(2)}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${
          isGainer ? 'text-green-600' : 'text-red-600'
        }`}>
          {isGainer ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {mover.change >= 0 ? '+' : ''}{mover.change.toFixed(2)} ({mover.changePercent >= 0 ? '+' : ''}{mover.changePercent.toFixed(2)}%)
        </div>
      </div>
      
      {/* Volume indicator bar */}
      <div className="w-16 ml-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full ${
              isGainer ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${volumeBarWidth}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function MarketMoversCard({ gainers, losers, date }: MarketMoversCardProps) {
  const today = date || new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <Card className="w-full max-w-2xl border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Market Movers</h2>
          <span className="text-sm text-gray-500">{today}</span>
        </div>
        <p className="text-sm text-gray-500">Top gainers and losers of the day</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Top Gainers */}
        <div>
          <h3 className="font-medium text-green-700 flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" />
            Top Gainers
          </h3>
          <div className="space-y-1">
            {gainers.map((gainer, index) => (
              <MarketMoverRow key={gainer.ticker} mover={gainer} isGainer={true} />
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div>
          <h3 className="font-medium text-red-700 flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4" />
            Top Losers
          </h3>
          <div className="space-y-1">
            {losers.map((loser, index) => (
              <MarketMoverRow key={loser.ticker} mover={loser} isGainer={false} />
            ))}
          </div>
        </div>

        {/* Market Summary */}
        <div className="border-t border-gray-100 pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-700">
                {gainers.length} Gainers
              </div>
              <div className="text-green-600">
                Avg: +{gainers.reduce((sum, g) => sum + g.changePercent, 0) / gainers.length}%
              </div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="font-semibold text-red-700">
                {losers.length} Losers
              </div>
              <div className="text-red-600">
                Avg: {losers.reduce((sum, l) => sum + l.changePercent, 0) / losers.length}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
