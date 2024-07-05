import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (isAdmin: boolean) => void;
  logout: () => void;
}

const useAdminStore = create<AdminState>(
  persist(
    (set) => ({
      isLoggedIn: false,
      isAdmin: false,
      login: (isAdmin: boolean) => set({ isLoggedIn: true, isAdmin }),
      logout: () => set({ isLoggedIn: false, isAdmin: false }),
    }),
    {
      name: "admin-session", // unique name
    }
  ) as StateCreator<AdminState> // Type assertion here
);

export default useAdminStore;