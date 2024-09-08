
import useCurrency from "../hooks/useCurrency";
import { useQuery } from "@tanstack/react-query";
import FetchAPI from "../utils/services/FetchAPI";
import useKPI from "../hooks/useKPI";
import CryptoCard from "../components/CryptoCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("day")
  const { currency } = useCurrency()
  const fetchAPI = new FetchAPI(currency, 10)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['data', currency],
    queryFn: () => fetchAPI.getData(),
    staleTime: 600000, // du au limitation de l'api je cache les données pour 
  });

  const { getTopTraded } = useKPI(data)

  const topTraded = getTopTraded()
  
  
  
    if (!data || isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
  return (
    <div className="flex size-full">
      <div className="flex flex-col gap-4">
        {topTraded.map((data) => (
          <CryptoCard key={data.id} data={data} fetchAPI={fetchAPI} period={period} />
        ))}
      </div>
    </div>
  );
}
