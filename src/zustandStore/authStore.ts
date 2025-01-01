import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    tokenType: "user" | "firm";
    userToken: string | null;
    firmToken: string | null;
    setTokenType: (tokenType: "user" | "firm") => void;
    setUserToken: (token: string | null) => void;
    setFirmToken: (token: string | null) => void;
    clearTokens: () => void;
    clearFirmTokens: () => void;
    clearUserTokens: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            tokenType: "user",
            userToken: null,
            firmToken: null,
            setTokenType: (tokenType: "user" | "firm") => set({ tokenType }),
            setUserToken: (token: string | null) => set({ userToken: token }),
            setFirmToken: (token: string | null) => set({ firmToken: token }),
            clearTokens: () => set({ userToken: null, firmToken: null, tokenType: "user" }),
            clearFirmTokens: () => set({ firmToken: null }),
            clearUserTokens: () => set({ userToken: null }),
        }),
        {
            name: "auth-storage", // Name for localStorage key
            partialize: (state) => ({
                tokenType: state.tokenType,
                userToken: state.userToken,
                firmToken: state.firmToken,
            }),
        }
    )
);

export default useAuthStore;

// const { setUserToken, setFirmToken, setTokenType } = useAuthStore.getState();
// setTokenType("firm")
// setFirmToken(token)
// setUserToken(token)


// const token = useAuthStore((state) => (isFirm ? state.firmToken : state.userToken));
