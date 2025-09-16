'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NewsFeed } from '@/components/news/NewsFeed';
import { X, TrendingUp, Calendar, RefreshCw } from 'lucide-react';

interface Holding {
  asset: string;
  ticker: string;
  qty: number;
  price: number;
  costBasis: number;
  value: number;
  allocation: number;
  sector?: string;
  assetClass?: string;
  strategy?: string;
}

interface CompanyNewsSectionProps {
  selectedHolding: Holding | null;
  onClose: () => void;
}

export function CompanyNewsSection({ selectedHolding, onClose }: CompanyNewsSectionProps) {
  const [variant, setVariant] = useState<'standard' | 'compact'>('compact');

  if (!selectedHolding) {
    return null;
  }

  const formatUSD = (amount: number): string => {
    return amount.toLocaleString(undefined, { 
      style: "currency", 
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const getGainColor = (gain: number) => {
    return gain >= 0 ? "text-green-600" : "text-red-600";
  };

  const gain = selectedHolding.value - selectedHolding.costBasis;
  const gainPct = (gain / selectedHolding.costBasis) * 100;

  return (
    <div className="space-y-4">
      {/* Company Header */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedHolding.asset}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="font-mono text-sm">
                    {selectedHolding.ticker}
                  </Badge>
                  {selectedHolding.sector && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedHolding.sector}
                    </Badge>
                  )}
                  {selectedHolding.strategy && (
                    <Badge variant="outline" className="text-xs">
                      {selectedHolding.strategy}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVariant(variant === 'compact' ? 'standard' : 'compact')}
                className="text-gray-600"
              >
                {variant === 'compact' ? 'Standard View' : 'Compact View'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-sm text-gray-500">Current Price</div>
              <div className="font-semibold text-gray-900">
                {formatUSD(selectedHolding.price)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="font-semibold text-gray-900">
                {formatUSD(selectedHolding.value)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Gain/Loss</div>
              <div className={`font-semibold ${getGainColor(gain)}`}>
                {gain >= 0 ? "+" : ""}{formatUSD(gain)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Gain %</div>
              <div className={`font-semibold ${getGainColor(gainPct)}`}>
                {gainPct >= 0 ? "+" : ""}{gainPct.toFixed(1)}%
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Company News */}
      <NewsFeed
        symbol={selectedHolding.ticker}
        variant={variant}
        showHeader={false}
        maxInitialItems={variant === 'compact' ? 6 : 4}
        itemsPerPage={variant === 'compact' ? 6 : 4}
        className="animate-in fade-in-0 slide-in-from-bottom-2"
      />
    </div>
  );
}

// Hook for managing selected holding state
export function useSelectedHolding() {
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);

  const selectHolding = (holding: Holding) => {
    setSelectedHolding(holding);
  };

  const clearSelection = () => {
    setSelectedHolding(null);
  };

  return {
    selectedHolding,
    selectHolding,
    clearSelection
  };
}

