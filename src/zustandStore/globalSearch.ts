import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface GlobalSearch {
    searchTerms: any[];
    addSearchTerm: (searchTerm: any) => void;
    removeSearchTerm: (searchTerm: any) => void;
    removeAllSearchTerm: () => void;
}

type MyPersist = PersistOptions<GlobalSearch>;

export const useGlobalSearchStore = create<GlobalSearch>()(
    persist<GlobalSearch>(
        (set, get) => ({
            searchTerms: [],
            addSearchTerm: (searchTerm: any) => {
                const currentTerms = get().searchTerms;
                // Add the search term only if it doesn't already exist
                if (!currentTerms.includes(searchTerm)) {
                    set({ searchTerms: [...currentTerms, searchTerm] });
                }
            },
            removeSearchTerm: (searchTerm: any) => {
                const currentTerms = get().searchTerms;
                set({ searchTerms: currentTerms.filter((term: any) => term !== searchTerm) });
            },
            removeAllSearchTerm: () => set({ searchTerms: [] }),
        }),
        {
            name: 'user-search-terms', // Key for localStorage
            getStorage: () => localStorage,
        } as MyPersist
    )
);
