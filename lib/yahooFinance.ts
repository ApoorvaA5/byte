import yahooFinance from 'yahoo-finance2';

export interface YahooQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: Date;
  marketState: string;
}

// Map Indian stock symbols to Yahoo Finance format
const symbolMapping: Record<string, string> = {
  'HDFCBANK': 'HDFCBANK.NS',
  'BAJFINANCE': 'BAJFINANCE.NS',
  'ICICIBANK': 'ICICIBANK.NS',
  'BAJAJHSG': 'BAJAJHSG.NS',
  'SAVANFIN': 'SAVANFIN.NS',
  'AFFLE': 'AFFLE.NS',
  'LTIM': 'LTIM.NS',
  'KPITTECH': 'KPITTECH.NS',
  'TATATECH': 'TATATECH.NS',
  'BLSESERV': 'BLSESERV.NS',
  'TANLA': 'TANLA.NS',
  'HAPPSTMIND': 'HAPPSTMIND.NS',
  'EASEMYTRIP': 'EASEMYTRIP.NS',
  'DMART': 'DMART.NS',
  'TATACONS': 'TATACONS.NS',
  'PIDILITIND': 'PIDILITIND.NS',
  'TATAPOWER': 'TATAPOWER.NS',
  'KPIGREEN': 'KPIGREEN.NS',
  'SUZLON': 'SUZLON.NS',
  'GENSOL': 'GENSOL.NS',
  'HARIOMPIPE': 'HARIOMPIPE.NS',
  'ASTRAL': 'ASTRAL.NS',
  'FINPIPE': 'FINPIPE.NS',
  'CLEANSCI': 'CLEANSCI.NS',
  'DEEPAKNI': 'DEEPAKNI.NS',
  'FINEORG': 'FINEORG.NS',
  'GRAVITA': 'GRAVITA.NS',
  'SBILIFE': 'SBILIFE.NS'
};

export const fetchStockPrice = async (symbol: string): Promise<number | null> => {
  try {
    const yahooSymbol = symbolMapping[symbol] || `${symbol}.NS`;
    
    const quote = await yahooFinance.quote(yahooSymbol, {
      fields: ['regularMarketPrice', 'regularMarketChange', 'regularMarketChangePercent']
    });

    if (quote && quote.regularMarketPrice) {
      return quote.regularMarketPrice;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
};

export const fetchMultipleStockPrices = async (symbols: string[]): Promise<Record<string, number>> => {
  const results: Record<string, number> = {};
  
  try {
    // Convert symbols to Yahoo Finance format
    const yahooSymbols = symbols.map(symbol => symbolMapping[symbol] || `${symbol}.NS`);
    
    // Fetch quotes in batches to avoid rate limiting
    const batchSize = 10;
const batches: string[][] = [];

for (let i = 0; i < yahooSymbols.length; i += batchSize) {
  batches.push(yahooSymbols.slice(i, i + batchSize));
}
    
    for (const batch of batches) {
      try {
        const quotes = await Promise.allSettled(
          batch.map(symbol => yahooFinance.quote(symbol, {
            fields: ['regularMarketPrice', 'regularMarketChange', 'regularMarketChangePercent']
          }))
        );
        
        quotes.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value?.regularMarketPrice) {
            const originalSymbol = symbols[batches.indexOf(batch) * batchSize + index];
            results[originalSymbol] = result.value.regularMarketPrice;
          }
        });
        
        // Add delay between batches to respect rate limits
        if (batches.indexOf(batch) < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (batchError) {
        console.error('Error fetching batch:', batchError);
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error fetching multiple stock prices:', error);
    return {};
  }
};

export const getMarketStatus = async (): Promise<string> => {
  try {
    // Use NIFTY 50 as market indicator
    const quote = await yahooFinance.quote('^NSEI', {
      fields: ['marketState']
    });
    
    return quote?.marketState || 'UNKNOWN';
  } catch (error) {
    console.error('Error fetching market status:', error);
    return 'UNKNOWN';
  }
};