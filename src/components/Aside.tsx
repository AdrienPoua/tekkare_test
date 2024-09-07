import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import DarkAndLightButton from "./DarkAndLightButton";
import {
    Home, ShoppingCart, User, Gift, LogOut, Settings, Box
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import clsx from "clsx";
import useDeviceType from "../contexts/breakpoints";

const links = [
    {
        name: "Dashboard",
        icon: Home,
        href: "/",
    },
    {
        name: "Assets",
        icon: Box,
        href: "/assets",
    },
    {
        name: "Orders",
        icon: ShoppingCart,
        href: "/orders",
    },
    {
        name: "Rewards",
        icon: Gift,
        href: "/rewards",
    },
    {
        name: "Settings",
        icon: Settings,
        href: "/settings",
    },
    {
        name: "Users",
        icon: User,
        href: "/user",
    }
];



function DesktopAside() {
    const isActive = useLocation();
    const navigate = useNavigate();
    return (
        <aside className="fixed inset-y-0 left-0 w-20 flex-col bg-background sm:flex py-[2%]">
            <TooltipProvider>
                <div className="flex flex-col justify-between h-full">
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        {links.map((link) => (
                            <Tooltip key={link.name}>
                                <TooltipTrigger asChild className={clsx(isActive.pathname === link.href && "bg-black")}>
                                    <Link
                                        to={link.href}
                                        className="flex h-12 aspect-square items-center justify-center rounded-full "
                                    >
                                        <link.icon className="h-4 w-4" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {link.name}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </nav>
                    <nav className="flex flex-col items-center gap-8 ">
                        <DarkAndLightButton />
                        <Link to="/user">
                            <User />
                        </Link>
                        <button onClick={() => {
                            navigate("/login");
                        }}>
                            <LogOut />
                        </button>
                    </nav>
                </div>
            </TooltipProvider>
        </aside>
    );
}


export function MobileAside() {
    const location = useLocation();
    const assets = links.find(link => link.name === "Assets")
    const orders = links.find(link => link.name === "Orders")
    const rewards = links.find(link => link.name === "Rewards")
    const settings = links.find(link => link.name === "Settings")
    const users = links.find(link => link.name === "Users")
    if (!assets || !orders || !rewards || !settings || !users) return null;
    return (
        <aside className="fixed inset-x-0 bottom-0 w-full h-20 flex bg-background z-10">

            <TooltipProvider>
                <nav className="flex justify-around w-full items-center relative">


                    {/* Autres liens */}
                    <div className="flex justify-around w-full items-center">
                        <Link
                            key={assets.name}
                            to={assets.href}
                            className={clsx(
                                "flex h-12 w-12 items-center justify-center rounded-full",
                                location.pathname === assets.href && "bg-black text-white"
                            )}
                        >
                            <assets.icon className="h-6 w-6" />
                        </Link>
                        <Link
                            key={orders.name}
                            to={orders.href}
                            className={clsx(
                                "flex h-12 w-12 items-center justify-center rounded-full",
                                location.pathname === orders.href && "bg-black text-white"
                            )}
                        >
                            <orders.icon className="h-6 w-6" />
                        </Link>
                    </div>
                    {/* HOME button  */}
                    <div className="flex justify-center items-center -translate-y-10 bg-background rounded-full ">
                        <Link
                            to="/"
                            className={clsx(
                                "flex h-16 w-16 items-center justify-center rounded-full  border-white shadow-lg",
                                location.pathname === "/" && "bg-gradient-to-b from-black to-background text-white"
                            )}
                        >
                            <Home className="h-8 w-8" />
                        </Link>
                    </div>



                    {/* Suite des liens */}
                    <div className="flex justify-around w-full items-center">
                        <Link
                            key={rewards.name}
                            to={rewards.href}
                            className={clsx(
                                "flex h-12 w-12 items-center justify-center rounded-full",
                                location.pathname === rewards.href && "bg-black text-white"
                            )}
                        >
                            <rewards.icon className="h-6 w-6" />
                        </Link>
                        <ParametersBtn users={users} />
                    </div>

                </nav>
            </TooltipProvider>
        </aside>
    );
}

const ParametersBtn = ({ users }: { users: { name: string, icon: React.ElementType, href: string } }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative flex flex-col-reverse">
            <button onClick={() => {
                setIsOpen((prev) => !prev);
            }}>
                <Settings className="h-6 w-6" />
            </button>
            <div className={clsx(isOpen ? "block" : "hidden", "transition-all duration-300")}>
                <div className={clsx("absolute -top-[300%] bg-background p-5 -translate-x-5")}>
                    <Link to={users.href}>
                        <users.icon className="h-6 w-6" />
                    </Link>
                </div>
                <div className={clsx("absolute -top-[500%] bg-background p-5 rounded-t-full -translate-x-5")}>
                    <Link to={"/settings"}>
                    <Settings className="h-6 w-6" />
                </Link>
            </div>
        </div>
        </div >
    );
}
export default function Aside() {
    const device = useDeviceType();
    return (
        <>
            {device === 'desktop' ? <DesktopAside /> : <MobileAside />}
        </>
    );
}
