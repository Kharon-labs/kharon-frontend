"use client";

import { Button } from "@/components/ui/button";
import { LogIn, Settings } from "lucide-react";
import { IoMdWallet } from "react-icons/io";
import { AddWalletDialog } from "./add-wallet-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function WalletSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("wallets");

  const tabs = [
    {
      id: "wallets",
      icon: <IoMdWallet className="w-7 h-5" />,
      label: "Connected Wallets",
    },
    {
      id: "login",
      icon: <LogIn className="w-5 h-5" />,
      label: "Login Activity",
    },
    {
      id: "settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 text-lg",
                activeTab === tab.id ? "text-blue-500" : "text-gray-400"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  activeTab === tab.id ? "bg-blue-500/10" : "bg-[#1A1A1A]"
                )}
              >
                {tab.icon}
              </div>
              {tab.label}
            </button>
          ))}
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#009FDF] hover:bg-[#0094d0] text-white px-6 rounded-xl"
        >
          Add Wallet
        </Button>
      </div>

      {activeTab === "wallets" && (
        <div className="mt-8">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="pb-6 text-gray-400 text-lg font-normal">
                  Wallet Address
                </th>
                <th className="pb-6 text-gray-400 text-lg font-normal">
                  Network
                </th>
                <th className="pb-6 text-gray-400 text-lg font-normal">
                  Date Added
                </th>
                <th className="pb-6 text-gray-400 text-lg font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-gray-800">
                <td className="py-6 font-mono text-lg">0x1234...5678</td>
                <td className="py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-lg">Ethereum</span>
                  </div>
                </td>
                <td className="py-6 text-lg">3/15/2024</td>
                <td className="py-6">
                  <span className="px-4 py-1.5 text-sm rounded-full bg-green-900/30 text-green-500">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-6 font-mono text-lg">0xabcd...Ef12</td>
                <td className="py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-lg">Polygon</span>
                  </div>
                </td>
                <td className="py-6 text-lg">3/14/2024</td>
                <td className="py-6">
                  <span className="px-4 py-1.5 text-sm rounded-full bg-green-900/30 text-green-500">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <AddWalletDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
