export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: { price: number[] };
}

export interface Token {
  symbol: string;
  icon: string;
  name: string;
  price: number;
}

export interface SwapDetails {
  rate: string;
  swapFee: string;
  minReceived: string;
  maxSlippage: string;
  providers: string[];
}

export type SwapStep = "select" | "review" | "confirm";
