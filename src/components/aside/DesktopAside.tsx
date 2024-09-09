import { useLocation, useNavigate, Link } from "react-router-dom";
import DarkAndLightButton from "../DarkAndLightButton";
import { LogOut, User } from "lucide-react";
import { links } from "../../data/navigation";
import clsx from "clsx";
import { Button } from "../ui/button";

/**
 * DesktopAside: Sidebar for desktop view with navigation links, theme toggle, and logout button.
 */
export default function DesktopAside() {
  const navigate = useNavigate();

  return (
    <aside className="fixed inset-y-0 left-0 flex flex-col justify-between py-[100px] w-[100px] bg-background border-r-2 border-accent">
      <div className="flex flex-col justify-between grow">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {links.map((link) => (
            <NavLinkItem key={link.name} {...link} />
          ))}
        </nav>
        <nav className="flex flex-col items-center gap-3">
          <NavLinkItem href="/user" icon={User} />
          <DarkAndLightButton />
          <Button variant="ghost" onClick={() => navigate("/login")}>
            <LogOut className="text-text" />
          </Button>
        </nav>
      </div>
    </aside>
  );
}

/**
 * Renders individual navigation items with icons and highlights the active route.
 */
const NavLinkItem = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  return (
    <Button variant="ghost">
      <Link to={href} className={clsx(isActive && 'text-accent')}>
        <Icon className="w-6 h-6" />
      </Link>
    </Button>
  );
};
