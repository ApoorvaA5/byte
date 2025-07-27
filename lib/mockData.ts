import { Stock } from '@/types/portfolio';

export const mockStocks: Stock[] = [
  {
    id: '1',
    particulars: 'Reliance Industries Ltd',
    symbol: 'RELIANCE',
    sector: 'Energy',
    purchasePrice: 2450.00,
    quantity: 25,
    exchange: 'NSE',
    cmp: 2580.75,
    peRatio: 12.5,
    latestEarnings: 'Q3 FY24: ₹18,951 Cr'
  },
  {
    id: '2',
    particulars: 'Tata Consultancy Services',
    symbol: 'TCS',
    sector: 'Technology',
    purchasePrice: 3200.00,
    quantity: 15,
    exchange: 'NSE',
    cmp: 3450.20,
    peRatio: 28.3,
    latestEarnings: 'Q3 FY24: ₹11,058 Cr'
  },
  {
    id: '3',
    particulars: 'HDFC Bank Ltd',
    symbol: 'HDFCBANK',
    sector: 'Financials',
    purchasePrice: 1550.00,
    quantity: 40,
    exchange: 'NSE',
    cmp: 1620.45,
    peRatio: 15.8,
    latestEarnings: 'Q3 FY24: ₹16,373 Cr'
  },
  {
    id: '4',
    particulars: 'Infosys Ltd',
    symbol: 'INFY',
    sector: 'Technology',
    purchasePrice: 1400.00,
    quantity: 30,
    exchange: 'NSE',
    cmp: 1385.60,
    peRatio: 24.1,
    latestEarnings: 'Q3 FY24: ₹6,586 Cr'
  },
  {
    id: '5',
    particulars: 'ICICI Bank Ltd',
    symbol: 'ICICIBANK',
    sector: 'Financials',
    purchasePrice: 920.00,
    quantity: 50,
    exchange: 'NSE',
    cmp: 965.30,
    peRatio: 16.2,
    latestEarnings: 'Q3 FY24: ₹10,261 Cr'
  },
  {
    id: '6',
    particulars: 'Bharti Airtel Ltd',
    symbol: 'BHARTIARTL',
    sector: 'Telecommunications',
    purchasePrice: 850.00,
    quantity: 35,
    exchange: 'NSE',
    cmp: 895.75,
    peRatio: 32.4,
    latestEarnings: 'Q3 FY24: ₹3,593 Cr'
  },
  {
    id: '7',
    particulars: 'ITC Ltd',
    symbol: 'ITC',
    sector: 'Consumer Goods',
    purchasePrice: 420.00,
    quantity: 80,
    exchange: 'NSE',
    cmp: 435.85,
    peRatio: 22.7,
    latestEarnings: 'Q3 FY24: ₹4,761 Cr'
  },
  {
    id: '8',
    particulars: 'State Bank of India',
    symbol: 'SBIN',
    sector: 'Financials',
    purchasePrice: 540.00,
    quantity: 60,
    exchange: 'NSE',
    cmp: 578.90,
    peRatio: 10.3,
    latestEarnings: 'Q3 FY24: ₹16,884 Cr'
  }
];

// Function to simulate real-time price updates
export const simulatePriceUpdate = (currentPrice: number): number => {
  const volatility = 0.02; // 2% volatility
  const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
  return Math.max(currentPrice + change, currentPrice * 0.9); // Minimum 10% loss limit
};