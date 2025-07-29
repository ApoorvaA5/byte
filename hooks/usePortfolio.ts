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
  const [marketStatus, setMarketStatus] = useState<string>('UNKNOWN'); // Placeholder

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

      // Get fresh symbols list from current state
      setStocks(prevStocks => {
        const symbols = prevStocks.map(stock => stock.symbol);

        return prevStocks.map(stock => {
          const updatedPrice = simulatePriceUpdate(stock.cmp); // fallback until live fetch
          return {
            ...stock,
            cmp: updatedPrice,
          };
        });
      });

      const symbols = stocks.map(stock => stock.symbol); // fallback in case above skipped
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
      setStocks(mockStocks);
    } finally {
      setLoading(false);
    }
  }, [isLiveMode]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    setCalculatedStocks(calculateStockMetrics(stocks));
  }, [stocks]);

  useEffect(() => {
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
