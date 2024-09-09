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

// Helper function to calculate the average for any parameter
const calculateAverage = (data: ChartData[], param: keyof typeof chartConfig) => {
  return Math.round(data.reduce((acc, curr) => acc + curr[param], 0) / data.length);
};

export default function Chart({ data }: { readonly data: readonly ChartData[] }) {
  // State to track which chart is active
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("parameter1");

  // Helper function to render buttons dynamically
  const renderButtons = React.useCallback(() => {
    return Object.keys(chartConfig).map((key) => {
      const chart = key as keyof typeof chartConfig;
      const average = calculateAverage([...data], chart);

      return (
        <button
          key={chart}
          data-active={activeChart === chart}
          className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 transition-all"
          onClick={() => setActiveChart(chart)}
        >
          <span className="text-xs text-muted-foreground">
            {chartConfig[chart].label}
          </span>
          <span className="text-lg font-bold leading-none sm:text-3xl">
            {average}
          </span>
          <span className="text-sm font-medium sm:text-lg">Average</span>
        </button>
      );
    });
  }, [activeChart, data]);

  return (
    <Card>
      {/* Header */}
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-3xl font-bold">Gas Fees</CardTitle>
          <CardDescription className="text-xl">
            Showing gas fees for BTC and ETH
          </CardDescription>
        </div>
        {/* Chart selection buttons */}
        <div className="flex">{renderButtons()}</div>
      </CardHeader>

      {/* Chart Content */}
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={[...data]}
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
            {/* Tooltip for chart */}
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
            {/* Dynamic bar chart with active parameter */}
            <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
