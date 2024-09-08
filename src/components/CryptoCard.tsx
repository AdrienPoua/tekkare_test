"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CryptoData } from "../utils/types/API"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import FetchAPI from "../utils/services/FetchAPI"
import { useQuery } from "@tanstack/react-query"

export const description = "A line chart"

const chartData =
  [
    {
      "date": "10:20",
      "value": 114.61589505642618
    },
    {
      "date": "10:25",
      "value": 114.5111435586875
    },
    {
      "date": "10:31",
      "value": 114.92902695900712
    },
  ]


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function CryptoCard({ data, fetchAPI, period }: Readonly<{ data: CryptoData, fetchAPI: FetchAPI, period: "day" | "week" | "month" | "year" }>) {
  const days = period === "day" ? 1 : period === "week" ? 7 : period === "month" ? 30 : 365

  const { data: cardData, isLoading, isError } = useQuery({
    queryKey: ['data', data.id],
    queryFn: () => fetchAPI.getCryptoData(data.id.toLowerCase(), days),
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


  console.log(formatedData)



  return (
    <Card className="bg-primary">
      <CardHeader className="flex flex-row gap-2 items-center justify-center">
        <Avatar>
          <AvatarImage src={data.image} alt={data.name} />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-text">{data.name}</CardTitle>
          <CardDescription className="text-text">{data.current_price} {fetchAPI.devise}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={formatedData} // Utilise les données formatées provenant de l'API
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              domain={[Math.min(...formatedData.map(data => data.value)), Math.max(...formatedData.map(data => data.value))]}  // Définit les limites de l'axe Y selon les données
              tickLine={false}
              axisLine={false}
            />
            <XAxis
              dataKey="date" // Clé correcte pour l'axe X
              tickLine={false}
              axisLine={true}
              tickMargin={5}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value" // Clé correcte pour la ligne
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>

        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
