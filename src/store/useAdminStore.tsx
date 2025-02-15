import create, { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminState {
  isLoggedIn: boolean
  isAdmin: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const useAdminStore = create<AdminState>(
  persist(
    set => ({
      isLoggedIn: false,
      isAdmin: false,
      token: null,
      login: (token: string) =>
        set({
          isLoggedIn: true,
          isAdmin: true,
          token
        }),
      logout: () => {
        localStorage.removeItem('admin_token')
        set({ isLoggedIn: false, isAdmin: false, token: null })
      }
    }),
    {
      name: 'admin-session'
    }
  ) as StateCreator<AdminState>
)

export default useAdminStore
