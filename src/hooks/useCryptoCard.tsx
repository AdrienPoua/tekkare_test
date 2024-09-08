import { useQuery } from "@tanstack/react-query"
import FetchAPI from "../utils/services/FetchAPI"
import useKPI from "./useKPI"
import useCurrency from "./useCurrency"

const MOCKED_DATA = [
    {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        "current_price": 54361,
        "market_cap": 1074157265152,
        "market_cap_rank": 1,
        "fully_diluted_valuation": 1142070544463,
        "total_volume": 17693851505,
        "high_24h": 54815,
        "low_24h": 53836,
        "price_change_24h": 393.31,
        "price_change_percentage_24h": 0.72879,
        "market_cap_change_24h": 8220206123,
        "market_cap_change_percentage_24h": 0.77117,
        "circulating_supply": 19751234.0,
        "total_supply": 21000000.0,
        "max_supply": 21000000.0,
        "ath": 73738,
        "ath_change_percentage": -26.26508,
        "ath_date": "2024-03-14T07:10:36.635Z",
        "atl": 67.81,
        "atl_change_percentage": 80081.99512,
        "atl_date": "2013-07-06T00:00:00.000Z",
        "roi": null,
        "last_updated": "2024-09-08T04:49:35.127Z"
    }
]

export default function useCryptoCard() {
    const { currency } = useCurrency()
    const fetchAPI = new FetchAPI(currency, 10)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['data', currency],
        queryFn: () => fetchAPI.getData(),
        staleTime: 60000,
    });

    const { getTopTraded } = useKPI(data)
    const topTraded = getTopTraded()
    return {
        topTraded,
        data,
        isLoading,
        isError,
        MOCKED_DATA,
        fetchAPI
    }
}