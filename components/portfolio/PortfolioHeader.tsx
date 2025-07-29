'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { PortfolioSummary } from '@/types/portfolio';
import { formatCurrency, formatPercentage } from '@/lib/calculations';

interface PortfolioHeaderProps {
  summary: PortfolioSummary;
  lastUpdated: Date;
  onRefresh: () => void;
  isLoading: boolean;
  isLiveMode: boolean;
  onToggleLiveMode: () => void;
}

export const PortfolioHeader = ({ 
  summary, 
  lastUpdated, 
  onRefresh, 
  isLoading,
  isLiveMode,
  onToggleLiveMode
}: PortfolioHeaderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPositive = summary.totalGainLoss >= 0;

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Portfolio Overview
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">Real-time performance tracking and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleLiveMode}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                isLiveMode 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              {isLiveMode ? '🔴 LIVE' : '📊 DEMO'}
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Last updated: {mounted ? lastUpdated.toLocaleTimeString() : '--:--:--'}
            {isLiveMode && <span className="ml-1 text-green-600">• Live Data</span>}
          </span>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLiveMode ? 'Fetch Live' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Investment</h3>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formatCurrency(summary.totalInvestment)}
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Present Value</h3>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formatCurrency(summary.totalPresentValue)}
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Gain/Loss</h3>
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </div>
          <p className={`text-2xl sm:text-3xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(summary.totalGainLoss)}
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Return %</h3>
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </div>
          <p className={`text-2xl sm:text-3xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(summary.totalGainLossPercent)}
          </p>
        </div>
      </div>
    </div>
  );
};