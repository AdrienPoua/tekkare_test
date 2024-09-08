import portfolioData from "../data/portfolio.json";
import Portfolio from "@/utils/services/Portofolio";
import useCurrency from "./useCurrency";
import usePrivateMode from "./usePrivateMode";

export default function usePortfolio() {
    const { currency } = useCurrency()
    const { setPrivateString, privateMode } = usePrivateMode()
    const portfolio = new Portfolio(portfolioData);
    const estimatedBalance = portfolio.getEstimatedBalanceInUsd();
    const estimatedBalanceInBtc = portfolio.getEstimatedBalanceInBtc();
    const estimatedBalanceInEur = portfolio.getEstimatedBalanceInEur();
    const dailyPnl = setPrivateString(parseFloat(portfolio.getDailyPnlPortfolio().toFixed(2)))
    const balanceValue = currency === "usd" ? estimatedBalance : currency === "eur" ? estimatedBalanceInEur : estimatedBalanceInBtc
    const balanceValuePrivate = setPrivateString(balanceValue)
    const currectCurrency = currency === "usd" ? "$" : currency === "eur" ? "€" : "BTC"

    return {
        balanceValuePrivate,
        currency,
        currectCurrency,
        dailyPnl,
        privateMode

    }
}