import { useAuthStore } from "@/lib/stores/use-auth-store";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, isAuthenticated, logout, setIsModalOpen } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    router.push("/");
  };

  return {
    user,
    isAuthenticated,
    logout: handleLogout,
    setIsModalOpen,
  };
}
