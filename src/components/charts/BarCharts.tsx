import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartConfig = {
  parameter1: {
    label: "BTC",
    color: "hsl(var(--chart-1))",
  },
  parameter2: {
    label: "ETH",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
  date: string;
  parameter1: number;
  parameter2: number;
};

export default function Chart({ data }: { data: ChartData[] }) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("parameter1");

  const total = React.useMemo(
    () => ({
      parameter1: data.reduce((acc, curr) => acc + curr.parameter1, 0),
      parameter2: data.reduce((acc, curr) => acc + curr.parameter2, 0),
    }),
    [data]
  );

  console.log(total);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Gas fees</CardTitle>
          <CardDescription>
            Showing gas fees fo
          </CardDescription>
        </div>
        <div className="flex">
          {["parameter1", "parameter2"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {Math.round(data.reduce((acc, curr) => acc + curr[chart], 0) / data.length)}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  Average                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
