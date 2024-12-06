"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  Connector,
} from "@starknet-react/core";

interface WalletContextType {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: (connector: Connector) => void;
  disconnectWallet: () => void;
  status: "connected" | "disconnected" | "connecting";
  availableConnectors: Connector[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, status } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = (connector: Connector) => {
    connect({ connector });
  };

  const disconnectWallet = () => {
    disconnect();
  };

  const value = {
    address,
    isConnected: status === "connected",
    isConnecting: status === "connecting",
    connectWallet,
    disconnectWallet,
    status: status === "reconnecting" ? "connecting" : status,
    availableConnectors: connectors,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined)
    throw new Error("useWallet must be used within a WalletProvider");
  return context;
}
