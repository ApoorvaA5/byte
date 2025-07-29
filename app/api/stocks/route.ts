// Ensure this API route is always treated as dynamic (not statically cached)
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { mockStocks } from '@/lib/mockData';
import { fetchMultipleStockPrices } from '@/lib/yahooFinance';

// API endpoint for stock data with live Yahoo Finance integration
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'demo';
  
  try {
    if (mode === 'live') {
      // Fetch live prices from Yahoo Finance
      const symbols = mockStocks.map(stock => stock.symbol);
      const livePrices = await fetchMultipleStockPrices(symbols);
      
      const updatedStocks = mockStocks.map(stock => ({
        ...stock,
        cmp: livePrices[stock.symbol] || stock.cmp
      }));
      
      return NextResponse.json({
        stocks: updatedStocks,
        mode: 'live',
        timestamp: new Date().toISOString(),
        pricesUpdated: Object.keys(livePrices).length
      });
    } else {
      // Return mock data for demo mode
      return NextResponse.json({
        stocks: mockStocks,
        mode: 'demo',
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch stock data',
        fallback: mockStocks,
        mode: 'fallback'
      },
      { status: 500 }
    );
  }
}
