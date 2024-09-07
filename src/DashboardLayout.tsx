import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useDeviceType from "./contexts/breakpoints";
import cslx from "clsx";

export default function DashboardLayout() {
  const device = useDeviceType();
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Aside />
      <div className={cslx('flex flex-col flex-1', device === 'desktop' && 'ml-20')}>
        <Header />
        <main className="flex flex-1 justify-center items-center bg-red-500">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
