import { Stock } from '@/types/portfolio';

export const mockStocks: Stock[] = [
  // Financial Sector
  {
    id: '1',
    particulars: 'HDFC Bank',
    symbol: 'HDFCBANK',
    sector: 'Financial Sector',
    purchasePrice: 1490,
    quantity: 50,
    exchange: 'NSE',
    cmp: 1700,
    peRatio: 18.69,
    latestEarnings: '₹91.02 Cr'
  },
  {
    id: '2',
    particulars: 'Bajaj Finance',
    symbol: 'BAJFINANCE',
    sector: 'Financial Sector',
    purchasePrice: 6465,
    quantity: 15,
    exchange: 'NSE',
    cmp: 8420,
    peRatio: 32.63,
    latestEarnings: '₹257.8 Cr'
  },
  {
    id: '3',
    particulars: 'ICICI Bank',
    symbol: 'ICICIBANK',
    sector: 'Financial Sector',
    purchasePrice: 780,
    quantity: 84,
    exchange: 'NSE',
    cmp: 1216,
    peRatio: 17.68,
    latestEarnings: '₹68.72 Cr'
  },
  {
    id: '4',
    particulars: 'Bajaj Housing',
    symbol: 'BAJAJHSG',
    sector: 'Financial Sector',
    purchasePrice: 130,
    quantity: 504,
    exchange: 'NSE',
    cmp: 113,
    peRatio: 85.72,
    latestEarnings: '₹2.53 Cr'
  },
  {
    id: '5',
    particulars: 'Savan Financials',
    symbol: 'SAVANFIN',
    sector: 'Financial Sector',
    purchasePrice: 24,
    quantity: 1080,
    exchange: 'NSE',
    cmp: 15,
    peRatio: 0,
    latestEarnings: 'N/A'
  },
  
  // Tech Sector
  {
    id: '6',
    particulars: 'Affle India',
    symbol: 'AFFLE',
    sector: 'Tech Sector',
    purchasePrice: 1151,
    quantity: 50,
    exchange: 'NSE',
    cmp: 1460,
    peRatio: 55.53,
    latestEarnings: '₹26.11 Cr'
  },
  {
    id: '7',
    particulars: 'LTI Mindtree',
    symbol: 'LTIM',
    sector: 'Tech Sector',
    purchasePrice: 4775,
    quantity: 16,
    exchange: 'NSE',
    cmp: 4794,
    peRatio: 34.69,
    latestEarnings: '₹145.92 Cr'
  },
  {
    id: '8',
    particulars: 'KPIT Tech',
    symbol: 'KPITTECH',
    sector: 'Tech Sector',
    purchasePrice: 672,
    quantity: 61,
    exchange: 'NSE',
    cmp: 1293,
    peRatio: 46.57,
    latestEarnings: '₹27.77 Cr'
  },
  {
    id: '9',
    particulars: 'Tata Tech',
    symbol: 'TATATECH',
    sector: 'Tech Sector',
    purchasePrice: 1072,
    quantity: 63,
    exchange: 'NSE',
    cmp: 662,
    peRatio: 41.68,
    latestEarnings: '₹15.88 Cr'
  },
  {
    id: '10',
    particulars: 'BLS E-Services',
    symbol: 'BLSESERV',
    sector: 'Tech Sector',
    purchasePrice: 232,
    quantity: 191,
    exchange: 'NSE',
    cmp: 153,
    peRatio: 26.3,
    latestEarnings: '₹5.8 Cr'
  },
  {
    id: '11',
    particulars: 'Tanla',
    symbol: 'TANLA',
    sector: 'Tech Sector',
    purchasePrice: 1134,
    quantity: 45,
    exchange: 'NSE',
    cmp: 450,
    peRatio: 11.64,
    latestEarnings: '₹39.48 Cr'
  },
  
  // Consumer Sector
  {
    id: '12',
    particulars: 'Dmart',
    symbol: 'DMART',
    sector: 'Consumer',
    purchasePrice: 3777,
    quantity: 27,
    exchange: 'NSE',
    cmp: 3451,
    peRatio: 82.63,
    latestEarnings: '₹41.75 Cr'
  },
  {
    id: '13',
    particulars: 'Tata Consumer',
    symbol: 'TATACONS',
    sector: 'Consumer',
    purchasePrice: 845,
    quantity: 90,
    exchange: 'NSE',
    cmp: 961,
    peRatio: 26.56,
    latestEarnings: '₹134.77 Cr'
  },
  {
    id: '14',
    particulars: 'Pidilite',
    symbol: 'PIDILITIND',
    sector: 'Consumer',
    purchasePrice: 2376,
    quantity: 36,
    exchange: 'NSE',
    cmp: 2730,
    peRatio: 71.13,
    latestEarnings: '₹38.36 Cr'
  },
  
  // Power Sector
  {
    id: '15',
    particulars: 'Tata Power',
    symbol: 'TATAPOWER',
    sector: 'Power',
    purchasePrice: 224,
    quantity: 225,
    exchange: 'NSE',
    cmp: 351,
    peRatio: 29.36,
    latestEarnings: '₹11.94 Cr'
  },
  {
    id: '16',
    particulars: 'KPI Green',
    symbol: 'KPIGREEN',
    sector: 'Power',
    purchasePrice: 875,
    quantity: 50,
    exchange: 'NSE',
    cmp: 402,
    peRatio: 29.26,
    latestEarnings: '₹13.75 Cr'
  },
  {
    id: '17',
    particulars: 'Suzlon',
    symbol: 'SUZLON',
    sector: 'Power',
    purchasePrice: 44,
    quantity: 450,
    exchange: 'NSE',
    cmp: 51,
    peRatio: 61.25,
    latestEarnings: '₹0.84 Cr'
  },
  {
    id: '18',
    particulars: 'Gensol',
    symbol: 'GENSOL',
    sector: 'Power',
    purchasePrice: 998,
    quantity: 45,
    exchange: 'NSE',
    cmp: 373,
    peRatio: 39.51,
    latestEarnings: '₹5.57 Cr'
  },
  
  // Pipe Sector
  {
    id: '19',
    particulars: 'Hariom Pipes',
    symbol: 'HARIOMPIPE',
    sector: 'Pipe Sector',
    purchasePrice: 580,
    quantity: 60,
    exchange: 'NSE',
    cmp: 356,
    peRatio: 17.98,
    latestEarnings: '₹19.78 Cr'
  },
  {
    id: '20',
    particulars: 'Astral',
    symbol: 'ASTRAL',
    sector: 'Pipe Sector',
    purchasePrice: 1517,
    quantity: 56,
    exchange: 'NSE',
    cmp: 1318,
    peRatio: 67.13,
    latestEarnings: '₹19.59 Cr'
  },
  {
    id: '21',
    particulars: 'Finolex',
    symbol: 'FINPIPE',
    sector: 'Pipe Sector',
    purchasePrice: 2818,
    quantity: 28,
    exchange: 'NSE',
    cmp: 5000,
    peRatio: 40.91,
    latestEarnings: '₹121.97 Cr'
  },
  
  // Others Sector
  {
    id: '22',
    particulars: 'Clean Science',
    symbol: 'CLEANSCI',
    sector: 'Others',
    purchasePrice: 1610,
    quantity: 32,
    exchange: 'NSE',
    cmp: 1237,
    peRatio: 50.37,
    latestEarnings: '₹24.52 Cr'
  },
  {
    id: '23',
    particulars: 'Deepak Nitrite',
    symbol: 'DEEPAKNI',
    sector: 'Others',
    purchasePrice: 2248,
    quantity: 27,
    exchange: 'NSE',
    cmp: 1928,
    peRatio: 41.86,
    latestEarnings: '₹37.26 Cr'
  },
  {
    id: '24',
    particulars: 'Fine Organic',
    symbol: 'FINEORG',
    sector: 'Others',
    purchasePrice: 4284,
    quantity: 16,
    exchange: 'NSE',
    cmp: 3743,
    peRatio: 41.86,
    latestEarnings: '₹37.26 Cr'
  },
  {
    id: '25',
    particulars: 'Gravita',
    symbol: 'GRAVITA',
    sector: 'Others',
    purchasePrice: 2037,
    quantity: 8,
    exchange: 'NSE',
    cmp: 1614,
    peRatio: 41.86,
    latestEarnings: '₹37.26 Cr'
  },
  {
    id: '26',
    particulars: 'SBI Life',
    symbol: 'SBILIFE',
    sector: 'Others',
    purchasePrice: 1197,
    quantity: 49,
    exchange: 'NSE',
    cmp: 1405,
    peRatio: 0,
    latestEarnings: '₹-5.82 Cr'
  },
  
  // Additional stocks from second screenshot
  {
    id: '27',
    particulars: 'Happiest Mind',
    symbol: 'HAPPSTMIND',
    sector: 'Tech Sector',
    purchasePrice: 1103,
    quantity: 45,
    exchange: 'NSE',
    cmp: 702,
    peRatio: 47.31,
    latestEarnings: '₹14.43 Cr'
  },
  {
    id: '28',
    particulars: 'Easemytrip',
    symbol: 'EASEMYTRIP',
    sector: 'Tech Sector',
    purchasePrice: 20,
    quantity: 1333,
    exchange: 'NSE',
    cmp: 12,
    peRatio: 41.86,
    latestEarnings: '₹37.26 Cr'
  }
];

// Function to simulate real-time price updates
export const simulatePriceUpdate = (currentPrice: number): number => {
  const volatility = 0.015; // 1.5% volatility for more realistic movement
  const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
  return Math.max(currentPrice + change, currentPrice * 0.85); // Minimum 15% loss limit
};