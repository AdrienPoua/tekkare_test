import { useState } from "react";
import { Button } from "@/components/ui/button";
import CryptoCard from "./CryptoCard";
import useCryptoCard from "../hooks/useCryptoCard";

export default function GraphAPI() {
  const { fetchAPI, topWinners, topLosers, topTraded } = useCryptoCard();
  const [selected, setSelected] = useState<string>("Winners");

  // Mapping selected categories to corresponding data
  const categories = {
    Winners: {
      title: "Daily Winners",
      data: topWinners,
    },
    Losers: {
      title: "Daily Losers",
      data: topLosers,
    },
    Traded: {
      title: "Most Traded",
      data: topTraded,
    },
  };

  return (
    <div className="flex flex-col gap-4 max-w-[500px]">
      {/* Navigation Buttons */}
      <div className="flex flex-row justify-center gap-2 mb-4 w-full">
        {Object.keys(categories).map((category) => (
          <Button
            key={category}
            variant="outline"
            className={`${
              selected === category && "bg-accent"
            } px-5 py-5 transition-colors hover:bg-accent text-xl hover:text-white`}
            onClick={() => setSelected(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Selected Category Content */}
      <div className="flex flex-col w-full">
        <h3 className="text-2xl font-bold mb-3 text-center">
          {categories[selected as keyof typeof categories].title}
        </h3>
        <div className="flex flex-col gap-4">
          {categories[selected as keyof typeof categories].data.map((data) => (
            <CryptoCard
              key={data.id}
              data={data}
              fetchAPI={fetchAPI}
              period={1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
