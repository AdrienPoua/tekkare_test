import useDeviceType from "../contexts/breakpoints";

const DesktopHeader = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Header</h1>
        </div>
    )
}

const MobileHeader = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">mobile header</h1>
        </div>
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