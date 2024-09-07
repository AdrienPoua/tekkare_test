import useDeviceType from "../../contexts/breakpoints";
import DesktopAside from "./DesktopAside";
import MobileAside from "./MobileAside";



export default function Aside() {
    const device = useDeviceType();
    return (
        <>
            {device === 'desktop' ? <DesktopAside /> : <MobileAside />}
        </>
    );
}
