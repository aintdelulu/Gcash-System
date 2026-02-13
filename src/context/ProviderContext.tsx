import React, { createContext, useContext, useState, useEffect } from 'react';

export type Provider = 'GCash' | 'Maya';

interface ProviderContextType {
    provider: Provider;
    setProvider: (provider: Provider) => void;
    themeColor: string;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export const ProviderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [provider, setProvider] = useState<Provider>('GCash');

    const themeColor = provider === 'GCash' ? 'blue' : 'green';

    useEffect(() => {
        // Update body background or other global styles if needed
    }, [provider]);

    return (
        <ProviderContext.Provider value={{ provider, setProvider, themeColor }}>
            {children}
        </ProviderContext.Provider>
    );
};

export const useProvider = () => {
    const context = useContext(ProviderContext);
    if (!context) {
        throw new Error('useProvider must be used within a ProviderProvider');
    }
    return context;
};
