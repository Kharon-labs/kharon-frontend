"use client";

import { useWallet } from "@/contexts/wallet-context";
import { WalletConnectButton } from "./connect-button";
import { WalletStatus } from "./wallet-status";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function WalletSection() {
  const { isConnected, status } = useWallet();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Wallet Connection</h2>
        <WalletConnectButton />
      </div>

      {status === "connecting" && (
        <Alert>
          <AlertDescription>
            Please approve the connection request in your wallet...
          </AlertDescription>
        </Alert>
      )}

      {isConnected ? (
        <WalletStatus />
      ) : (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>
            Please connect your wallet to access this application.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
