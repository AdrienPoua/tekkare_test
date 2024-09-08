import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DarkAndLightButton from "../DarkAndLightButton";
import { LogOut, User } from "lucide-react";
import { links } from "../../data/navigation";
import clsx from "clsx";
import NavItem from "../NavItem";

const NavLinkItem = (item: { name: string, href: string, icon: React.ElementType }) => {
    const isActive = useLocation().pathname === item.href;
    return (
        <NavItem name={item.name} >
            <NavLink to={item.href} className={clsx(isActive && 'bg-secondary')}>
                <item.icon />
            </NavLink>
        </NavItem>
    );
}

export default function DesktopAside() {
    const navigate = useNavigate();
    return (
        <aside className={`fixed flex inset-y-0 left-0 flex-col bg-background py-[100px] justify-between w-[100px] grow border-r-2 border-accent`}>
            <div className="flex flex-col justify-between grow">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 ">
                    {links.map((link) => <NavLinkItem key={link.name} {...link} />)}
                </nav>
                <nav className="flex flex-col items-center gap-3 ">
                    <NavLinkItem name="Profile" href="/user" icon={User} />
                    <NavItem name="Dark Mode">
                        <div>
                            <DarkAndLightButton />
                        </div>
                    </NavItem>
                    <NavItem name="Logout">
                        <button onClick={() => {
                            navigate("/login");
                        }}>
                            <LogOut />
                        </button>
                    </NavItem>
                </nav>
            </div>
        </aside>
    );
}

