import GraphAPI from "../components/GraphAPI";
import CircularGraph from "../components/charts/CircularGraph";
import Balance from "@/components/Balance";
import usePortfolio from "@/hooks/usePortfolio";
import BarChart from "@/components/charts/BarCharts";
import gasfeesData from "@/data/gasfees.json"
import useDeviceType from "../hooks/useDeviceType";
export default function Home() {
  const isMobile = useDeviceType() === 'mobile'
  const { CircularGraphData } = usePortfolio()
  const barChartData = gasfeesData.map((gasfee) => ({ date: gasfee.date, parameter1: gasfee.BTC, parameter2: gasfee.ETH }))
  return (
    <div className="flex flex-col w-full gap-6 p-4">
      <Balance />
      <div className={`flex gap-20 ${isMobile ? 'flex-col' : ''} justify-around`}>
        <GraphAPI />
        <CircularGraph data={CircularGraphData} />
        <BarChart data={barChartData} />
      </div>
    </div>
  );
}

