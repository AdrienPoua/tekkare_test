import portfolioData from "../data/portfolio.json";
import Portfolio from "@/utils/services/Portofolio";
import useCurrency from "./useCurrency";
import usePrivateMode from "./usePrivateMode";
import { EUR_USD } from "@/utils/magicNumber";

export default function usePortfolio() {
    const { currency } = useCurrency();
    const { setPrivateString, privateMode } = usePrivateMode();

    const portfolio = new Portfolio(portfolioData);

    // Obtenir les estimations en différentes devises
    const balances = {
        usd: portfolio.getEstimatedBalanceInUsd(),
        eur: portfolio.getEstimatedBalanceInEur(),
    };

    // Calcul de la PNL quotidienne
    const dailyPnlRaw = parseFloat(portfolio.getDailyPnlPortfolio().toFixed(2));
    const dailyPNL = currency === "usd"
        ? dailyPnlRaw
        : dailyPnlRaw * EUR_USD;

    // Obtenir la balance actuelle selon la devise
    const balanceValue = balances[currency] || balances.usd;

    // Balance privée
    const balanceValuePrivate = setPrivateString(balanceValue);

    // Symboles des devises
    const currencySymbols = {
        usd: "$",
        eur: "€",
        btc: "BTC"
    };
    const currentCurrencySymbol = currencySymbols[currency] || "$";

    return {
        balanceValuePrivate,
        currency,
        currentCurrencySymbol,
        privateMode,
        dailyPNL
    };
}
