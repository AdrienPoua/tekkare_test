import { useLocation, Link } from 'react-router-dom';
import { Home, Box, ShoppingCart, Gift, Settings, User, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import usePrivateMode from '../../hooks/usePrivateMode';
import { Button } from '../ui/button';

/**
 * MobileAside: Renders the mobile bottom navigation bar with navigation links and settings options.
 */
export default function MobileAside() {
  const [open, setOpen] = useState(false);
  // Close settings menu when clicking outside
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (open && e.target instanceof HTMLElement && !e.target.closest('.settings-menu')) {
        setOpen(false);
      }
    };
    document.addEventListener('click', clickOutside);
    return () => document.removeEventListener('click', clickOutside);
  }, [open]);

  return (
    <aside className="fixed inset-x-0 bottom-0 w-full h-24 flex bg-background z-20 shadow-lg">
      <nav className="flex justify-around w-full items-center relative">

        {/* First two navigation buttons */}
        <div className="flex gap-6">
          <NavLinkItem href="/assets" icon={Box} />
          <NavLinkItem href="/orders" icon={ShoppingCart} />
        </div>

        {/* Center Home button with emphasis */}
        <Button
          variant="ghost"
          className="absolute -top-8 w-16 h-16 rounded-full shadow-lg transform scale-110 bg-background p-4 border-2 border-accent "
        >
          <Link to="/">
            <Home className="w-6 h-6 text-accent" />
          </Link>
        </Button>


        {/* Last two navigation buttons */}
        <div className="flex gap-6">
          <NavLinkItem href="/rewards" icon={Gift} />
          <>
            <Button variant="ghost" onClick={() => setOpen((prev) => !prev)}>
              <Settings />
            </Button>
            {open && <SettingsDropdown />}
          </>
        </div>
      </nav>
    </aside>
  );
}

/**
 * NavLinkItem: Renders an individual navigation link with an icon and applies active state.
 */
const NavLinkItem = ({ href, icon: Icon, customClass = "" }: { href: string; icon: React.ElementType, customClass?: string }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Button variant="ghost" className="p-2 rounded-full hover:bg-muted transition-colors">
      <Link to={href} className={clsx(isActive ? 'text-accent' : 'text-muted', customClass)}>
        <Icon className="w-6 h-6" />
      </Link>
    </Button>
  );
};




export function SettingsDropdown() {
  const { setPrivateMode } = usePrivateMode();

  return (
    <div className="settings-menu flex flex-col absolute top-[-159px] py-4 px-6 gap-4 bg-background rounded-xl shadow-xl w-56 z-30 transition-all">
      {/* NavLinkItem for Settings */}
      <div className="flex items-center gap-3">
        <NavLinkItem href="/settings" icon={Settings} />
        <span className="text-text">Settings</span>
      </div>

      {/* NavLinkItem for User */}
      <div className="flex items-center gap-3">
        <NavLinkItem href="/user" icon={User} />
        <span className="text-text">User</span>
      </div>

      {/* Private Mode Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPrivateMode((prev) => !prev)}
          className="flex items-center gap-2 hover:text-accent transition-colors"
        >
          <EyeOff className="text-text" />
          <span>Private Mode</span>
        </button>
      </div>
    </div>
  );
}
