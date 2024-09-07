import { useContext } from 'react'
import { PrivateModeContext } from '../contexts/privateMode'


export default function usePrivateMode() {
    const context = useContext(PrivateModeContext);
    if (!context) {
        throw new Error("usePrivateMode must be used within PrivateModeProvider");
    }
    const { privateMode, setPrivateMode } = context;
    return { privateMode, setPrivateMode };
};
