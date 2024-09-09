"use client"

import { Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with an active sector"


const chartConfig = {
  defi: {
    label: "Store of Value",
    color: "hsl(var(--chart-1))",
  },
  layer2: {
    label: "Layer 2",
    color: "hsl(var(--chart-2))",
  },
  gaming: {
    label: "Gaming",
    color: "hsl(var(--chart-3))",
  },
  ai: {
    label: "AI",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "DeFi",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

type TData = {
  name: string,
  value: number,
};

const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

export default function CircularGraph({ data }: { data: TData[] }) {
  const coloredData = data.map((item, index) => ({ ...item, fill: colors[index] }))
  
  const date = new Date()
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate()
  const year = date.getFullYear()

  return (
    <Card className="flex flex-col h-fit py-10 self-end min-w-[300px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Portfolio distribution</CardTitle>
        <CardDescription>{day} {month} {year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart className="relative">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={coloredData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
