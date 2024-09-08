import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCurrency from "../hooks/useCurrency";
import { useQuery } from "@tanstack/react-query";
import FetchAPI from "../utils/services/FetchAPI";
import useKPI from "../hooks/useKPI";

export default function Home() {
  const { currency } = useCurrency()
  const { data } = useQuery({
    queryKey: ['data', currency],
    queryFn: () => fetchAPI.getData()
  });
  const fetchAPI = new FetchAPI(currency, 10)
  const { getTopTraded } = useKPI(data)


  if (!data) return <div>Loading...</div>
  const topTraded = getTopTraded()


  return (
    <div className="flex size-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Home</CardTitle>
          <CardDescription>{topTraded.map((crypto) => crypto.name)}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
