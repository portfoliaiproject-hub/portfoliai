"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, TrendingUp, TrendingDown } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  url: string
  sentiment: 'positive' | 'negative' | 'neutral'
  impact?: 'high' | 'medium' | 'low'
}

interface NewsCardProps {
  ticker: string
  name: string
  news: NewsItem[]
  lastUpdated: string
}

function getSentimentIcon(sentiment: string) {
  switch (sentiment) {
    case 'positive':
      return <TrendingUp className="w-3 h-3 text-green-600" />
    case 'negative':
      return <TrendingDown className="w-3 h-3 text-red-600" />
    default:
      return null
  }
}

function getImpactColor(impact?: string) {
  switch (impact) {
    case 'high':
      return 'bg-red-100 text-red-700 border-red-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'low':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 48) return 'Yesterday'
  return `${Math.floor(diffInHours / 24)}d ago`
}

function NewsItemRow({ newsItem }: { newsItem: NewsItem }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0 py-3">
      <div className="flex items-start gap-3">
        {/* Sentiment Icon */}
        <div className="flex-shrink-0 mt-1">
          {getSentimentIcon(newsItem.sentiment)}
        </div>
        
        {/* News Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium text-gray-900 text-sm leading-relaxed line-clamp-2">
              {newsItem.title}
            </h3>
            {newsItem.impact && (
              <Badge 
                variant="outline" 
                className={`text-xs ${getImpactColor(newsItem.impact)}`}
              >
                {newsItem.impact} impact
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {newsItem.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="font-medium text-gray-700">{newsItem.source}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimeAgo(newsItem.publishedAt)}
              </div>
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-blue-600 hover:text-blue-800 p-1 h-auto"
              onClick={() => window.open(newsItem.url, '_blank')}
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NewsCard({ ticker, name, news, lastUpdated }: NewsCardProps) {
  const positiveNews = news.filter(item => item.sentiment === 'positive').length
  const negativeNews = news.filter(item => item.sentiment === 'negative').length
  const neutralNews = news.filter(item => item.sentiment === 'neutral').length

  return (
    <Card className="w-full max-w-md sm:max-w-lg border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs font-medium">
                {ticker}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Latest News
              </Badge>
            </div>
          </div>
          
          {/* News Sentiment Summary */}
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{news.length} articles</div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">{positiveNews}</span>
              <span className="text-gray-400">|</span>
              <TrendingDown className="w-3 h-3 text-red-600" />
              <span className="text-red-600">{negativeNews}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">Recent headlines and market sentiment</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* News List */}
        <div className="space-y-1">
          {news.map((newsItem) => (
            <NewsItemRow key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>

        {/* Sentiment Analysis */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="font-medium text-gray-800 mb-3">Market Sentiment</h3>
          
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-700">{positiveNews}</div>
              <div className="text-green-600 text-xs">Positive</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="font-semibold text-red-700">{negativeNews}</div>
              <div className="text-red-600 text-xs">Negative</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold text-gray-700">{neutralNews}</div>
              <div className="text-gray-600 text-xs">Neutral</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => window.open(`https://www.google.com/search?q=${ticker}+stock+news`, '_blank')}
          >
            View All News
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-gray-600 border-gray-200 hover:bg-gray-50"
          >
            Set Alerts
          </Button>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
          Last updated: {lastUpdated}
        </div>
      </CardContent>
    </Card>
  )
}
