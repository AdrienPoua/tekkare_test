import { Outlet } from "react-router-dom";
import Aside from "./components/aside";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useDeviceType from "./hooks/useDeviceType";
import cslx from "clsx";
export default function DashboardLayout() {
  const device = useDeviceType();
  return (
    <div className="flex min-h-screen flex-col">
      <Aside />
      <div className={cslx('flex flex-col flex-1', device === 'desktop' && `ml-[100px]`)}>
      <Header />
        <main className="flex flex-1 p-8 bg-background">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
