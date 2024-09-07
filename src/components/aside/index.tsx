import useDeviceType from "../../hooks/useDeviceType";
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
