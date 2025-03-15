import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAdminStore = create(
  persist<AdminState>(
    (set) => ({
      isLoggedIn: false,
      isAdmin: false,
      token: null,
      login: (token: string) =>
        set({
          isLoggedIn: true,
          isAdmin: true,
          token,
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          isAdmin: false,
          token: null,
        }),
    }),
    {
      name: 'admin-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAdminStore;