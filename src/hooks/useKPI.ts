import { CryptoData } from "../utils/types/API";
import { FilterApi } from "../utils/services/FilterApi";

export default function useKPI(data: CryptoData[] | undefined) {
  if (!data)
    return {
      getTopTraded: () => [],
      getDailyWinners: () => [],
      getDailyLosers: () => [],
    };

  const getTopTraded = () => {
    return FilterApi.dailyMostTraded(data);
  };

  const getDailyWinners = () => {
    return FilterApi.dailyWinners(data);
  };

  const getDailyLosers = () => {
    return FilterApi.dailyLosers(data);
  };

  return { getTopTraded, getDailyWinners, getDailyLosers };
}
