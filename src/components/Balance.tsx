import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import usePortfolio from "../hooks/usePortfolio"
import { ArrowUp, ArrowDown } from "lucide-react"

export default function Balance() {
    const { balanceValuePrivate, currectCurrency, dailyPnl, privateMode } = usePortfolio()
    const positivePnl = parseFloat(dailyPnl) > 0
    return (
        <div className="flex w-full justify-between border-2 border-accent rounded-xl p-4 ">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold ">Estimated Balance</h2>
                <p className="font-bold"> {balanceValuePrivate} {currectCurrency} </p>
                <div className="flex gap-2">
                    <p> Today‘s PnL </p>
                    <InfoTooltip />
                    <div className="flex items-center gap-1">
                        <p className={positivePnl ? "text-green-500" : "text-red-500"}> {dailyPnl} </p>
                        {!privateMode && (positivePnl ? <ArrowUp className="text-green-500" /> : <ArrowDown className="text-red-500" />)}
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
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
