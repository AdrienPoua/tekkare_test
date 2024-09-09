import useDeviceType from "../../hooks/useDeviceType";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

/**
 * Header component: Renders either the DesktopHeader or MobileHeader
 * based on the device type detected by the useDeviceType hook.
 */
export default function Header() {
  const device = useDeviceType();

  return device === 'desktop' ? <DesktopHeader /> : <MobileHeader />;
}
