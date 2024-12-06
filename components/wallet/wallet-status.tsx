"use client";

import { useWallet } from "@/contexts/wallet-context";
import { useNetwork, useBalance, useStarkName } from "@starknet-react/core";
import { shortenAddress } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { IconExternalLink, IconCopy, IconLogout } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";

export function WalletStatus() {
  const { address, status, disconnectWallet } = useWallet();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address: address ? (address as `0x${string}`) : undefined,
  });
  const { data: starkName } = useStarkName({
    address: address ? (address as `0x${string}`) : undefined,
  });
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  console.log(balance);

  return (
    <Dialog.Content className="fixed top-0 right-0 mt-20 mr-4 w-[320px] rounded-2xl bg-[#111111] border border-[#2a2a2a] p-6 shadow-xl">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src="/dog_favicon.png"
              alt="Wallet Avatar"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            {starkName && (
              <h3 className="text-lg font-semibold text-white">{starkName}</h3>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {shortenAddress(address)}
              </span>
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <IconCopy size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              window.open(`https://starkscan.co/contract/${address}`, "_blank")
            }
            className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
          >
            <IconExternalLink size={20} className="text-gray-400" />
          </button>
          <button
            onClick={disconnectWallet}
            className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
          >
            <IconLogout size={20} className="text-gray-400" />
          </button>
        </div>

        {balance && (
          <div className="pt-4 border-t border-[#2a2a2a]">
            <span className="text-lg font-bold text-white">
              ${balance.formatted} {balance.symbol}
            </span>
          </div>
        )}

        {chain && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Network</span>
            <span className="text-white font-medium">{chain.name}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Status</span>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                status === "connected"
                  ? "bg-green-500"
                  : status === "connecting"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
            <span className="text-white font-medium capitalize">{status}</span>
          </div>
        </div>
      </div>
    </Dialog.Content>
  );
}
