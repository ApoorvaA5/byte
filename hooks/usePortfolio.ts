'use client';

import { useState, useEffect, useCallback } from 'react';
import { Stock, CalculatedStock } from '@/types/portfolio';
import { mockStocks, simulatePriceUpdate } from '@/lib/mockData';
import { calculateStockMetrics } from '@/lib/calculations';

export const usePortfolio = () => {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [calculatedStocks, setCalculatedStocks] = useState<CalculatedStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const updatePrices = useCallback(() => {
    try {
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          cmp: simulatePriceUpdate(stock.cmp)
        }))
      );
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to update stock prices');
      console.error('Error updating prices:', err);
    }
  }, []);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, this would fetch from actual APIs
      setStocks(mockStocks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch portfolio data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    const calculated = calculateStockMetrics(stocks);
    setCalculatedStocks(calculated);
  }, [stocks]);

  useEffect(() => {
    // Update prices every 15 seconds
    const interval = setInterval(updatePrices, 15000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  const refreshData = useCallback(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    stocks: calculatedStocks,
    loading,
    error,
    lastUpdated,
    refreshData,
    updatePrices
  };
};