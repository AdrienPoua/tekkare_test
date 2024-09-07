import { useLocation, Link } from 'react-router-dom';
import { Home, Box, ShoppingCart, Gift, Settings, User, EyeOff } from 'lucide-react'; // Adjust imports as necessary
import clsx from 'clsx';
import NavItem from '../NavItem';
import { useState, useEffect } from 'react';
import usePrivateMode from '../../hooks/usePrivateMode';

export default function MobileAside() {
    const [open, setOpen] = useState(false);
    const { setPrivateMode } = usePrivateMode();
    const handlePrivateMode = () => {
        setPrivateMode((prev) => !prev);
    }

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && !e.target.contains(document.querySelector('.tooltip-content'))) {
                setOpen(false);
            }
        }
        document.addEventListener('click', clickOutside);
        return () => document.removeEventListener('click', clickOutside);
    }, []);
    return (
        <aside className="fixed inset-x-0 bottom-0 w-full h-20 flex bg-background z-10">
            <nav className="flex justify-around w-full items-center relative">
                {/******************************************
                     *        first 2 buttons           *
                     ******************************************/}
                <div className="flex gap-5">
                    <NavLinkItem to="/assets" icon={Box} />
                    <NavLinkItem to="/orders" icon={ShoppingCart} />
                </div>
                {/******************************************
                     *         HOME BUTTON            *
                     ******************************************/}
                <div className="absolute -top-10 rounded-full overflow-hidden transform scale-150">
                    <NavLinkItem to="/" icon={Home} />
                </div>
                {/******************************************
                     *        last 2 buttons           *
                     ******************************************/}
                <div className="flex gap-5">
                    <NavLinkItem to="/rewards" icon={Gift} />
                    <NavItem name="settings" >
                        <button className='text-text' onClick={() => setOpen((prev) => !prev)}>
                            <Settings />
                        </button>
                        {open &&
                            <div className='flex flex-col absolute -top-52 py-5 px-3 gap-5 bg-background rounded-t-full h-fit w-fit'>
                                <NavLinkItem to="/settings" icon={Settings} />
                                <NavLinkItem to="/user" icon={User} />
                                <NavItem name="settings" >
                                    <button onClick={handlePrivateMode}>
                                        <EyeOff className=" text-text" />
                                    </button>
                                </NavItem>
                            </div>}
                    </NavItem>


                </div>
            </nav>
        </aside >
    );
}


const NavLinkItem = ({ to, icon: Icon }: { to: string; icon: React.ElementType }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <NavItem name={to} className="flex grow" >
            <Link
                to={to}
                className={clsx("text-text w-full h-full flex justify-center items-center",
                    isActive && "text-background"
                )}
            >
                <Icon className="w-10 h-10" />
            </Link>
        </NavItem>
    );
}
