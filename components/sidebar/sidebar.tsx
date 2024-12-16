"use client";

import { cn } from "@/lib/utils";
import { IconLoader2, IconUser } from "@tabler/icons-react";
import {
  MdSwapVerticalCircle,
  MdCurrencyExchange,
  MdSavings,
} from "react-icons/md";
import { RiCurrencyFill } from "react-icons/ri";
import { BiSolidDashboard, BiTargetLock, BiLogOut } from "react-icons/bi";
import { SiGoogleanalytics } from "react-icons/si";
import { IoSettings } from "react-icons/io5";
import { GrGoogleWallet } from "react-icons/gr";
import { IoMdNotifications } from "react-icons/io";
import { GiEgyptianProfile } from "react-icons/gi";
import { FaBriefcase } from "react-icons/fa6";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { WalletConnectButton } from "../wallet/connect-button";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { logoutUser, logoutFromGoogle } from "@/lib/services/auth-service";
import { Icons } from "../icons";

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: BiSolidDashboard, href: "/dashboard" },
    { name: "Analytics", icon: SiGoogleanalytics, href: "/analytics" },
    { name: "Swap", icon: MdSwapVerticalCircle, href: "/swap" },
    { name: "Cryptocurrency", icon: RiCurrencyFill, href: "/cryptocurrency" },
    { name: "Assets", icon: GrGoogleWallet, href: "/assets" },
    { name: "Savings", icon: MdSavings, href: "/savings" },
    { name: "Transactions", icon: MdCurrencyExchange, href: "/transactions" },
    { name: "Portfolio", icon: FaBriefcase, href: "/portfolio" },
    { name: "Notification", icon: IoMdNotifications, href: "/notification" },
    { name: "Settings", icon: IoSettings, href: "/settings" },
    { name: "Profile", icon: GiEgyptianProfile, href: "/profile" },
  ];

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      if (user?.provider === "google") {
        await logoutFromGoogle();
      } else if (user?.email && user?.token) {
        await logoutUser(user.email, user.token);
      }
      setUser(null);
      setToken(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="flex flex-col w-[80px] h-screen bg-black pt-6 fixed font-poppins">
      <div className="mb-6 text-center">
        <Link
          href="/"
          className="text-xl font-inriaSans font-bold text-[#009FDF]"
        >
          Kharon
        </Link>
      </div>

      <div className="mb-6">
        <WalletConnectButton />
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col items-center gap-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="w-full">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-[#009FDF]"
                      : "text-[#fff] hover:text-[#009FDF]"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="mt-0.5 text-[10px]">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex flex-col items-center gap-1 w-full hover:text-[#009FDF] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            {isLoading ? (
              <Icons.spinner className="w-4 h-4 animate-spin" />
            ) : (
              <IconUser className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <span className="text-[10px] text-gray-400 truncate w-full text-center">
            {user?.email || "Not logged in"}
          </span>
        </button>
      </div>
    </aside>
  );
}

export { Sidebar };
