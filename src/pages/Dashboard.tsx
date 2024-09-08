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

