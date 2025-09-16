import axios from 'axios';

// Finnhub API configuration
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

if (!FINNHUB_API_KEY) {
  console.error('❌ NEXT_PUBLIC_FINNHUB_API_KEY is required. Please set it in your .env.local file');
}

export interface CompanyNewsArticle {
  headline: string;
  source: string;
  datetime: number;
  summary: string;
  related: string;
  url: string;
}

export interface CompanyNewsResponse {
  articles: CompanyNewsArticle[];
  totalCount: number;
  symbol: string;
  fromDate: string;
  toDate: string;
}

/**
 * Fetch company news from Finnhub API
 * @param symbol - Company ticker symbol (e.g., 'AAPL')
 * @param fromDate - Start date in YYYY-MM-DD format (optional, defaults to 7 days ago)
 * @param toDate - End date in YYYY-MM-DD format (optional, defaults to today)
 * @returns Promise<CompanyNewsResponse>
 */
export async function getCompanyNews(
  symbol: string,
  fromDate?: string,
  toDate?: string
): Promise<CompanyNewsResponse> {
  try {
    if (!FINNHUB_API_KEY) {
      throw new Error('Finnhub API key is not configured');
    }

    // Default to last 7 days if no date range provided
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const formatDate = (date: Date): string => date.toISOString().split('T')[0];
    
    const from = fromDate || formatDate(sevenDaysAgo);
    const to = toDate || formatDate(today);

    console.log(`📰 Fetching news for ${symbol} from ${from} to ${to}`);

    const url = `${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`;
    
    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
    });

    console.log(`📰 Finnhub API response for ${symbol}:`, {
      status: response.status,
      dataLength: Array.isArray(response.data) ? response.data.length : 0
    });

    if (!Array.isArray(response.data)) {
      throw new Error('Invalid response format from Finnhub API');
    }

    if (response.data.length === 0) {
      console.log(`📰 No news articles found for ${symbol} from ${from} to ${to}`);
      return {
        articles: [],
        totalCount: 0,
        symbol: symbol.toUpperCase(),
        fromDate: from,
        toDate: to
      };
    }

    // Sort articles by datetime (newest first)
    const sortedArticles = response.data
      .filter((article: any) => article.headline && article.datetime) // Filter out invalid articles
      .sort((a: any, b: any) => b.datetime - a.datetime)
      .map((article: any): CompanyNewsArticle => ({
        headline: article.headline || 'No Headline',
        source: article.source || 'Unknown Source',
        datetime: article.datetime,
        summary: article.summary || 'No summary available.',
        related: article.related || '',
        url: article.url || '#'
      }));

    console.log(`📰 Successfully fetched ${sortedArticles.length} articles for ${symbol}`);

    return {
      articles: sortedArticles,
      totalCount: sortedArticles.length,
      symbol: symbol.toUpperCase(),
      fromDate: from,
      toDate: to
    };

  } catch (error: any) {
    console.error(`📰 Error fetching news for ${symbol}:`, error.message);
    
    if (error.response?.status === 401) {
      throw new Error('Invalid Finnhub API key');
    } else if (error.response?.status === 429) {
      throw new Error('Finnhub API rate limit exceeded');
    } else if (error.response?.status === 404) {
      throw new Error(`No news found for symbol: ${symbol}`);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - Finnhub API is slow to respond');
    } else {
      throw new Error(`Failed to fetch news: ${error.message}`);
    }
  }
}

/**
 * Format datetime for display
 * @param datetime - Unix timestamp
 * @returns Formatted date string
 */
export function formatNewsDate(datetime: number): string {
  try {
    return new Date(datetime * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 250)
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 250): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

/**
 * Parse related tickers string
 * @param related - Comma-separated ticker string
 * @returns Array of ticker symbols
 */
export function parseRelatedTickers(related: string): string[] {
  if (!related || related.trim() === '') {
    return [];
  }
  return related.split(',').map(ticker => ticker.trim()).filter(ticker => ticker.length > 0);
}
