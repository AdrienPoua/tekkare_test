import { createContext, useState, Dispatch, SetStateAction, useMemo } from 'react';

// Define the context type
interface PrivateModeContextType {
    privateMode: boolean;
    setPrivateMode: Dispatch<SetStateAction<boolean>>;
}

// Create context with a type-safe default value
export const PrivateModeContext = createContext<PrivateModeContextType | undefined>(undefined);

export const PrivateModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [privateMode, setPrivateMode] = useState(false);
    const value = useMemo(() => ({ privateMode, setPrivateMode }), [privateMode, setPrivateMode]);
    return (
        <PrivateModeContext.Provider value={value}>
            {children}
        </PrivateModeContext.Provider>
    );
};
