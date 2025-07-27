'use client';

import { useMemo } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { PortfolioHeader } from './PortfolioHeader';
import { SectorGroup } from './SectorGroup';
import { LoadingSpinner } from '../ui/loading-spinner';
import { groupBySector, calculatePortfolioSummary } from '@/lib/calculations';
import { AlertCircle } from 'lucide-react';

export const PortfolioDashboard = () => {
  const { stocks, loading, error, lastUpdated, refreshData } = usePortfolio();

  const portfolioSummary = useMemo(() => 
    calculatePortfolioSummary(stocks), [stocks]
  );

  const sectorGroups = useMemo(() => 
    groupBySector(stocks), [stocks]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 shadow-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <h3 className="text-sm font-medium text-red-800">Error Loading Portfolio</h3>
            </div>
            <div className="mt-2">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={refreshData}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PortfolioHeader
          summary={portfolioSummary}
          lastUpdated={lastUpdated}
          onRefresh={refreshData}
          isLoading={loading}
        />

        <div className="space-y-6">
          {sectorGroups.map(sectorGroup => (
            <SectorGroup
              key={sectorGroup.sector}
              sectorSummary={sectorGroup}
            />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p className="flex items-center justify-center space-x-2">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Portfolio updates automatically every 15 seconds</span>
            </p>
            <p>Data simulated for demonstration purposes • Real-time market integration available</p>
          </div>
        </div>
      </div>
    </div>
  );
};