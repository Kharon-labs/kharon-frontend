"use client";

import { useWallet } from "@/contexts/wallet-context";
import { shortenAddress } from "@/lib/utils";
import { useState } from "react";
import { ConnectModal } from "./connect-modal";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { WalletStatus } from "./wallet-status";

export function WalletConnectButton() {
  const { address, isConnected, isConnecting } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isConnecting) {
    return (
      <button
        disabled
        className="w-[80px] aspect-square p-[1px] rounded-2xl bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
      >
        <div className="h-full w-full bg-black rounded-2xl flex flex-col items-center justify-center p-2">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          <span className="text-white text-[10px] mt-1">Connecting...</span>
        </div>
      </button>
    );
  }

  if (isConnected) {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="w-[80px] aspect-square p-[1px] rounded-2xl bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
            <div className="h-full w-full bg-black rounded-2xl flex flex-col items-center justify-center p-2">
              <div className="relative w-8 h-8 mb-1">
                <Image
                  src="/dog_favicon.png"
                  alt="Wallet Avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-white text-[10px] font-medium">
                {shortenAddress(address)}
              </span>
            </div>
          </button>
        </Dialog.Trigger>
        <WalletStatus />
      </Dialog.Root>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-[80px] aspect-square p-[1px] rounded-2xl bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
      >
        <div className="h-full w-full bg-black rounded-2xl flex items-center justify-center p-2">
          <span className="text-white text-[10px] font-medium">
            Connect Wallet
          </span>
        </div>
      </button>
      <ConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
