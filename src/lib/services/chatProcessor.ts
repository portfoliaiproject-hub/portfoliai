import type { 
  Message, 
  Company, 
  ComparisonData, 
  MarketMoversData, 
  FinancialHealthData, 
  NewsData,
  StockData,
  MarketMover,
  FinancialMetric,
  NewsItem
} from "@/types"

/**
 * Chat Processor Service
 * Handles user queries and returns appropriate card types based on the design document scenarios
 */
export class ChatProcessor {
  
  /**
   * Process user message and determine the appropriate response type
   */
  static async processUserMessage(userMessage: string): Promise<{
    responseType: "text" | "company_card" | "comparison_card" | "portfolio_summary" | "risk_assessment" | "market_movers_card" | "financial_health_card" | "news_card"
    data?: any
    textResponse?: string
  }> {
    const message = userMessage.toLowerCase()
    
    console.log('ChatProcessor processing:', userMessage)
    console.log('Lowercase message:', message)
    
    // Scenario 1: Simple Stock Price Query
    if (this.isStockPriceQuery(message)) {
      console.log('Detected stock price query')
      return this.handleStockPriceQuery(message)
    }
    
    // Scenario 2: Detailed Company Information
    if (this.isCompanyInfoQuery(message)) {
      console.log('Detected company info query')
      return this.handleCompanyInfoQuery(message)
    }
    
    // Scenario 3: Company News Retrieval
    if (this.isNewsQuery(message)) {
      console.log('Detected news query')
      return this.handleNewsQuery(message)
    }
    
    // Scenario 4: Comparative Analysis
    if (this.isComparisonQuery(message)) {
      console.log('Detected comparison query')
      return this.handleComparisonQuery(message)
    }
    
    // Scenario 5: Forward-Looking Analysis
    if (this.isForwardLookingQuery(message)) {
      console.log('Detected forward looking query')
      return this.handleForwardLookingQuery(message)
    }
    
    // Scenario 6: Detailed Fundamental Deep Dive
    if (this.isFundamentalQuery(message)) {
      console.log('Detected fundamental query')
      return this.handleFundamentalQuery(message)
    }
    
    // Scenario 7: Market Sentiment Scan
    if (this.isSentimentQuery(message)) {
      console.log('Detected sentiment query')
      return this.handleSentimentQuery(message)
    }
    
    // Scenario 8: Industry and Competitor Analysis
    if (this.isIndustryComparisonQuery(message)) {
      console.log('Detected industry comparison query')
      return this.handleIndustryComparisonQuery(message)
    }
    
    // Scenario 9: Identifying Trading Opportunities
    if (this.isTradingOpportunityQuery(message)) {
      console.log('Detected trading opportunity query')
      return this.handleTradingOpportunityQuery(message)
    }
    
    // Financial Coach Scenarios
    if (this.isEducationalQuery(message)) {
      console.log('Detected educational query')
      return this.handleEducationalQuery(message)
    }
    
    // Default: Text response
    return {
      responseType: "text",
      textResponse: "I understand you're asking about financial information. Let me help you with that. Could you please be more specific about what you'd like to know?"
    }
  }
  
  // Query Type Detection Methods
  private static isStockPriceQuery(message: string): boolean {
    const patterns = [
      /what.*price.*(?:of|for)/i,
      /how much.*(?:stock|share)/i,
      /current.*price/i,
      /stock.*price.*now/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isCompanyInfoQuery(message: string): boolean {
    const patterns = [
      /tell me about/i,
      /what.*company/i,
      /company.*overview/i,
      /business.*summary/i,
      /about/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isNewsQuery(message: string): boolean {
    const patterns = [
      /news.*(?:for|about)/i,
      /headlines/i,
      /latest.*news/i,
      /what.*happening/i,
      /news/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isComparisonQuery(message: string): boolean {
    const patterns = [
      /compare/i,
      /versus|vs/i,
      /which.*better/i,
      /difference.*between/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isForwardLookingQuery(message: string): boolean {
    const patterns = [
      /upcoming.*events/i,
      /earnings.*date/i,
      /future.*outlook/i,
      /sentiment.*around/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isFundamentalQuery(message: string): boolean {
    const patterns = [
      /financial.*health/i,
      /debt.*equity/i,
      /net income/i,
      /fundamental.*analysis/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isSentimentQuery(message: string): boolean {
    const patterns = [
      /buying.*selling/i,
      /institutional.*activity/i,
      /insider.*trading/i,
      /market.*sentiment/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isIndustryComparisonQuery(message: string): boolean {
    const patterns = [
      /industry.*peers/i,
      /competitor.*analysis/i,
      /sector.*comparison/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isTradingOpportunityQuery(message: string): boolean {
    const patterns = [
      /high.*volume/i,
      /unusual.*activity/i,
      /trading.*opportunity/i,
      /market.*movers/i,
      /high.*value/i,
      /value.*stocks/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  private static isEducationalQuery(message: string): boolean {
    const patterns = [
      /what.*dividend/i,
      /explain.*market cap/i,
      /diversification/i,
      /risk.*management/i,
      /how.*invest/i
    ]
    return patterns.some(pattern => pattern.test(message))
  }
  
  // Handler Methods
  private static async handleStockPriceQuery(message: string): Promise<{
    responseType: "text" | "company_card"
    data?: any
    textResponse?: string
  }> {
    // Extract ticker from message
    const ticker = this.extractTicker(message)
    if (!ticker) {
      return {
        responseType: "text",
        textResponse: "I couldn't identify a specific stock ticker. Please provide the company name or ticker symbol."
      }
    }
    
    // Simulate stock data (in real implementation, this would call an API)
    const stockData: StockData = {
      currentPrice: 195.50,
      change: 2.30,
      changePercent: 1.19,
      marketCap: 3.1e12,
      peRatio: 28.5,
      dividendYield: 0.5,
      volume: 45000000,
      avgVolume: 52000000,
      dayRange: { low: 193.20, high: 196.80 },
      yearRange: { low: 124.17, high: 198.23 }
    }
    
    const companyData: Company = {
      ticker: ticker,
      name: "Apple Inc.",
      snapshot: "Apple Inc. is a technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
      moat: "Strong brand loyalty, ecosystem lock-in, and premium pricing power",
      risks: [
        "Dependence on iPhone sales",
        "Supply chain disruptions",
        "Regulatory scrutiny"
      ],
      valuationMetrics: {
        pe: "28.5",
        ps: "7.2",
        industryPE: "25.3",
        industryPS: "6.8",
        marginOfSafety: "Moderate"
      },
      fit: "Suitable for growth-oriented investors with moderate risk tolerance",
      stockData: stockData,
      industry: "Technology",
      sector: "Consumer Electronics"
    }
    
    return {
      responseType: "company_card",
      data: companyData
    }
  }
  
  private static async handleCompanyInfoQuery(message: string): Promise<{
    responseType: "text" | "company_card"
    data?: any
    textResponse?: string
  }> {
    const ticker = this.extractTicker(message)
    if (!ticker) {
      return {
        responseType: "text",
        textResponse: "Please specify which company you'd like to learn about."
      }
    }
    
    // Return enhanced company card with detailed information
    return this.handleStockPriceQuery(message) // Reuse the same logic for now
  }
  
  private static async handleNewsQuery(message: string): Promise<{
    responseType: "text" | "news_card"
    data?: any
    textResponse?: string
  }> {
    const ticker = this.extractTicker(message)
    if (!ticker) {
      return {
        responseType: "text",
        textResponse: "Please specify which company's news you'd like to see."
      }
    }
    
    // Simulate news data
    const newsData: NewsData = {
      ticker: ticker,
      name: "Apple Inc.",
      news: [
        {
          id: "1",
          title: "Apple Reports Strong Q4 Earnings, Beats Expectations",
          summary: "Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone sales and services growth.",
          source: "Reuters",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          url: "https://example.com/news1",
          sentiment: "positive",
          impact: "high"
        },
        {
          id: "2",
          title: "Apple Announces New Product Lineup for Holiday Season",
          summary: "The company unveiled several new products including updated MacBooks and AirPods with enhanced features.",
          source: "Bloomberg",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          url: "https://example.com/news2",
          sentiment: "positive",
          impact: "medium"
        },
        {
          id: "3",
          title: "Supply Chain Challenges Impact Apple's Production",
          summary: "Recent supply chain disruptions have caused delays in some product launches, according to industry sources.",
          source: "CNBC",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          url: "https://example.com/news3",
          sentiment: "negative",
          impact: "medium"
        }
      ],
      lastUpdated: new Date().toLocaleString()
    }
    
    return {
      responseType: "news_card",
      data: newsData
    }
  }
  
  private static async handleComparisonQuery(message: string): Promise<{
    responseType: "text" | "comparison_card"
    data?: any
    textResponse?: string
  }> {
    const tickers = this.extractMultipleTickers(message)
    if (tickers.length < 2) {
      return {
        responseType: "text",
        textResponse: "Please specify two companies to compare."
      }
    }
    
    // Simulate comparison data
    const comparisonData: ComparisonData = {
      companyA: {
        ticker: tickers[0],
        name: "Apple Inc.",
        strengths: [
          "Strong brand loyalty and ecosystem",
          "Consistent revenue growth",
          "High profit margins"
        ],
        risks: [
          "Dependence on iPhone sales",
          "Supply chain risks"
        ],
        investorFit: "Growth investors seeking stable returns",
        revenueData: [
          { name: "iPhone", value: 50 },
          { name: "Services", value: 20 },
          { name: "Mac", value: 15 },
          { name: "Other", value: 15 }
        ]
      },
      companyB: {
        ticker: tickers[1],
        name: "Microsoft Corporation",
        strengths: [
          "Dominant market position in software",
          "Strong cloud services growth",
          "Diversified revenue streams"
        ],
        risks: [
          "Regulatory scrutiny",
          "Competition in cloud services"
        ],
        investorFit: "Value investors seeking dividend growth",
        revenueData: [
          { name: "Cloud Services", value: 40 },
          { name: "Office Products", value: 30 },
          { name: "Windows", value: 20 },
          { name: "Other", value: 10 }
        ]
      },
      valuationData: [
        { metric: "P/E Ratio", [tickers[0]]: 28.5, [tickers[1]]: 36.7 },
        { metric: "P/S Ratio", [tickers[0]]: 7.2, [tickers[1]]: 12.1 },
        { metric: "Debt/Equity", [tickers[0]]: 0.15, [tickers[1]]: 0.25 },
        { metric: "ROE", [tickers[0]]: 147.2, [tickers[1]]: 39.8 }
      ],
      verdict: "Both companies offer strong investment opportunities with different risk profiles. Apple provides more stable growth while Microsoft offers higher growth potential in cloud services."
    }
    
    return {
      responseType: "comparison_card",
      data: comparisonData
    }
  }
  
  private static async handleForwardLookingQuery(message: string): Promise<{
    responseType: "text"
    textResponse: string
  }> {
    const ticker = this.extractTicker(message)
    if (!ticker) {
      return {
        responseType: "text",
        textResponse: "Please specify which company's future outlook you'd like to explore."
      }
    }
    
    return {
      responseType: "text",
      textResponse: `${ticker} is scheduled to report its next quarterly earnings on January 25, 2024. Analysts are currently projecting earnings of $2.10 per share. Recent news indicates a mixed sentiment, with some reports focusing on production challenges and others highlighting the potential of their new product launches.`
    }
  }
  
  private static async handleFundamentalQuery(message: string): Promise<{
    responseType: "text" | "financial_health_card"
    data?: any
    textResponse?: string
  }> {
    const ticker = this.extractTicker(message)
    if (!ticker) {
      return {
        responseType: "text",
        textResponse: "Please specify which company's financial health you'd like to analyze."
      }
    }
    
    // Simulate financial health data
    const financialHealthData: FinancialHealthData = {
      ticker: ticker,
      name: "Apple Inc.",
      metrics: [
        {
          name: "Debt-to-Equity Ratio",
          value: 0.15,
          unit: "",
          benchmark: 0.5,
          isHigherBetter: false,
          description: "Measures financial leverage and risk"
        },
        {
          name: "Return on Equity",
          value: 147.2,
          unit: "%",
          benchmark: 15.0,
          isHigherBetter: true,
          description: "Measures profitability relative to shareholder equity"
        },
        {
          name: "Current Ratio",
          value: 1.35,
          unit: "",
          benchmark: 1.0,
          isHigherBetter: true,
          description: "Measures ability to pay short-term obligations"
        },
        {
          name: "Operating Margin",
          value: 30.8,
          unit: "%",
          benchmark: 15.0,
          isHigherBetter: true,
          description: "Measures operational efficiency"
        }
      ],
      overallScore: 85,
      lastUpdated: new Date().toLocaleString()
    }
    
    return {
      responseType: "financial_health_card",
      data: financialHealthData
    }
  }
  
  private static async handleSentimentQuery(message: string): Promise<{
    responseType: "text"
    textResponse: string
  }> {
    const ticker = this.extractTicker(message)
    if (!ticker) {
      return {
        responseType: "text",
        textResponse: "Please specify which stock's market sentiment you'd like to check."
      }
    }
    
    return {
      responseType: "text",
      textResponse: `Recently, there has been significant institutional activity in ${ticker}. Major investment firms have shown a slight increase in their holdings. Simultaneously, recent SEC filings show several large-volume sells by company insiders. This suggests a mixed outlook, with institutions buying in but key executives taking profits.`
    }
  }
  
  private static async handleIndustryComparisonQuery(message: string): Promise<{
    responseType: "text" | "comparison_card"
    data?: any
    textResponse?: string
  }> {
    const tickers = this.extractMultipleTickers(message)
    if (tickers.length < 2) {
      return {
        responseType: "text",
        textResponse: "Please specify multiple companies for industry comparison."
      }
    }
    
    return this.handleComparisonQuery(message) // Reuse comparison logic
  }
  
  private static async handleTradingOpportunityQuery(message: string): Promise<{
    responseType: "market_movers_card"
    data: any
  }> {
    // Simulate market movers data
    const marketMoversData: MarketMoversData = {
      gainers: [
        {
          ticker: "GME",
          name: "GameStop Corp.",
          currentPrice: 15.80,
          change: 2.45,
          changePercent: 18.35,
          volume: 45000000,
          avgVolume: 9000000
        },
        {
          ticker: "AMC",
          name: "AMC Entertainment",
          currentPrice: 8.75,
          change: 1.20,
          changePercent: 15.87,
          volume: 35000000,
          avgVolume: 12000000
        },
        {
          ticker: "TSLA",
          name: "Tesla Inc.",
          currentPrice: 245.30,
          change: 12.50,
          changePercent: 5.37,
          volume: 85000000,
          avgVolume: 95000000
        }
      ],
      losers: [
        {
          ticker: "NFLX",
          name: "Netflix Inc.",
          currentPrice: 485.20,
          change: -25.80,
          changePercent: -5.05,
          volume: 12000000,
          avgVolume: 8000000
        },
        {
          ticker: "ZM",
          name: "Zoom Video",
          currentPrice: 65.40,
          change: -3.20,
          changePercent: -4.67,
          volume: 8500000,
          avgVolume: 6000000
        },
        {
          ticker: "PTON",
          name: "Peloton Interactive",
          currentPrice: 6.80,
          change: -0.45,
          changePercent: -6.21,
          volume: 15000000,
          avgVolume: 12000000
        }
      ],
      date: new Date().toLocaleDateString()
    }
    
    return {
      responseType: "market_movers_card",
      data: marketMoversData
    }
  }
  
  private static async handleEducationalQuery(message: string): Promise<{
    responseType: "text"
    textResponse: string
  }> {
    if (message.includes("dividend")) {
      return {
        responseType: "text",
        textResponse: "Dividends are a portion of a company's earnings that it pays out to its shareholders. It's like a reward for owning a piece of the company. Companies that are stable and profitable often pay them. A great example is Coca-Cola (KO). Its current dividend yield is around 3%, which means that for every $100 you invest, you would receive roughly $3 per year."
      }
    }
    
    if (message.includes("market cap")) {
      return {
        responseType: "text",
        textResponse: "Market capitalization is the total value of a company's stock. It's calculated by multiplying the current stock price by the total number of shares. For example, Microsoft (MSFT) is a 'large-cap' company with a market cap of over $3 trillion, while GameStop (GME) is a 'mid-cap' with a market cap of around $4 billion. Does that make sense? We can check the market cap of any company you're curious about!"
      }
    }
    
    if (message.includes("diversification")) {
      return {
        responseType: "text",
        textResponse: "It's great that you're thinking about that! The concept of spreading your investments around is called diversification. It helps reduce risk. You could look at companies in different sectors, like healthcare. Would you like me to find some large, stable healthcare companies to look into?"
      }
    }
    
    return {
      responseType: "text",
      textResponse: "I'd be happy to explain any financial concept you're curious about. What specific topic would you like to learn more about?"
    }
  }
  
  // Utility Methods
  private static extractTicker(message: string): string | null {
    // First try to find uppercase tickers (like AAPL, MSFT)
    const uppercasePattern = /\b[A-Z]{1,5}\b/g
    const uppercaseMatches = message.match(uppercasePattern)
    if (uppercaseMatches) {
      return uppercaseMatches[0]
    }
    
    // Then try to map common company names to tickers
    const companyToTicker: { [key: string]: string } = {
      'apple': 'AAPL',
      'microsoft': 'MSFT',
      'tesla': 'TSLA',
      'nvidia': 'NVDA',
      'amazon': 'AMZN',
      'google': 'GOOGL',
      'meta': 'META',
      'netflix': 'NFLX',
      'amd': 'AMD',
      'intel': 'INTC',
      'coca-cola': 'KO',
      'coca cola': 'KO',
      'coke': 'KO',
      'ford': 'F',
      'general motors': 'GM',
      'gm': 'GM',
      'gamestop': 'GME',
      'amc': 'AMC',
      'zoom': 'ZM',
      'peloton': 'PTON'
    }
    
    const lowerMessage = message.toLowerCase()
    for (const [company, ticker] of Object.entries(companyToTicker)) {
      if (lowerMessage.includes(company)) {
        return ticker
      }
    }
    
    return null
  }
  
  private static extractMultipleTickers(message: string): string[] {
    const tickers: string[] = []
    
    // First try to find uppercase tickers
    const uppercasePattern = /\b[A-Z]{1,5}\b/g
    const uppercaseMatches = message.match(uppercasePattern)
    if (uppercaseMatches) {
      tickers.push(...uppercaseMatches)
    }
    
    // Then try to map company names to tickers
    const companyToTicker: { [key: string]: string } = {
      'apple': 'AAPL',
      'microsoft': 'MSFT',
      'tesla': 'TSLA',
      'nvidia': 'NVDA',
      'amazon': 'AMZN',
      'google': 'GOOGL',
      'meta': 'META',
      'netflix': 'NFLX',
      'amd': 'AMD',
      'intel': 'INTC',
      'coca-cola': 'KO',
      'coca cola': 'KO',
      'coke': 'KO',
      'ford': 'F',
      'general motors': 'GM',
      'gm': 'GM',
      'gamestop': 'GME',
      'amc': 'AMC',
      'zoom': 'ZM',
      'peloton': 'PTON'
    }
    
    const lowerMessage = message.toLowerCase()
    for (const [company, ticker] of Object.entries(companyToTicker)) {
      if (lowerMessage.includes(company) && !tickers.includes(ticker)) {
        tickers.push(ticker)
      }
    }
    
    return tickers
  }
}
