
import CryptoCard from "../components/CryptoCard";
import useCryptoCard from "../hooks/useCryptoCard";

export default function Home() {
  const { MOCKED_DATA, fetchAPI } = useCryptoCard()


  return (
    <div className="flex size-full">
      <div className="flex flex-col w-10">
        <Cols>
        {MOCKED_DATA.map((data) => (
          <CryptoCard key={data.id} data={data} fetchAPI={fetchAPI} period={1} />
        ))}
        </Cols>
      </div>
    </div>
  );
}

const Cols  = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-[500px]">
      {children}
    </div>
  )
}