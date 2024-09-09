import { TPortfolio } from "../types/Portfolio";
import MockedGlobal from "../../data/mockedGlobal.json";
import { EUR_USD } from "../magicNumber";
import { CryptoAsset } from "../types/Portfolio";

export default class Portfolio {
  private readonly _portfolio: TPortfolio;
  constructor(portfolioData: TPortfolio) {
    this._portfolio = portfolioData;
  }

  get portfolio() {
    return this._portfolio;
  }

  getEstimatedBalanceInUsd() {
    return this.portfolio.reduce((total, coin) => total + coin.current_price * coin.quantity, 0);
  }

  getTotalPortfolioProfit() {
    return this.portfolio.reduce((total, coin) => total + coin.price_change_percentage_24h * coin.quantity, 0);
  }

  getTotalPortfolioProfitPercentage() {
    return (this.getTotalPortfolioProfit() / this.getEstimatedBalanceInUsd()) * 100;
  }

  getEstimatedBalanceInEur() {
    return this.getEstimatedBalanceInUsd() * EUR_USD;
  }

  getEstimatedBalanceInBtc() {
    const bitcoin = MockedGlobal?.find((coin) => coin.id === "bitcoin");
    return bitcoin ? this.getEstimatedBalanceInUsd() / bitcoin.current_price : NaN;
  }

  getDailyPnlPortfolio() {
    return this.portfolio.reduce((total, coin) => total + coin.total_value * (coin.price_change_percentage_24h / 100), 0);
  }

  ShareOfCrypto(crypto: CryptoAsset) {
    return crypto.percentage_of_portfolio;
  }

  getSectors() {
    return this.portfolio.reduce<string[]>((acc, coin) => {
      if (!acc.includes(coin.sector)) {
        acc.push(coin.sector);
      }
      return acc;
    }, []);
  }

  getSectorsPercentage(sector: string) {
    return this.portfolio.reduce((acc, coin) => {
      if (coin.sector === sector) {
        acc += coin.percentage_of_portfolio;
      }
      return acc;
    }, 0);
  }
}
