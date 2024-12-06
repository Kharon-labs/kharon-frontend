"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from "@/contexts/wallet-context";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const { connectWallet, availableConnectors } = useWallet();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] bg-black text-white border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Connect a wallet
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 mt-4">
          {availableConnectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => {
                connectWallet(connector);
                onClose();
              }}
              className={cn(
                "flex items-center px-4 py-4 rounded-lg",
                "hover:bg-neutral-800 transition-colors",
                "text-left w-full bg-neutral-900"
              )}
            >
              <div className="w-8 h-8 mr-3">
                <WalletIcon id={connector.id} />
              </div>
              <span className="text-sm font-medium">{connector.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 text-xs text-neutral-400">
          <p>
            By connecting a wallet, you agree to the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a>{" "}
            and acknowledge that you have read and understood the protocol
            disclaimer.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WalletIcon({ id }: { id: string }) {
  const icons: Record<string, string> = {
    argentX: "/argent-logo.png",
    braavos: "/braavos_logo.png",
    keplr: "/keplr-image-first.png",
  };

  return (
    <div className="w-8 h-8 rounded-full bg-neutral-800 p-1.5">
      {icons[id] ? (
        <Image
          src={icons[id]}
          alt={id}
          width={24}
          height={24}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full bg-neutral-700 rounded-full" />
      )}
    </div>
  );
}
