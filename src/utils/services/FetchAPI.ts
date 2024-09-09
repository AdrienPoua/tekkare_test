import { CryptoGlobal } from "../types/API";
import MOCKED_CRYPTO from "../../data/mockedCrypto.json";
import MOCKED_GLOBAL from "../../data/mockedGlobal.json";
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

  async getData(): Promise<CryptoGlobal[]> {
    try {
      const response = await fetch(this.getMarketAPI());
      if (!response.ok) {
        console.error(`Error fetching market data: ${response.statusText}, we exceed the limit of requests, instead i will mock the data`);
        return MOCKED_GLOBAL;
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return MOCKED_GLOBAL;
    }
  }

  async getCryptoData(crypto: string, days: number = 30) {
    try {
      const response = await fetch(this.getCryptoDataAPI(crypto, days));
      if (!response.ok) {
        console.error(`Error fetching crypto data: ${response.statusText}, we exceed the limit of requests, instead i will mock the data`);
        return MOCKED_CRYPTO;
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return MOCKED_CRYPTO;
    }
  }
}
