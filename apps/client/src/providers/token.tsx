'use client';
import { createContext, useContext, useEffect, useState } from 'react';
interface TokenContextType {
    setToken: (token: string | null) => void;
    token: string | null;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (stored && stored !== 'null' && stored !== 'undefined' && stored !== '') {
            setToken(stored);
        }
    }, []);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    const ctx = useContext(TokenContext);
    if (!ctx) throw new Error('useToken must be used within TokenProvider');
    return { token: ctx.token, setToken: ctx.setToken };
};
