// Core types
export interface User {
  id: string
  email: string
  name?: string
  created_at?: string
  risk_profile?: RiskProfile
}

// Chat types
export interface Message {
  id: string
  role: "ai" | "user"
  content?: string
  type?: "text" | "company_card" | "comparison_card" | "portfolio_summary" | "risk_assessment" | "market_movers_card" | "financial_health_card" | "news_card"
  data?: any
  timestamp?: Date
}

export type ThreadType = "chat" | "idea"

export interface ChatSession {
  id: string
  title: string
  date: string
  isActive?: boolean
  user_id: string
  messages?: Message[]
  type: ThreadType
  lastActivity?: Date
  isIdeaCandidate?: boolean
  threadTypeLocked?: boolean
  ideaPromptShown?: boolean
}

// Investment types
export interface Company {
  ticker: string
  name: string
  snapshot: string
  moat: string
  risks: string[]
  valuationMetrics: ValuationMetrics
  fit: string
  industry?: string
  sector?: string
  marketCap?: number
  stockData?: StockData
}

export interface StockData {
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

export interface ValuationMetrics {
  pe: string
  ps: string
  industryPE: string
  industryPS: string
  marginOfSafety: string
  priceToBook?: string
  debtToEquity?: string
}

// Comparison types
export interface CompanyComparison {
  ticker: string
  name: string
  strengths: string[]
  risks: string[]
  investorFit: string
  revenueData: Array<{ name: string; value: number }>
}

export interface ComparisonData {
  companyA: CompanyComparison
  companyB: CompanyComparison
  valuationData: Array<{ metric: string; [key: string]: string | number }>
  verdict?: string
}

// Market Movers types
export interface MarketMover {
  ticker: string
  name: string
  currentPrice: number
  change: number
  changePercent: number
  volume: number
  avgVolume: number
}

export interface MarketMoversData {
  gainers: MarketMover[]
  losers: MarketMover[]
  date?: string
}

// Financial Health types
export interface FinancialMetric {
  name: string
  value: number
  unit: string
  benchmark: number
  isHigherBetter: boolean
  description: string
}

export interface FinancialHealthData {
  ticker: string
  name: string
  metrics: FinancialMetric[]
  overallScore: number
  lastUpdated: string
}

// News types
export interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  url: string
  sentiment: 'positive' | 'negative' | 'neutral'
  impact?: 'high' | 'medium' | 'low'
}

export interface NewsData {
  ticker: string
  name: string
  news: NewsItem[]
  lastUpdated: string
}

// Portfolio types
export interface PortfolioData {
  name: string
  value: number
  percentage?: number
  color?: string
}

export interface Holding {
  id: string
  ticker: string
  name: string
  shares: number
  avgPrice: number
  currentPrice: number
  totalValue: number
  gainLoss: number
  gainLossPercent: number
  assetType: AssetType
}

export type AssetType = "stock" | "bond" | "real_estate" | "crypto" | "cash" | "land" | "commodity"

export interface Portfolio {
  id: string
  user_id: string
  name: string
  totalValue: number
  totalGain: number
  totalGainPercent: number
  holdings: Holding[]
  allocation: PortfolioData[]
  lastUpdated: Date
}

// Activity types
export interface ActivityItem {
  id: string
  type: "buy" | "sell" | "deposit" | "withdrawal" | "dividend" | "rebalance"
  text: string
  date: string
  amount?: string
  ticker?: string
  user_id: string
  portfolio_id?: string
}

// Risk Assessment types
export interface RiskQuestion {
  id: string
  question: string
  type: "multiple_choice" | "scale" | "boolean"
  options?: string[]
  weight: number
}

export interface RiskResponse {
  question_id: string
  answer: string | number
  score: number
}

export interface RiskProfile {
  id: string
  user_id: string
  score: number
  category: "conservative" | "moderate" | "aggressive" | "very_aggressive"
  responses: RiskResponse[]
  recommendations: string[]
  allocation_suggestion: PortfolioData[]
  completed_at: Date
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

// Component Props types
export interface ComponentWithLoading {
  isLoading?: boolean
}

export interface ComponentWithError {
  error?: string
  onRetry?: () => void
} 