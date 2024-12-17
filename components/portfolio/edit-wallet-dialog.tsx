"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { useWalletStore } from "@/lib/stores/wallet-stores";
import { UserService } from "@/lib/services/user-service";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Wallet } from "@/lib/types/wallet";

interface EditWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wallet: Wallet;
}

export function EditWalletDialog({
  open,
  onOpenChange,
  wallet,
}: EditWalletDialogProps) {
  const [network, setNetwork] = useState(wallet.network);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = useAuthStore((state) => state.user?.email);
  const updateWallet = useWalletStore((state) => state.updateWallet);
  const fetchUserWallets = useWalletStore((state) => state.fetchUserWallets);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      toast.error("Please log in to update the wallet");
      return;
    }

    try {
      setIsLoading(true);
      const userProfile = await UserService.getUserByEmail(userEmail);

      if (!userProfile?.user_uuid) {
        toast.error("User profile not found");
        return;
      }

      await updateWallet(userProfile.user_uuid, wallet.wallet_address, network);
      await fetchUserWallets();
      toast.success("Wallet network updated successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update wallet:", error);
      toast.error("Failed to update wallet network");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Update Wallet Network
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Network</label>
            <Select value={network} onValueChange={setNetwork} required>
              <SelectTrigger className="text-foreground bg-background">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ethereum">Ethereum</SelectItem>
                <SelectItem value="Starknet">Starknet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Network"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
