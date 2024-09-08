import { useQuery } from "@tanstack/react-query"
import FetchAPI from "../utils/services/FetchAPI"
import useKPI from "./useKPI"
import useCurrency from "./useCurrency"





export default function useCryptoCard() {
    const { currency } = useCurrency()
    const fetchAPI = new FetchAPI(currency, 10)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['data', currency],
        queryFn: () => fetchAPI.getData(),
        staleTime: 60000,
    });

    const { getTopTraded, getDailyWinners, getDailyLosers } = useKPI(data)
    const topTraded = getTopTraded()
    const topWinners = getDailyWinners()
    const topLosers = getDailyLosers()

    if (isError) {
        console.log(" Le nombres de requetes a coingecko a étés dépassé, c'est limité à 30 ! Dans ce cas la je mock les données")
    }
    return {
        topTraded,
        data,
        isLoading,
        isError,
        topWinners,
        topLosers,
        fetchAPI
    }
}