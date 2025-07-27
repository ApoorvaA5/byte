'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SectorSummary } from '@/types/portfolio';
import { StockRow } from './StockRow';
import { formatCurrency, formatPercentage } from '@/lib/calculations';

interface SectorGroupProps {
  sectorSummary: SectorSummary;
}

export const SectorGroup = ({ sectorSummary }: SectorGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isPositive = sectorSummary.totalGainLoss >= 0;

  return (
    <div className="mb-6">
      <div
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl p-6 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-600" />
            )}
            <h3 className="text-xl font-bold text-gray-900">
              {sectorSummary.sector}
            </h3>
            <span className="text-sm text-gray-500">
              ({sectorSummary.stocks.length} stocks)
            </span>
          </div>
          
          <div className="flex items-center space-x-8 text-sm">
            <div>
              <span className="text-gray-600">Investment: </span>
              <span className="font-medium">
                {formatCurrency(sectorSummary.totalInvestment)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Present Value: </span>
              <span className="font-medium">
                {formatCurrency(sectorSummary.totalPresentValue)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Gain/Loss: </span>
              <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(sectorSummary.totalGainLoss)} 
                ({formatPercentage(sectorSummary.gainLossPercent)})
              </span>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-white rounded-b-xl shadow-lg overflow-hidden border-l border-r border-b border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Particulars
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchase Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Investment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Portfolio %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exchange
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CMP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gain/Loss
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P/E Ratio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Latest Earnings
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sectorSummary.stocks.map((stock, index) => (
                  <StockRow key={stock.id} stock={stock} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};