import useCryptoCard from "../hooks/useCryptoCard";
import { useState } from "react";
import GraphAPI from "../components/GraphAPI";
import CircularGraph from "../components/CircularGraph";
import Balance from "@/components/Balance";

export default function Home() {

  return (
    <div className="flex flex-col w-full gap-6 p-4">
      <Balance />
      <GraphAPI />
      <CircularGraph />
    </div>
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
