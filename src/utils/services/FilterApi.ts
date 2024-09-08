import { CryptoGlobal } from "../types/API";

export class FilterApi {
  static dailyWinners(data: CryptoGlobal[]) {
    return data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5);
  }

  static dailyLosers(data: CryptoGlobal[]) {
    return data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5);
  }

  static dailyMostTraded(data: CryptoGlobal[]) {
    return [...data] // Clone le tableau pour éviter la mutation
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 5);
  }
}
