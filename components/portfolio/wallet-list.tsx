"use client";

import { useWalletStore } from "@/lib/stores/wallet-stores";
import { motion, AnimatePresence } from "framer-motion";
import { WalletCard } from "./wallet-card";

export function WalletList() {
  const wallets = useWalletStore((state) => state.wallets);
  const isLoading = useWalletStore((state) => state.isLoading);
  const error = useWalletStore((state) => state.error);

  if (isLoading) return <div>Loading wallets...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!wallets.length) return <div>No wallets found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {wallets.map((wallet) => (
          <motion.div
            key={wallet.wallet_address}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <WalletCard wallet={wallet} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
