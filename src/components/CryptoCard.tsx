"use client"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CryptoGlobal } from "../utils/types/API"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import {
  Card, CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import FetchAPI from "../utils/services/FetchAPI"
import { useQuery } from "@tanstack/react-query"





const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function CryptoCard({ data, fetchAPI, period }: Readonly<{ data: CryptoGlobal, fetchAPI: FetchAPI, period: number }>) {
  const currency = fetchAPI.devise === "eur" ? "€" : "$"

  const { data: cardData, isLoading, isError } = useQuery({
    queryKey: ['data', data.id],
    queryFn: () => fetchAPI.getCryptoData(data.id.toLowerCase(), period),
    staleTime: 6000000, // du au limitation de l'api je cache pour 10 mins
  });

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (!cardData) return <div>No data</div>

  const { prices } = cardData
  const formatedData = prices.map((price) => {
    const currentTimeStamp = price[0]
    const currentPrice = price[1]
    const date = new Date(currentTimeStamp)
    const hours = date.getHours()
    const formattedDate = `${hours}H`
    return {
      date: formattedDate,
      value: currentPrice
    }
  })
const isPositive = data.price_change_percentage_24h > 0
  return (
    <Card className="flex p-2">
      <CardHeader className="flex flex-row gap-2 items-center justify-center flex-shrink-1 ">
        <Avatar>
          <AvatarImage src={data.image} alt={data.name} />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-text">{data.name}</CardTitle>
          <CardDescription className="text-text">{data.symbol.toUpperCase()}</CardDescription>
        </div>
      </CardHeader>
      <div className="grow relative w-full min-w-40">
        <Chart data={formatedData} />
      </div>
      <CardFooter className="flex-col items-start justify-center gap-2 flex-shrink-1">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-text text-nowrap">
            {data.current_price} {currency}
          </div>
          <div className={isPositive ? "text-green-500" : "text-red-500"}>
            <div className="flex flex-row gap-2 justify-end">
              <div>{parseFloat(data.price_change_percentage_24h.toFixed(2))}%</div>
              <div>{isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}</div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

const Chart = ({ data }: { data: { date: string, value: number }[] }) => {
  return (
    <ChartContainer config={chartConfig} className="absolute inset-0 size-full -translate-x-5 translate-y-4">
      <LineChart
        accessibilityLayer
        data={data}
      >
        <CartesianGrid vertical={false} horizontal={false} />
        <YAxis
          domain={[Math.min(...data.map(data => data.value)), Math.max(...data.map(data => data.value))]}
          tick={false}
          axisLine={false}
          tickLine={false}
        />
        <XAxis
          dataKey="date"
          tick={false}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="value" // Clé correcte pour la ligne
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={1}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}