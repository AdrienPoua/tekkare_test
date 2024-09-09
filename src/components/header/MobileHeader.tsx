import { Menu, User, Home, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import ToggleButton from "./ToggleBtn";

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-16 bg-background flex items-center justify-between px-4 border-b border-accent shadow-md">
      {/* Left Section: Menu Icon */}
      <Button 
        variant="ghost" 
        className="p-2 rounded-full hover:bg-muted"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu className="w-6 h-6 text-accent" />
      </Button>

      {/* Center Section: Home Button */}
      <Button 
        variant="ghost" 
        className="rounded-full bg-accent p-4 border-2 border-background shadow-lg hover:scale-110 transition-transform"
      >
        <Link to="/">
          <Home className="w-6 h-6 text-background" />
        </Link>
      </Button>

      {/* Right Section: User Icon or Settings */}
      <div className="flex items-center gap-4">
        <ToggleButton />
      </div>

      {/* Collapsible Menu */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-background shadow-lg flex flex-col gap-4 py-4 px-6">
          <Link to="/settings" className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" />
            <span className="text-text">Settings</span>
          </Link>
          <Link to="/user" className="flex items-center gap-2">
            <User className="w-5 h-5 text-accent" />
            <span className="text-text">Profile</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
