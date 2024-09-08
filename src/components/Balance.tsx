import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import usePortfolio from "../hooks/usePortfolio"
import { ArrowUp, ArrowDown } from "lucide-react"
import ChartGraph from "./charts/LinearChart"
import mockedCrypto from "../data/mockedCrypto.json"
import Charts from "../utils/services/Charts"
import { TChartData } from "../utils/types/Charts"

export default function Balance() {
    const { balanceValuePrivate, currentCurrencySymbol, dailyPNL, privateMode } = usePortfolio()
    const positivePnl = dailyPNL > 0
    const formatedData = Charts.formatData(mockedCrypto.prices as TChartData[])
    return (
        <div className="flex w-full justify-between items-center border-2 border-accent rounded-xl px-10 py-5">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold ">Estimated Balance</h2>
                <p className="font-bold tracking-wide text-xl text-center"> {balanceValuePrivate} {currentCurrencySymbol} </p>
                <div className="flex gap-2 justify-center">
                    <p> Today‘s PnL </p>
                    <InfoTooltip />
                    <div className="flex items-center gap-1">
                        <p className={positivePnl ? "text-green-500" : "text-red-500"}> {dailyPNL} </p>
                        {!privateMode && (positivePnl ? <ArrowUp className="text-green-500" /> : <ArrowDown className="text-red-500" />)}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                    <Button className="rounded-xl">
                        Withdraw
                    </Button>
                    <Button className="rounded-xl">
                        Deposit
                    </Button>
                    <Button className="rounded-xl">
                        Transfert
                    </Button>
                </div>
                <div className="relative w-full min-w-40 h-40">
                    <ChartGraph data={formatedData}    />
                </div>
            </div>
        </div>
    )
}


const InfoTooltip = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger> <Info />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Profit or Loss for today</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
