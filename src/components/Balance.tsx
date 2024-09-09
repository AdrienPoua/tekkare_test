import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import usePortfolio from "../hooks/usePortfolio";
import { ArrowUp, ArrowDown, Info } from "lucide-react";
import ChartGraph from "./charts/LinearChart";
import mockedCrypto from "../data/mockedCrypto.json";
import Charts from "../utils/services/Charts";
import { TChartData } from "../utils/types/Charts";

export default function Balance() {
    const { balanceValuePrivate, currentCurrencySymbol, dailyPNL, privateMode } = usePortfolio();
    const positivePnl = dailyPNL > 0;
    const formatedData = Charts.formatDataForLinearChart(mockedCrypto.prices as TChartData[]);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center border-2 border-accent rounded-xl p-8 shadow-lg gap-6 transition-all hover:shadow-2xl">

            {/* Balance Information */}
            <BalanceInfo
                balance={balanceValuePrivate}
                currencySymbol={currentCurrencySymbol}
                dailyPNL={dailyPNL}
                positivePnl={positivePnl}
                privateMode={privateMode}
            />
            {/* Action Buttons & Chart */}
            <div className="flex flex-col items-center md:items-end gap-6">
                <ActionButtons />
                <div className="relative w-full h-40 min-w-[250px]">
                    <ChartGraph data={formatedData} />
                </div>
            </div>
        </div>
    );
}

const BalanceInfo = ({ balance, currencySymbol, dailyPNL, positivePnl, privateMode }: {
    balance: string;
    currencySymbol: string;
    dailyPNL: number;
    positivePnl: boolean;
    privateMode: boolean;
}) => {
    return (
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h2 className="text-3xl font-extrabold text-accent">Balance Overview</h2>
            <p className="text-4xl font-bold tracking-tight">
                {balance} {currencySymbol}
            </p>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium text-gray-600">Today‘s PnL</p>
                <InfoTooltip />
                <div className="flex items-center gap-2">
                    <p className={`text-xl font-semibold ${positivePnl ? "text-green-500" : "text-red-500"}`}>
                        { !privateMode && dailyPNL}
                    </p>
                    {!privateMode && (
                        positivePnl ? <ArrowUp className="text-green-500 w-6 h-6" /> : <ArrowDown className="text-red-500 w-6 h-6" />
                    )}
                </div>
            </div>
        </div>
    );
};

const ActionButtons = () => (
    <div className="flex flex-wrap gap-4">
        <Button className="bg-accent text-background text-xl font-semibold ">
            Withdraw
        </Button>
        <Button className="bg-accent text-background text-xl font-semibold">
            Deposit
        </Button>
        <Button className="bg-accent text-background text-xl font-semibold">
            Transfer
        </Button>
    </div>
);


const InfoTooltip = () => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <Info className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </TooltipTrigger>
            <TooltipContent className="text-xs bg-accent text-background">
                <p>Profit or Loss for today</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);
