import useDeviceType from "../contexts/breakpoints";
import { useLocation } from "react-router-dom";
import { ChevronsRight, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import usePrivateMode from "../contexts/privateMode.tsx"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { userData } from "../data/user"



const ToggleButton = () => {
    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Main-Coin Wallet</Label>
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">All Wallets (8)</Label>
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
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-sm text-gray-500">{bitcoin}</p>
            </div>
        </div>
    )
}



const DesktopHeader = () => {
    const { setPrivateMode } = usePrivateMode();
    const pathname = useLocation().pathname.slice(1).toUpperCase()
    const title = pathname ? pathname : 'Dashboard'
    return (
        <header className="py-5 px-[5%] bg-background border-b-2 border-gray-200 shadow-xl flex justify-between">
            <div className="flex items-center gap-2">
                <ChevronsRight size={48} className="bg-red-500 rounded-lg" />
                <h1 className="text-2xl font-bold">{title} </h1>
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