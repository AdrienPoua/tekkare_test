import { useContext } from 'react';
import { CurrencyContext } from '../contexts/currencyProvider';

export default function useCurrency() {
    const currency = useContext(CurrencyContext);
    if (!currency) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return currency
};
