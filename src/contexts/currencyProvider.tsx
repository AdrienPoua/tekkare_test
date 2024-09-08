import { createContext, useState, Dispatch, SetStateAction, useMemo } from 'react';

// Define the context type
interface CurrencyContextType {
    currency: 'eur' | 'usd'
    setCurrency: Dispatch<SetStateAction<'eur' | 'usd'>>;
}

export const CurrencyContext = createContext<CurrencyContextType>({
    currency: 'eur',
    setCurrency: () => {}
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
    const [currency, setCurrency] = useState<'eur' | 'usd'>('eur');
    const value = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency]);
    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
