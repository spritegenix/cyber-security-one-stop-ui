import { i } from 'framer-motion/m';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface Location {
    pincode: string;
    city: string;
    state: string;
    country: string;
    selectedLocation: string;
}
interface LocationState {
    location: Location | null;
    setLocation: (location: Location) => void;
}

type MyPersist = PersistOptions<LocationState>;

export const useLocationStore = create<LocationState>()(
    persist<LocationState>(
        (set) => {
            const storedLocation =
                typeof window !== 'undefined' ? localStorage.getItem('user-location') : null;
            const initialLocation: Location | null = storedLocation ? JSON.parse(storedLocation).state.location : '';

            return {
                location: initialLocation,
                setLocation: (location: Location | null) => set({ location }),
            };
        },
        {
            name: 'user-location',
            getStorage: () => localStorage,
        } as MyPersist
    )
);
