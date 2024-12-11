import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import {
  loginUser,
  logoutUser,
  loginWithGoogle,
} from "@/lib/services/auth-service";

export function useAuth() {
  const router = useRouter();
  const {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    logout: clearAuth,
  } = useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await loginUser({ email, password });
      setUser(response.user);
      setToken(response.token);
      router.push("/dashboard");
    },
    [setUser, setToken, router]
  );

  const loginGoogle = useCallback(async () => {
    await loginWithGoogle();
  }, []);

  const logout = useCallback(async () => {
    if (user?.email && token) {
      await logoutUser(user.email, token);
      clearAuth();
      router.push("/login");
    }
  }, [user, token, clearAuth, router]);

  return {
    user,
    isAuthenticated,
    login,
    loginGoogle,
    logout,
  };
}
