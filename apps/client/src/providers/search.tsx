'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type SearchContextType<T = any> = {
    searchTerm: string;
    searchFilter: string;
    setSearchTerm: (term: string) => void;
    clearSearch: () => void;
    setSearchFilter: (filter: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({
    children
}: {
    children: ReactNode;
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    const clearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    return (
        <SearchContext.Provider
            value={{
                searchTerm,
                searchFilter,
                setSearchTerm,
                clearSearch,
                setSearchFilter,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch<T = any>() {
    const context = useContext(SearchContext as React.Context<SearchContextType<T>>);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
