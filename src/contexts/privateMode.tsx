import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

// Define the context type
interface PrivateModeContextType {
    privateMode: boolean;
    setPrivateMode: Dispatch<SetStateAction<boolean>>;
}

// Create context with a type-safe default value
const PrivateModeContext = createContext<PrivateModeContextType | undefined>(undefined);

export default function usePrivateMode(): PrivateModeContextType {
    const context = useContext(PrivateModeContext);
    if (!context) {
        throw new Error("usePrivateMode must be used within PrivateModeProvider");
    }
    return context;
};

export const PrivateModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [privateMode, setPrivateMode] = useState(false);

    return (
        <PrivateModeContext.Provider value={{ privateMode, setPrivateMode }}>
            {children}
        </PrivateModeContext.Provider>
    );
};
