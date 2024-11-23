"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { useEffect } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    // Check for existing session/token
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verify token with backend
          const response = await fetch("/api/auth/verify-token", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const { user } = await response.json();
            useAuthStore.getState().setUser(user);
          } else {
            useAuthStore.getState().logout();
          }
        }
      } catch (error) {
        useAuthStore.getState().logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setIsLoading]);

  return children;
}
