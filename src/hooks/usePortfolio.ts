"use client"

import { useState, useCallback } from "react"
import type { ActivityItem, PortfolioData } from "@/types"
import { DEMO_STOCK_PRICES, MOCK_DATA } from "@/constants"

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

interface PortfolioState {
  allocation: PortfolioData[]
  holdings: Holding[]
  activities: ActivityItem[]
  totalValue: number
  totalGain: number
}

interface UsePortfolioReturn {
  portfolio: PortfolioState
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void
  executeTrade: (ticker: string, quantity: number, action: 'buy' | 'sell') => void
  getStockPrice: (ticker: string) => number | null
}

const formatDate = () => {
  return new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

export function usePortfolio(): UsePortfolioReturn {
  const [portfolio, setPortfolio] = useState<PortfolioState>({
    allocation: [...MOCK_DATA.portfolio.allocation],
    holdings: [...MOCK_DATA.portfolio.holdings],
    activities: [...MOCK_DATA.portfolio.activities],
    totalValue: 81600, // Updated to match holdings total
    totalGain: 4200
  })

  const getStockPrice = useCallback((ticker: string): number | null => {
    return DEMO_STOCK_PRICES[ticker as keyof typeof DEMO_STOCK_PRICES] || null
  }, [])

  const addActivity = useCallback((activity: Omit<ActivityItem, 'id'>) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: Date.now().toString()
    }

    setPortfolio(prev => ({
      ...prev,
      activities: [newActivity, ...prev.activities]
    }))
  }, [])

  const executeTrade = useCallback((ticker: string, quantity: number, action: 'buy' | 'sell') => {
    const price = getStockPrice(ticker)
    if (!price) return

    const totalCost = price * quantity
    const today = formatDate()

    // Add activity
    const activity: Omit<ActivityItem, 'id'> = {
      type: action,
      text: `${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} ${ticker} shares`,
      date: today,
      amount: `${action === 'buy' ? '-' : '+'}$${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      ticker,
      user_id: "demo",
      portfolio_id: "demo"
    }

    addActivity(activity)

    // Update portfolio allocation and holdings
    setPortfolio(prev => {
      const newAllocation = prev.allocation.map(item => {
        if (item.name === "Stocks") {
          const change = action === 'buy' ? totalCost : -totalCost
          return {
            ...item,
            value: Math.max(0, item.value + change)
          }
        }
        return item
      })

      // Update holdings
      const newHoldings = [...prev.holdings]
      const existingHoldingIndex = newHoldings.findIndex(h => h.ticker === ticker)
      
      if (action === 'buy') {
        if (existingHoldingIndex >= 0) {
          // Update existing holding
          const holding = newHoldings[existingHoldingIndex]
          const newQty = holding.qty + quantity
          const newValue = newQty * price
          const weightedCostBasis = ((holding.qty * holding.costBasis) + (quantity * price)) / newQty
          
          newHoldings[existingHoldingIndex] = {
            ...holding,
            qty: newQty,
            price: price,
            costBasis: weightedCostBasis,
            value: newValue
          }
        } else {
          // Add new holding
          const companyName = ticker === 'AAPL' ? 'Apple' : 
                             ticker === 'MSFT' ? 'Microsoft' :
                             ticker === 'AMZN' ? 'Amazon' :
                             ticker === 'GOOGL' ? 'Google' :
                             ticker === 'TSLA' ? 'Tesla' :
                             ticker === 'NVDA' ? 'NVIDIA' :
                             ticker === 'META' ? 'Meta' :
                             ticker === 'NFLX' ? 'Netflix' : ticker
          
          // Determine sector, asset class, and strategy based on ticker
          const getHoldingDetails = (ticker: string) => {
            switch (ticker) {
              case 'AAPL':
              case 'MSFT':
              case 'GOOGL':
              case 'META':
              case 'NVDA':
              case 'NFLX':
                return { sector: "Technology", assetClass: "Equities", strategy: "Growth" }
              case 'TSLA':
                return { sector: "Consumer", assetClass: "Equities", strategy: "Adventurous" }
              case 'AMZN':
                return { sector: "Consumer", assetClass: "Equities", strategy: "Growth" }
              default:
                return { sector: "Other", assetClass: "Equities", strategy: "Growth" }
            }
          }

          const details = getHoldingDetails(ticker)
          newHoldings.push({
            asset: companyName,
            ticker: ticker,
            qty: quantity,
            price: price,
            costBasis: price,
            value: quantity * price,
            allocation: 0, // Will be recalculated below
            sector: details.sector,
            assetClass: details.assetClass,
            strategy: details.strategy
          })
        }
      } else if (action === 'sell' && existingHoldingIndex >= 0) {
        // Sell existing holding
        const holding = newHoldings[existingHoldingIndex]
        const newQty = Math.max(0, holding.qty - quantity)
        
        if (newQty === 0) {
          newHoldings.splice(existingHoldingIndex, 1)
        } else {
          newHoldings[existingHoldingIndex] = {
            ...holding,
            qty: newQty,
            price: price,
            value: newQty * price
          }
        }
      }

      const newTotalValue = newAllocation.reduce((sum, item) => sum + item.value, 0)
      const change = action === 'buy' ? totalCost : -totalCost
      const newTotalGain = prev.totalGain + (action === 'sell' ? totalCost * 0.1 : 0) // Simulate some gain on sales

      // Recalculate allocations for holdings
      newHoldings.forEach(holding => {
        holding.allocation = holding.value / newTotalValue
      })

      return {
        ...prev,
        allocation: newAllocation,
        holdings: newHoldings,
        totalValue: newTotalValue,
        totalGain: newTotalGain
      }
    })
  }, [getStockPrice, addActivity])

  return {
    portfolio,
    addActivity,
    executeTrade,
    getStockPrice
  }
} 