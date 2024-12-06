"use client";

import { useWallet } from "@/contexts/wallet-context";
import { WalletConnectButton } from "@/components/wallet/connect-button";

export function SomeComponent() {
  const { isConnected, address } = useWallet();

  return (
    <div>
      <WalletConnectButton />
      {isConnected && <div>Connected with address: {address}</div>}
    </div>
  );
}
