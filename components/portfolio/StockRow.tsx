'use client';

import { CalculatedStock } from '@/types/portfolio';
import { formatCurrency, formatPercentage } from '@/lib/calculations';

interface StockRowProps {
  stock: CalculatedStock;
  index: number;
}

export const StockRow = ({ stock, index }: StockRowProps) => {
  const isPositiveGain = stock.gainLoss >= 0;

  return (
    <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-semibold text-gray-900">
            {stock.particulars}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {stock.symbol}
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatCurrency(stock.purchasePrice)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {stock.quantity}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatCurrency(stock.investment)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {stock.portfolioPercent.toFixed(2)}%
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
          {stock.exchange}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {formatCurrency(stock.cmp)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatCurrency(stock.presentValue)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`text-sm font-bold ${isPositiveGain ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(stock.gainLoss)}
        </div>
        <div className={`text-xs font-medium ${isPositiveGain ? 'text-green-500' : 'text-red-500'}`}>
          {formatPercentage(stock.gainLossPercent)}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {stock.peRatio.toFixed(1)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {stock.latestEarnings}
      </td>
    </tr>
  );
};