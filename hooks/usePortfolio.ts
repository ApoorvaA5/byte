'use client';

import { useState, useEffect, useCallback } from 'react';
import { Stock, CalculatedStock } from '@/types/portfolio';
import { mockStocks, simulatePriceUpdate } from '@/lib/mockData';
import { fetchMultipleStockPrices } from '@/lib/yahooFinance';
import { calculateStockMetrics } from '@/lib/calculations';

export const usePortfolio = () => {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [calculatedStocks, setCalculatedStocks] = useState<CalculatedStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [marketStatus, setMarketStatus] = useState<string>('UNKNOWN');

  const updatePricesSimulated = useCallback(() => {
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

  const updatePricesLive = useCallback(async () => {
    try {
      setError(null);
      const symbols = stocks.map(stock => stock.symbol);
      const livePrices = await fetchMultipleStockPrices(symbols);
      
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          cmp: livePrices[stock.symbol] || stock.cmp
        }))
      );
      
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch live stock prices');
      console.error('Error fetching live prices:', err);
      // Fallback to simulated prices if live fetch fails
      updatePricesSimulated();
    }
  }, [stocks, updatePricesSimulated]);

  const toggleLiveMode = useCallback(() => {
    setIsLiveMode(prev => !prev);
  }, []);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isLiveMode) {
        // Try to fetch live prices for initial load
        const symbols = mockStocks.map(stock => stock.symbol);
        const livePrices = await fetchMultipleStockPrices(symbols);
        
        const updatedStocks = mockStocks.map(stock => ({
          ...stock,
          cmp: livePrices[stock.symbol] || stock.cmp
        }));
        
        setStocks(updatedStocks);
      } else {
        setStocks(mockStocks);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch portfolio data');
      console.error('Error fetching data:', err);
      // Fallback to mock data
      setStocks(mockStocks);
    } finally {
      setLoading(false);
    }
  }, [isLiveMode]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    const calculated = calculateStockMetrics(stocks);
    setCalculatedStocks(calculated);
  }, [stocks]);

  useEffect(() => {
    // Update prices every 30 seconds for live mode, 15 seconds for simulation
    const updateInterval = isLiveMode ? 30000 : 15000;
    const updateFunction = isLiveMode ? updatePricesLive : updatePricesSimulated;
    
    const interval = setInterval(updateFunction, updateInterval);
    return () => clearInterval(interval);
  }, [isLiveMode, updatePricesLive, updatePricesSimulated]);

  const refreshData = useCallback(() => {
    if (isLiveMode) {
      updatePricesLive();
    } else {
      updatePricesSimulated();
    }
  }, [isLiveMode, updatePricesLive, updatePricesSimulated]);

  return {
    stocks: calculatedStocks,
    loading,
    error,
    lastUpdated,
    isLiveMode,
    marketStatus,
    refreshData,
    toggleLiveMode
  };
};