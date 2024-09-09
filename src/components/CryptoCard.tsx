"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CryptoGlobal } from "../utils/types/API";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FetchAPI from "../utils/services/FetchAPI";
import { useQuery } from "@tanstack/react-query";
import ChartGraph from "./charts/LinearChart";
import Charts from "../utils/services/Charts";
import Loading from "./Loading";

// CryptoCard component: Displays crypto price, graph, and other key information
export default function CryptoCard({ data, fetchAPI, period }: Readonly<{ data: CryptoGlobal, fetchAPI: FetchAPI, period: number }>) {
  const currency = fetchAPI.devise === "eur" ? "€" : "$";

  // Fetch crypto data using react-query
  const { data: cardData, isLoading, isError } = useQuery({
    queryKey: ['cryptoData', data.id],
    queryFn: () => fetchAPI.getCryptoData(data.id.toLowerCase(), period),
    staleTime: 600000, // Cache for 10 minutes due to API limitations
  });

  // Handle loading state
  if (isLoading) return <Loading />;
  if (isError) return <ErrorState />;
  if (!cardData) return <Loading />;

  // Data formatting
  const formattedData = Charts.formatDataForLinearChart(cardData.prices);
  const isPositive = data.price_change_percentage_24h > 0;

  return (
    <Card className="flex flex-col lg:flex-row p-4 gap-4 shadow-lg border border-muted rounded-lg hover:shadow-xl transition-shadow">

      {/* Header Section: Crypto Image and Name */}
      <CardHeader className="flex flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={data.image} alt={data.name} />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold text-gray-800">{data.name}</CardTitle>
          <CardDescription className="uppercase text-gray-500">{data.symbol}</CardDescription>
        </div>
      </CardHeader>

      {/* Chart Section */}
      <div className="grow relative w-full min-w-[250px]">
        <ChartGraph data={formattedData} />
      </div>

      {/* Footer Section: Price and Percentage Change */}
      <CardFooter className="flex flex-col justify-center items-start shrink-0 ">
        <div className="text-xl font-bold flex text-gray-900 me-2">
          <span>{parseFloat(data.current_price.toFixed(2))} </span>
          <span> {currency}</span>
        </div>
        <div className={`flex items-center gap-1 text-lg font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
          <span>{parseFloat(data.price_change_percentage_24h.toFixed(2))}%</span>
          {isPositive ? <ArrowUpIcon className="w-5 h-5" /> : <ArrowDownIcon className="w-5 h-5" />}
        </div>
      </CardFooter>
    </Card>
  );
}

// Error State component
const ErrorState = () => (
  <div className="flex justify-center items-center w-full h-full">
    <p className="text-red-500">Error loading data</p>
  </div>
);
