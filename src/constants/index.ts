// App Configuration
export const APP_CONFIG = {
  name: "PortfoliAI",
  description: "AI-Powered Investment Assistant",
  version: "1.0.0",
  author: "PortfoliAI Team"
} as const

// API Configuration
export const API_CONFIG = {
  endpoints: {
    openai: "/api/chat/openai",
    portfolio: "/api/portfolio",
    risk: "/api/risk-assessment"
  },
  timeouts: {
    default: 30000,
    openai: 60000
  }
} as const

// UI Constants
export const UI_CONSTANTS = {
  colors: {
    primary: "#4F46E5",
    secondary: "#10B981", 
    accent: "#F59E0B",
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B"
  },
  breakpoints: {
    sm: "640px",
    md: "768px", 
    lg: "1024px",
    xl: "1280px"
  },
  sidebar: {
    width: "256px",
    portfolioWidth: "384px"
  }
} as const

// Portfolio Constants
export const PORTFOLIO_CONSTANTS = {
  assetTypes: [
    "stock",
    "bond", 
    "real_estate",
    "crypto",
    "cash",
    "land",
    "commodity"
  ] as const,
  activityTypes: [
    "buy",
    "sell", 
    "deposit",
    "withdrawal",
    "dividend",
    "rebalance"
  ] as const,
  riskCategories: [
    "conservative",
    "moderate", 
    "aggressive",
    "very_aggressive"
  ] as const
}

// Chat Constants
export const CHAT_CONSTANTS = {
  maxMessages: 100,
  maxSessionsPerUser: 50,
  messageTypes: [
    "text",
    "company_card",
    "comparison_card",
    "portfolio_summary", 
    "risk_assessment"
  ] as const,
  defaultMessages: {
    welcome: "Welcome back! How can I help you with your investments today?",
    error: "Sorry, I encountered an error. Please try again.",
    loading: "Let me think about that..."
  }
}

// Validation Constants
export const VALIDATION = {
  user: {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    nameMinLength: 2,
    nameMaxLength: 50
  },
  portfolio: {
    nameMinLength: 1,
    nameMaxLength: 100,
    maxHoldings: 1000,
    minShares: 0.001,
    maxShares: 1000000
  },
  chat: {
    messageMinLength: 1,
    messageMaxLength: 2000,
    sessionTitleMaxLength: 100
  }
}

// Demo Stock Prices (for trading simulation)
export const DEMO_STOCK_PRICES = {
  AAPL: 180.00,
  AMZN: 140.00,
  MSFT: 320.00,
  GOOGL: 125.00,
  TSLA: 250.00,
  NVDA: 420.00,
  META: 285.00,
  NFLX: 380.00
} as const

// Mock Data (for development)
export const MOCK_DATA = {
  companies: {
    apple: {
      ticker: "AAPL",
      name: "Apple",
      snapshot: "Apple designs and sells consumer electronics, software, and services.",
      moat: "Strong brand loyalty, integrated ecosystem, recurring services revenue.",
      risks: ["Competition from Samsung and Google", "Premium valuation", "Regulatory pressure"],
      valuationMetrics: {
        pe: "28x",
        ps: "7.5x",
        industryPE: "20x", 
        industryPS: "3x",
        marginOfSafety: "10%"
      },
      fit: "Suitable for growth-oriented investors who can tolerate moderate risk."
    }
  },
  comparisons: {
    appleVsMicrosoft: {
      companyA: {
        ticker: "AAPL",
        name: "Apple",
        strengths: [
          "Brand ecosystem & loyal customer base",
          "High-margin services growth",
          "Global retail distribution network",
          "Strong balance sheet with cash reserves",
          "Innovation in consumer electronics"
        ],
        risks: [
          "Heavy reliance on iPhone revenue",
          "Regulatory pressure in EU/US",
          "Slowing growth in mature markets",
          "Increasing competition in services"
        ],
        investorFit: "Appeals to growth investors seeking consumer tech exposure with tolerance for cyclical product risk and premium valuations.",
        revenueData: [
          { name: "iPhone", value: 50 },
          { name: "Services", value: 20 },
          { name: "Mac", value: 10 },
          { name: "iPad & Other", value: 20 }
        ]
      },
      companyB: {
        ticker: "MSFT",
        name: "Microsoft",
        strengths: [
          "Cloud (Azure) experiencing strong growth",
          "Diversified revenue streams",
          "Enterprise contracts provide recurring revenue",
          "Strong developer ecosystem",
          "Leadership in productivity software"
        ],
        risks: [
          "Antitrust investigations and regulatory scrutiny",
          "Dependence on enterprise IT budgets",
          "Intensifying competition in AI/cloud",
          "Legacy software transition challenges"
        ],
        investorFit: "Suitable for long-term investors wanting diversified tech exposure, recurring enterprise revenue, and stable growth with cloud upside.",
        revenueData: [
          { name: "Cloud (Azure)", value: 40 },
          { name: "Office/365", value: 30 },
          { name: "Windows", value: 15 },
          { name: "Gaming & Other", value: 15 }
        ]
      },
      valuationData: [
        { metric: "P/E", AAPL: 28, MSFT: 35 },
        { metric: "P/S", AAPL: 7.5, MSFT: 12 },
        { metric: "EV/EBITDA", AAPL: 22, MSFT: 28 },
        { metric: "PEG", AAPL: 2.1, MSFT: 1.8 }
      ],
      verdict: "Apple leans consumer-driven growth while Microsoft thrives in enterprise & cloud. Apple offers higher brand loyalty but cyclical risk, while Microsoft provides more predictable enterprise revenue streams."
    }
  },
  portfolio: {
    allocation: [
      { name: "Stocks", value: 55850, color: "#4F46E5" },
      { name: "Bonds", value: 8000, color: "#10B981" },
      { name: "Real Estate", value: 14250, color: "#F59E0B" },
      { name: "Cash", value: 3500, color: "#06B6D4" }
    ],
    holdings: [
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
    ],
    activities: [
      { id: "1", type: "buy", text: "Bought 5 AAPL shares", date: "Aug 25", amount: "+$875", ticker: "AAPL", user_id: "demo", portfolio_id: "demo" },
      { id: "2", type: "deposit", text: "Added cash to portfolio", date: "Aug 20", amount: "+$2,000", user_id: "demo", portfolio_id: "demo" },
      { id: "3", type: "sell", text: "Sold 2 TSLA shares", date: "Aug 18", amount: "+$560", ticker: "TSLA", user_id: "demo", portfolio_id: "demo" },
      { id: "4", type: "dividend", text: "MSFT dividend received", date: "Aug 15", amount: "+$24", ticker: "MSFT", user_id: "demo", portfolio_id: "demo" }
    ]
  }
} as const 