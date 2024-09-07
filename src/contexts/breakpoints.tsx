import { createContext, useContext, useState, useEffect } from 'react';

const breakpoints = {
    mobile: 640,
    tablet: 1024,
}

const DeviceContext = createContext<string | null>(null);

export default function useDeviceType() {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error("useContext must be used within a Provider");
    }
    return context;
};

// Fonction qui détecte le type d'appareil en fonction de la largeur d'écran
function getDeviceType() {
    const width = window.innerWidth;
    if (width <= breakpoints.mobile) return 'mobile';
    if (width <= breakpoints.tablet) return 'tablet';
    return 'desktop';
}

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
    const [device, setDevice] = useState(getDeviceType());

    useEffect(() => {
        const handleResize = () => {
            setDevice(getDeviceType());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <DeviceContext.Provider value={device}>
            {children}
        </DeviceContext.Provider>
    );
};

