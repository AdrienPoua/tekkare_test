import { Link } from "react-router-dom";
import {
    Home, Package2, ShoppingCart
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const links = [
    {
        name: "Dashboard",
        icon: Home,
        href: "/dashboard"
    },
    {
        name: "Dashboard",
        icon: Home,
        href: "/test"
    },
    {
        name: "Dashboard",
        icon: Home,
        href: "/dashboard"
    },
    {
        name: "Dashboard",
        icon: Home,
        href: "/dashboard"
    },
    {
        name: "Dashboard",
        icon: Home,
        href: "/dashboard"
    },
    {
        name: "Orders",
        icon: ShoppingCart,
        href: "/orders"
    }
]

export default function Aside() {
    return (
        <aside className="fixed inset-y-0 left-0 w-20 flex-col bg-background sm:flex">
            <TooltipProvider>
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        to="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Home</span>
                    </Link>
                    {links.map((link) => (
                        <Tooltip key={link.name}>
                            <TooltipTrigger asChild>
                                <Link
                                    to={link.href}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
            </TooltipProvider>
        </aside>
    );
}
