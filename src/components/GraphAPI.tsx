import { useState } from "react";
import { Button } from "@/components/ui/button";
import CryptoCard from "./CryptoCard";
import useCryptoCard from "../hooks/useCryptoCard";

export default function GraphAPI() {
    const { fetchAPI, topWinners, topLosers, topTraded } = useCryptoCard();
    const [selected, setSelected] = useState<string>("Winners");
    return (
        <div className="flex flex-col gap-4 max-w-[500px">
            <div className="flex flex-row justify-center gap-2 mb- w-full">
                <Button className={` ${selected === "Winners" ? "bg-accent " : ""} rounded-xl`} onClick={() => setSelected("Winners")}>Winners</Button>
                <Button className={` ${selected === "Losers" ? "bg-accent  " : ""} rounded-xl`} onClick={() => setSelected("Losers")}>Losers</Button>
                <Button className={` ${selected === "Traded" ? "bg-accent  " : ""} rounded-xl`} onClick={() => setSelected("Traded")}>Traded</Button>
            </div>
            <div className="flex flex-col w-full">
                {/* Winners */}
                {selected === "Winners" && (
                    <>
                        <h3 className="text-2xl font-bold mb-3 text-center"> Daily Winners</h3>
                        {topWinners.map((data) => (
                            <CryptoCard key={data.id} data={data} fetchAPI={fetchAPI} period={1} />
                            
                        ))}
                    </>
                )}

                {/* Losers */}
                {selected === "Losers" && (
                    <>
                        <h3 className="text-2xl font-bold mb-3 text-center"> Daily Losers</h3>
                        {topLosers.map((data) => (
                            <CryptoCard key={data.id} data={data} fetchAPI={fetchAPI} period={1} />
                            
                        ))}
                    </>
                )}

                {/* Most Traded */}
                {selected === "Traded" && (
                    <>
                        <h3 className="text-2xl font-bold mb-3 text-center"> Daily Traded</h3>
                        {topTraded.map((data) => (
                            
                                <CryptoCard key={data.id} data={data} fetchAPI={fetchAPI} period={1} />
                            
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
