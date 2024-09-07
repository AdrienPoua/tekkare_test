import { useLocation, Link } from 'react-router-dom';
import { Home, Box, ShoppingCart, Gift, Settings, User } from 'lucide-react'; // Adjust imports as necessary
import clsx from 'clsx';
import { TooltipProvider } from '../ui/tooltip';
import { useState, useEffect } from 'react';
import DarkAndLightButton from '../DarkAndLightButton';

export default function MobileAside() {
    const location = useLocation();

    return (
        <aside className="fixed inset-x-0 bottom-0 w-full h-20 flex bg-background z-10">
            <TooltipProvider>
                <nav className="flex justify-around w-full items-center relative">

                    {/* Links */}
                    <LinkItem to="/assets" icon={Box} active={location.pathname === "/assets"} />
                    <LinkItem to="/orders" icon={ShoppingCart} active={location.pathname === "/orders"} />

                    {/* HOME button */}
                    <div className="flex justify-center items-center -translate-y-10 bg-background rounded-full">
                        <Link
                            to="/"
                            className={clsx(
                                "flex h-16 w-16 items-center justify-center rounded-full border-white shadow-lg",
                                location.pathname === "/" && "bg-gradient-to-b from-black to-background text-white"
                            )}
                        >
                            <Home className="h-8 w-8" />
                        </Link>
                    </div>

                    <LinkItem to="/rewards" icon={Gift} active={location.pathname === "/rewards"} />
                    <ParametersBtn />
                </nav>
            </TooltipProvider>
        </aside>
    );
}

const LinkItem = ({ to, icon: Icon, active }: { to: string; icon: React.ElementType; active: boolean }) => (
    <Link
        to={to}
        className={clsx(
            "flex h-12 w-12 items-center justify-center rounded-full",
            active && "bg-black text-white"
        )}
    >
        <Icon className="h-6 w-6" />
    </Link>
);

const ParametersBtn = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false); // Close the menu on route change
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="relative flex flex-col-reverse">
            <button
                className={clsx(isOpen ? "bg-black" : "bg-background")}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <Settings className="h-6 w-6" />
            </button>
            <div className={clsx(isOpen ? "absolute bg-background -translate-x-5 -translate-y-10 rounded-t-full" : "hidden", "transition - all duration - 300")}>
                <DropdownMenu />
            </div>
        </div >
    );
};

const DropdownMenu = () => (
    <div className='flex flex-col gap-5 justify-center items-center p-3'>
        <Link to="/settings" >
            <Settings className="h-6 w-6" />
        </Link>
        <button>
            <Link to="/user">
                <User className="h-6 w-6" />
            </Link>
        </button>
        <DarkAndLightButton />
    </div>
);
