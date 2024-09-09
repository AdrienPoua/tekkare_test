import useDeviceType from "../../hooks/useDeviceType";
import DesktopAside from "./DesktopAside";
import MobileAside from "./MobileAside";

/**
 * Renders the appropriate Aside component (Desktop or Mobile) based on the device type.
 * - `useDeviceType` custom hook detects the device type (e.g., desktop or mobile).
 * - If the device is 'desktop', renders the `DesktopAside` component.
 * - If the device is mobile or any other type, renders the `MobileAside` component.
 */
export default function Aside() {
  const device = useDeviceType();

  // Render the correct Aside component based on the device type
  if (device === 'desktop') {
    return <DesktopAside />;
  }

  return <MobileAside />;
}
