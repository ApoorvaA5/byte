import { NextResponse } from 'next/server';
import { mockStocks, simulatePriceUpdate } from '@/lib/mockData';

// Simulate API endpoint for stock data
export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real application, this would fetch from Yahoo Finance and Google Finance APIs
    const updatedStocks = mockStocks.map(stock => ({
      ...stock,
      cmp: simulatePriceUpdate(stock.cmp)
    }));

    return NextResponse.json(updatedStocks);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}