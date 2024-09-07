import { useContext } from 'react';
import { DeviceContext } from '../contexts/breakpoints';

export default function useDeviceType() {
    const device = useContext(DeviceContext);
    if (!device) {
        throw new Error("useDeviceType must be used within a DeviceProvider");
    }
    return device;
};
