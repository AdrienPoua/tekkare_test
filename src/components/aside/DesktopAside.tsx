import { Link, useLocation, useNavigate } from "react-router-dom";
import DarkAndLightButton from "../DarkAndLightButton";
import {
    Home, ShoppingCart, User, Gift, LogOut, Settings, Box
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import clsx from "clsx";



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



export default function DesktopAside() {
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

