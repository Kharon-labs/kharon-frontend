"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { useWalletStore } from "@/lib/stores/wallet-stores";
import { UserService } from "@/lib/services/user-service";
import { WalletList } from "@/components/portfolio/wallet-list";
import { AddWalletDialog } from "@/components/portfolio/add-wallet-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";

export function WalletDashboard() {
  const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const fetchUserWallets = useWalletStore((state) => state.fetchUserWallets);
  const wallets = useWalletStore((state) => state.wallets);
  const isLoading = useWalletStore((state) => state.isLoading);
  const error = useWalletStore((state) => state.error);

  useEffect(() => {
    const initializeUser = async () => {
      if (!isAuthenticated || !user?.email) return;

      try {
        console.log("Initializing user with email:", user.email);

        const userProfile = await UserService.getUserByEmail(user.email);
        console.log("User profile response:", userProfile);

        if (!userProfile?.user_uuid) {
          console.log("Creating new user...");
          const newUser = await UserService.createUser({
            name: user.username || user.email.split("@")[0],
            email: user.email,
          });
          console.log("New user created:", newUser);

          if (!newUser?.user_uuid) {
            console.error("No user_uuid in created user:", newUser);
            throw new Error("Failed to create user profile: Missing user_uuid");
          }

          console.log("Fetching wallets for new user...");
          await fetchUserWallets();
          toast.success("User profile created successfully");
        } else {
          console.log("Existing user found, fetching wallets...");
          await fetchUserWallets();
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Error initializing user:", {
          error,
          email: user.email,
          message: errorMessage,
        });
        toast.error(`Failed to initialize user profile: ${errorMessage}`);
      }
    };

    initializeUser();
  }, [isAuthenticated, user?.email, fetchUserWallets, user?.username]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-destructive/10 text-destructive">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 py-8"
    >
      {wallets.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-12 border rounded-lg bg-card">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-muted-foreground text-center"
          >
            <h3 className="text-lg font-semibold mb-2">No Wallets Added</h3>
            <p className="text-sm">
              Start tracking your portfolio by adding a wallet
            </p>
          </motion.div>
          <Button
            onClick={() => setIsAddWalletOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add Wallet
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Wallets</h2>
            <Button
              onClick={() => setIsAddWalletOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Wallet
            </Button>
          </div>
          <WalletList />
        </>
      )}

      <AddWalletDialog
        open={isAddWalletOpen}
        onOpenChange={setIsAddWalletOpen}
      />
    </motion.div>
  );
}
