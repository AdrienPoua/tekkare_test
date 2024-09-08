import { CryptoData } from "../types/API";

export class FilterApi {
  static dailyWinners(data: CryptoData[]) {
    return data
      .filter((crypto) => crypto.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 5);
  }

  static dailyLosers(data: CryptoData[]) {
    return data
      .filter((crypto) => crypto.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 5);
  }
  static dailyMostTraded(data: CryptoData[]) {
    return [...data] // Clone le tableau pour éviter la mutation
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 5);
  }
}
