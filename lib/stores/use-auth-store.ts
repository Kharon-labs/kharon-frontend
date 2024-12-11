import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentUser, logoutUser } from "../services/auth-service";

export interface User {
  id: string;
  email: string;
  username: string;
  emailVerified: boolean;
  provider?: "google" | "credentials";
  token?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isModalOpen: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isModalOpen: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setIsLoading: (value) => set({ isLoading: value }),
      setIsModalOpen: (value) => set({ isModalOpen: value }),
      logout: async () => {
        try {
          const { user, token } = get();
          if (!user?.email || !token) return;

          set({ isLoading: true });
          await logoutUser(user.email, token);
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
      fetchUser: async () => {
        try {
          const { token, user } = get();
          if (!token || !user?.email)
            throw new Error("No token or email found");

          set((state) => ({ ...state, isLoading: true }));
          const fetchedUser = await getCurrentUser(user.email, token);
          set((state) => ({
            ...state,
            user: fetchedUser,
            isAuthenticated: true,
          }));
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
