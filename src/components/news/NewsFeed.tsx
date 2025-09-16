'use client';

import React, { useState, useEffect } from 'react';
import { getCompanyNews, type CompanyNewsArticle, type CompanyNewsResponse } from '@/lib/services';
import { FinnhubNewsCard, FinnhubNewsCardCompact, FinnhubNewsCardSkeleton } from './NewsCard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, RefreshCw, Calendar, TrendingUp } from 'lucide-react';

interface NewsFeedProps {
  symbol: string;
  fromDate?: string;
  toDate?: string;
  variant?: 'standard' | 'compact';
  showHeader?: boolean;
  maxInitialItems?: number;
  itemsPerPage?: number;
  className?: string;
}

interface NewsFeedState {
  articles: CompanyNewsArticle[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  visibleCount: number;
  hasMore: boolean;
  lastFetch: Date | null;
}

export function NewsFeed({
  symbol,
  fromDate,
  toDate,
  variant = 'standard',
  showHeader = true,
  maxInitialItems = 10,
  itemsPerPage = 10,
  className = ''
}: NewsFeedProps) {
  const [state, setState] = useState<NewsFeedState>({
    articles: [],
    loading: false,
    error: null,
    totalCount: 0,
    visibleCount: 0,
    hasMore: false,
    lastFetch: null
  });

  const fetchNews = async (isRefresh = false) => {
    if (!symbol) return;

    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      console.log(`📰 Fetching news for ${symbol}...`);
      const response: CompanyNewsResponse = await getCompanyNews(symbol, fromDate, toDate);
      
      setState(prev => ({
        ...prev,
        articles: response.articles,
        totalCount: response.totalCount,
        visibleCount: Math.min(maxInitialItems, response.totalCount),
        hasMore: response.totalCount > maxInitialItems,
        loading: false,
        lastFetch: new Date(),
        error: null
      }));

      console.log(`📰 Successfully loaded ${response.totalCount} articles for ${symbol}`);
    } catch (error: any) {
      console.error(`📰 Error fetching news for ${symbol}:`, error.message);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
        articles: [],
        totalCount: 0,
        visibleCount: 0,
        hasMore: false
      }));
    }
  };

  const loadMore = () => {
    setState(prev => {
      const newVisibleCount = Math.min(prev.visibleCount + itemsPerPage, prev.totalCount);
      return {
        ...prev,
        visibleCount: newVisibleCount,
        hasMore: newVisibleCount < prev.totalCount
      };
    });
  };

  const refreshNews = () => {
    fetchNews(true);
  };

  // Fetch news on mount and when symbol changes
  useEffect(() => {
    fetchNews();
  }, [symbol, fromDate, toDate]);

  const formatDateRange = () => {
    if (fromDate && toDate) {
      return `${fromDate} to ${toDate}`;
    }
    return 'Last 2 days';
  };

  const getNewsCountText = () => {
    if (state.loading) return 'Loading...';
    if (state.error) return 'Error loading news';
    if (state.totalCount === 0) return 'No news found';
    return `${state.totalCount} articles found`;
  };

  const renderNewsCard = (article: CompanyNewsArticle, index: number) => {
    const CardComponent = variant === 'compact' ? FinnhubNewsCardCompact : FinnhubNewsCard;
    return (
      <CardComponent
        key={`${article.headline}-${article.datetime}`}
        article={article}
        className="animate-in fade-in-0 slide-in-from-bottom-2"
        style={{ animationDelay: `${index * 50}ms` }}
      />
    );
  };

  const renderLoadingSkeletons = () => {
    const skeletonCount = variant === 'compact' ? 6 : 3;
    return Array.from({ length: skeletonCount }).map((_, index) => (
      <FinnhubNewsCardSkeleton key={index} />
    ));
  };

  const renderErrorState = () => (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
        <h3 className="font-semibold text-red-800 mb-2">Failed to Load News</h3>
        <p className="text-red-600 text-sm mb-4">{state.error}</p>
        <Button
          onClick={refreshNews}
          variant="outline"
          size="sm"
          className="border-red-300 text-red-700 hover:bg-red-100"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );

  const renderEmptyState = () => (
    <Card className="border-gray-200 bg-gray-50">
      <CardContent className="p-6 text-center">
        <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-800 mb-2">No News Found</h3>
        <p className="text-gray-600 text-sm mb-4">
          No news articles were found for {symbol} in the specified date range.
        </p>
        <Button
          onClick={refreshNews}
          variant="outline"
          size="sm"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      {showHeader && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  Company News
                </h2>
                <Badge variant="outline" className="font-medium">
                  {symbol.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{formatDateRange()}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {getNewsCountText()}
              </p>
              {state.lastFetch && (
                <p className="text-xs text-gray-500">
                  Last updated: {state.lastFetch.toLocaleTimeString()}
                </p>
              )}
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Content */}
      <div className="space-y-4">
        {/* Loading State */}
        {state.loading && (
          <div className={`grid gap-4 ${variant === 'compact' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {renderLoadingSkeletons()}
          </div>
        )}

        {/* Error State */}
        {state.error && !state.loading && renderErrorState()}

        {/* Empty State */}
        {!state.loading && !state.error && state.totalCount === 0 && renderEmptyState()}

        {/* News Articles */}
        {!state.loading && !state.error && state.articles.length > 0 && (
          <>
            <div className={`grid gap-4 ${variant === 'compact' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {state.articles.slice(0, state.visibleCount).map((article, index) => 
                renderNewsCard(article, index)
              )}
            </div>

            {/* Load More Button */}
            {state.hasMore && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="px-6 py-2"
                >
                  Show More ({state.totalCount - state.visibleCount} remaining)
                </Button>
              </div>
            )}

            {/* Refresh Button */}
            {state.articles.length > 0 && (
              <div className="flex justify-center pt-2">
                <Button
                  onClick={refreshNews}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh News
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Hook for using news feed data programmatically
export function useNewsFeed(symbol: string, fromDate?: string, toDate?: string) {
  const [state, setState] = useState<NewsFeedState>({
    articles: [],
    loading: false,
    error: null,
    totalCount: 0,
    visibleCount: 0,
    hasMore: false,
    lastFetch: null
  });

  const fetchNews = async () => {
    if (!symbol) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await getCompanyNews(symbol, fromDate, toDate);
      setState(prev => ({
        ...prev,
        articles: response.articles,
        totalCount: response.totalCount,
        loading: false,
        lastFetch: new Date(),
        error: null
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
        articles: [],
        totalCount: 0
      }));
    }
  };

  useEffect(() => {
    fetchNews();
  }, [symbol, fromDate, toDate]);

  return {
    ...state,
    fetchNews,
    refreshNews: fetchNews
  };
}

