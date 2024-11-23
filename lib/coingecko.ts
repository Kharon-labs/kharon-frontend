import axios from "axios";
import { Token } from "@/interfaces/interfaces";

const coingeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

const rateLimiter = {
  lastCall: 0,
  minInterval: 1000,
  async throttle() {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCall;
    if (timeSinceLastCall < this.minInterval) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.minInterval - timeSinceLastCall)
      );
    }
    this.lastCall = Date.now();
  },
};

export const fetchCoins = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: true,
      },
    }
  );
  return response.data;
};

export const fetchExchanges = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/exchanges"
  );
  return response.data;
};

interface CoingeckoToken {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
  market_cap: number;
  market_cap_rank: number;
}

export async function getTokens(): Promise<Token[]> {
  try {
    await rateLimiter.throttle();

    const { data } = await coingeckoApi.get<CoingeckoToken[]>(
      "/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          sparkline: false,
        },
      }
    );

    return data.map((token) => ({
      symbol: token.symbol.toUpperCase(),
      name: token.name,
      price: token.current_price,
      icon: token.image,
      marketCap: token.market_cap,
      rank: token.market_cap_rank,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(`Failed to fetch tokens: ${error.message}`);
    }
    throw error;
  }
}
