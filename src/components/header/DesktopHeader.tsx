import usePrivateMode from "../../hooks/usePrivateMode"
import { useLocation } from "react-router-dom"
import { EyeOff, Eye } from "lucide-react"
import ToggleButton from "./ToggleBtn"
import User from "./User"
import { userData } from "../../data/user"
import Underline from "../Underline"
import Logo from "../Logo"
export default function DesktopHeader() {
    const pathname = useLocation().pathname.slice(1);
    const title = pathname.charAt(0).toUpperCase() + pathname.slice(1) || 'Dashboard'
    return (
        <header className="h-[102px] px-[5%] bg-background border-b-2 border-accent shadow-xl flex justify-between">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <Logo />
                </div>
                <div className="relative mt-3">
                    <h1 className="text-3xl font-bold text-text">{title}</h1>
                    <Underline depth={5} />
                </div>
            </div>
            <div className="flex items-center gap-10">
                <ToggleButton />
                <EyeButton />
                <User {...userData} />
            </div>
        </header>
    )
}

const EyeButton = () => {
    const { privateMode, setPrivateMode } = usePrivateMode();
    const handleClick = () => {
        setPrivateMode((prev) => !prev);
    }
    return (
        <button className="border-2 border-text p-2 rounded-full hover:scale-110 transition-all" onClick={handleClick}>
            {privateMode ? <Eye size={24} className="text-text" /> : <EyeOff size={24} className="text-accent" />}
        </button>
    )
}    