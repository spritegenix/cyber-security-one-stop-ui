import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface AuthState {
    tokenType: 'user' | 'firm' | 'admin';
    userToken: string | null;
    firmToken: string | null;
    adminToken: string | null;
    setTokenType: (tokenType: 'user' | 'firm' | 'admin') => void;
    setUserToken: (token: string | null) => void;
    setFirmToken: (token: string | null) => void;
    setAdminToken: (token: string | null) => void;
    clearTokens: () => void;
    clearFirmTokens: () => void;
    clearUserTokens: () => void;
    clearAdminTokens: () => void;
    validateTokens: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            tokenType: 'user',
            userToken: null,
            firmToken: null,
            adminToken: null,
            setTokenType: (tokenType: 'user' | 'firm' | 'admin') => set({ tokenType }),
            setUserToken: (token: string | null) => {
                set({ userToken: token });
                if (token) {
                    cookies.set('userToken', token, { path: '/', secure: true, sameSite: 'strict' });
                } else {
                    cookies.remove('userToken', { path: '/' });
                }
            },
            setFirmToken: (token: string | null) => {
                set({ firmToken: token });
                if (token) {
                    cookies.set('firmToken', token, { path: '/', secure: true, sameSite: 'strict' });
                } else {
                    cookies.remove('firmToken', { path: '/' });
                }
            },
            setAdminToken: (token: string | null) => {
                set({ adminToken: token });
                if (token) {
                    cookies.set('adminToken', token, { path: '/', secure: true, sameSite: 'strict' });
                } else {
                    cookies.remove('adminToken', { path: '/' });
                }
            },
            clearTokens: () => {
                set({ userToken: null, firmToken: null, adminToken: null, tokenType: 'user' });
                cookies.remove('userToken', { path: '/' });
                cookies.remove('firmToken', { path: '/' });
                cookies.remove('adminToken', { path: '/' });
            },
            clearFirmTokens: () => {
                set({ firmToken: null });
                cookies.remove('firmToken', { path: '/' });
            },
            clearUserTokens: () => {
                set({ userToken: null });
                cookies.remove('userToken', { path: '/' });
            },
            clearAdminTokens: () => {
                set({ adminToken: null });
                cookies.remove('adminToken', { path: '/' });
            },
            validateTokens: () => {
                if (!cookies.get('userToken')) {
                    set({ userToken: null });
                }
                if (!cookies.get('firmToken')) {
                    set({ firmToken: null });
                }
                if (!cookies.get('adminToken')) {
                    set({ adminToken: null });
                }
            },
        }),
        {
            name: 'auth-storage', // Name for localStorage key
            partialize: (state) => ({
                tokenType: state.tokenType,
                userToken: state.userToken,
                firmToken: state.firmToken,
                adminToken: state.adminToken,
            }),
        }
    )
);

// Periodic validation to ensure tokens are synced with cookies
setInterval(() => {
    useAuthStore.getState().validateTokens();
}, 1000 * 60 * 5); // 5 hour

export default useAuthStore;
