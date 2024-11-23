"use client";

import { cn } from "@/lib/utils";
import { IconCopy, IconUser } from "@tabler/icons-react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

function Sidebar() {
  const pathname = usePathname();
  const walletAddress = "0x95223...8f41";
  const userEmail = "user@example.com";
  const [isCopied, setIsCopied] = useState(false);

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 3)}...${address.slice(-2)}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const navigationItems = [
    { name: "Dashboard", icon: BiSolidDashboard, href: "/dashboard" },
    { name: "Analytics", icon: SiGoogleanalytics, href: "/analytics" },
    { name: "Swap", icon: MdSwapVerticalCircle, href: "/swap" },
    { name: "Cryptocurrency", icon: RiCurrencyFill, href: "/cryptocurrency" },
    { name: "Assets", icon: GrGoogleWallet, href: "/assets" },
    { name: "Savings", icon: MdSavings, href: "/savings" },
    { name: "Transactions", icon: MdCurrencyExchange, href: "/transactions" },
    { name: "Notification", icon: IoMdNotifications, href: "/notification" },
    { name: "Settings", icon: IoSettings, href: "/settings" },
    { name: "Profile", icon: GiEgyptianProfile, href: "/profile" },
  ];

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
        <div className="relative p-[1px] rounded-lg bg-gradient-to-b from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]">
          <div className="px-4 py-2 bg-black rounded-lg">
            <div className="flex flex-col items-center gap-1.5">
              <Image
                src="/wallet.png"
                alt="Wallet"
                width={20}
                height={20}
                className="mb-1"
              />
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white">
                  {formatWalletAddress(walletAddress)}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-[#009FDF] transition-colors"
                  title={isCopied ? "Copied!" : "Copy address"}
                >
                  <IconCopy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
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
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <IconUser className="w-5 h-5 text-gray-400" />
          </div>
          <span className="text-[10px] text-gray-400 truncate w-full text-center">
            {userEmail}
          </span>
        </div>
      </div>
    </aside>
  );
}

export { Sidebar };
