import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
    ChartContainer, ChartConfig
} from "@/components/ui/chart"



const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig


export default function DailyRanking({ data }: { readonly data: { date: string, value: number }[] }): JSX.Element {
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
                <Line
                    dataKey="value"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={1}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    )
}