export interface Stock {
  id: string;
  particulars: string;
  symbol: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  exchange: 'NSE' | 'BSE';
  cmp: number;
  peRatio: number;
  latestEarnings: string;
}

export interface CalculatedStock extends Stock {
  investment: number;
  portfolioPercent: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  marketCap?: number;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossPercent: number;
  portfolioPercent: number;
  stocks: CalculatedStock[];
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}