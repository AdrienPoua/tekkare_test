import { CryptoData } from "../types/API";

export default class FetchAPI {
  private _devise: string;
  private _numberOfItems: number;

  constructor(devise: string = "usd", items: number = 10) {
    this._devise = devise;
    this._numberOfItems = items;
  }

  get devise(): string {
    return this._devise;
  }

  get items(): number {
    return this._numberOfItems;
  }

  private getMarketAPI(): string {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this._devise}&order=market_cap_desc&per_page=${this._numberOfItems}&page=1&sparkline=false`;
  }

  private getCryptoDataAPI(crypto: string, timestamp: number): string {
    return `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=${this._devise}&days=${timestamp}`;
  }

  async getData(): Promise<CryptoData[]> {
    try {
      const response = await fetch(this.getMarketAPI());
      if (!response.ok) {
        throw new Error(`Error fetching market data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getCryptoData(crypto: string, days: number = 30): Promise<{prices: [number, number][], total_volumes: [number, number][], market_caps: [number, number][]}> {
    try {
      const response = await fetch(this.getCryptoDataAPI(crypto, days));
      if (!response.ok) {
        throw new Error(`Error fetching crypto data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
