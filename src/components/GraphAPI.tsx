import { useState } from "react";
import { Button } from "@/components/ui/button";
import CryptoCard from "./CryptoCard";
import useCryptoCard from "../hooks/useCryptoCard";

export default function GraphAPI() {
    const { fetchAPI, topWinners, topLosers, topTraded } = useCryptoCard();
    const [selected, setSelected] = useState<string>("Winners");
    return (
        <>
            <div className="flex flex-row justify-center gap-2 mb- w-full">
                <Button className={` ${selected === "Winners" ? "bg-accent " : ""} rounded-xl`} onClick={() => setSelected("Winners")}>Winners</Button>
                <Button className={` ${selected === "Losers" ? "bg-accent  " : ""} rounded-xl`} onClick={() => setSelected("Losers")}>Losers</Button>
                <Button className={` ${selected === "Traded" ? "bg-accent  " : ""} rounded-xl`} onClick={() => setSelected("Traded")}>Traded</Button>
            </div>

            {/* Content for Winners, Losers, and Traded */}
            <div className="flex w-full gap-6">
                {/* Winners */}
                {selected === "Winners" && (
                    <Cols name="Top 5 Winners">
                        {topWinners.map((data) => (
                            <CryptoCard key={data.id} data={data} fetchAPI={fetchAPI} period={1} />
                        ))}
                    </Cols>
                )}

                {/* Losers */}
                {selected === "Losers" && (
                    <Cols name="Top 5 Losers">
                        {topLosers.map((data) => (
                            <CryptoCard key={data.id} data={data} fetchAPI={fetchAPI} period={1} />
                        ))}
                    </Cols>
                )}

                {/* Most Traded */}
                {selected === "Traded" && (
                    <Cols name="Top 5 Traded">
                        {topTraded.map((data) => (
                            <CryptoCard key={data.id} data={data} fetchAPI={fetchAPI} period={1} />
                        ))}
                    </Cols>
                )}
            </div>
        </>
    );
}

// Cols component for displaying lists of CryptoCards
const Cols = ({ children, name }: { children: React.ReactNode, name: string }) => {
    return (
      <div className="flex flex-col w-full max-w-[500px]">
        {children}
        <h2 className="text-2xl font-bold text-center mb-4 text-text">{name}</h2>
      </div>
    );
  };