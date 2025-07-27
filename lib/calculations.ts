import { Stock, CalculatedStock, SectorSummary, PortfolioSummary } from '@/types/portfolio';

export const calculateStockMetrics = (stocks: Stock[]): CalculatedStock[] => {
  const totalPortfolioValue = stocks.reduce((sum, stock) => {
    return sum + (stock.purchasePrice * stock.quantity);
  }, 0);

  return stocks.map(stock => {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = stock.cmp * stock.quantity;
    const gainLoss = presentValue - investment;
    const gainLossPercent = (gainLoss / investment) * 100;
    const portfolioPercent = (investment / totalPortfolioValue) * 100;

    return {
      ...stock,
      investment,
      portfolioPercent,
      presentValue,
      gainLoss,
      gainLossPercent
    };
  });
};

export const groupBySector = (stocks: CalculatedStock[]): SectorSummary[] => {
  const sectorMap = stocks.reduce((acc, stock) => {
    if (!acc[stock.sector]) {
      acc[stock.sector] = [];
    }
    acc[stock.sector].push(stock);
    return acc;
  }, {} as Record<string, CalculatedStock[]>);

  return Object.entries(sectorMap).map(([sector, stocks]) => {
    const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
    const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0);
    const totalGainLoss = totalPresentValue - totalInvestment;
    const gainLossPercent = (totalGainLoss / totalInvestment) * 100;

    return {
      sector,
      totalInvestment,
      totalPresentValue,
      totalGainLoss,
      gainLossPercent,
      stocks
    };
  });
};

export const calculatePortfolioSummary = (stocks: CalculatedStock[]): PortfolioSummary => {
  const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
  const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0);
  const totalGainLoss = totalPresentValue - totalInvestment;
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    totalGainLossPercent
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
};