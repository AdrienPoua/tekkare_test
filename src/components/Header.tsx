import useDeviceType from "../hooks/useDeviceType";
import { useLocation } from "react-router-dom";
import { ChevronsRight, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import usePrivateMode from "../hooks/usePrivateMode"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { userData } from "../data/user"



const ToggleButton = () => {
    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode" className="text-text font-bold">Main-Coin Wallet</Label>
            <Switch id="airplane-mode" className="data-[state=checked]:bg-secondary bg-secondary" />
            <Label htmlFor="airplane-mode" className="text-text font-bold">All Wallets (8)</Label>
        </div>
    )
}

const User = ({ name, image, publicKey }: { name: string, image: string, publicKey: { [key: string]: string } }) => {
    const { bitcoin } = publicKey
    return (
        <div className="flex justify-center items-center gap-2">
            <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-text ">{name}</h1>
                <p className="text-sm text-text ">{bitcoin.slice(0, 20)}...</p>
            </div>
        </div>
    )
}



const DesktopHeader = () => {
    const { setPrivateMode } = usePrivateMode();
    const pathname = useLocation().pathname.slice(1);
    const title = pathname.charAt(0).toUpperCase() + pathname.slice(1) || 'Dashboard'
    return (
        <header className="h-[102px] px-[5%] bg-background border-b-2 border-accent shadow-xl flex justify-between">
            <div className="flex items-center gap-2">
                <ChevronsRight size={48} className="bg-secondary rounded-xl me-5" />
                <h1 className="text-3xl font-bold text-text">{title}</h1>
            </div>
            <div className="flex items-center gap-10">
                <ToggleButton />
                <button onClick={() => {
                    setPrivateMode((prev) => !prev);
                }}> <EyeOff size={24} className="text-text" /> </button>
                <User {...userData} />
            </div>
        </header>
    )
}

const MobileHeader = () => {
    const { setPrivateMode } = usePrivateMode();
    const pathname = useLocation().pathname.slice(1).toUpperCase()
    return (
        <header className="py-5 px-[5%] bg-background border-b-2 border-gray-200 shadow-xl flex justify-between">
            <div className="flex items-center gap-2">
                <ChevronsRight size={48} className="bg-red-500 rounded-lg" />
                <h1 className="text-2xl font-bold">{pathname} </h1>
            </div>
            <div className="flex items-center gap-10">
                <ToggleButton />
                <button onClick={() => {
                    setPrivateMode((prev) => !prev);
                }}> <EyeOff size={24} /> </button>
                <User {...userData} />
            </div>
        </header>
    )
}

export default function Header() {
    const device = useDeviceType();
    return (
        <>
            {device === 'desktop' ? <DesktopHeader /> : <MobileHeader />}
        </>
    );
}