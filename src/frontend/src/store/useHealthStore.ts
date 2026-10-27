import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "../types/health";

type Theme = "light" | "dark";

interface HealthState {
  isAuthenticated: boolean;
  userPrincipal: string | null;
  userProfile: UserProfile | null;
  isOnboarded: boolean;
  theme: Theme;
  isSidebarCollapsed: boolean;

  // Actions
  setAuthenticated: (val: boolean, principal?: string) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setOnboarded: (val: boolean) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  logout: () => void;
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userPrincipal: null,
      userProfile: null,
      isOnboarded: false,
      theme: "light",
      isSidebarCollapsed: false,

      setAuthenticated: (val, principal) =>
        set({ isAuthenticated: val, userPrincipal: principal ?? null }),

      setUserProfile: (profile) =>
        set({ userProfile: profile, isOnboarded: profile !== null }),

      setOnboarded: (val) => set({ isOnboarded: val }),

      setTheme: (theme) => set({ theme }),

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

      toggleSidebar: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

      logout: () =>
        set({
          isAuthenticated: false,
          userPrincipal: null,
          userProfile: null,
          isOnboarded: false,
        }),
    }),
    {
      name: "health-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userPrincipal: state.userPrincipal,
        theme: state.theme,
        isSidebarCollapsed: state.isSidebarCollapsed,
        isOnboarded: state.isOnboarded,
        userProfile: state.userProfile,
      }),
    },
  ),
);
