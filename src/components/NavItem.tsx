import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip";
import clsx from "clsx";
import useDeviceType from "../hooks/useDeviceType";

export default function NavItem({ children, name, className }: Readonly<{ children: React.ReactNode, name: string, className?: string }>) {
    const device = useDeviceType();

    if (device === 'mobile') {
        return (
            <div className={clsx("flex justify-center items-center bg-primary w-12 md:w-16 aspect-square rounded-xl", className)}>
                {children}
            </div>
        )
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild className={clsx("flex justify-center items-center aspect-square bg-primary h-16 rounded-xl")}>
                    {children}
                </TooltipTrigger>
                <TooltipContent side="right">
                    {name}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}