"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface AddWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWalletDialog({ open, onOpenChange }: AddWalletDialogProps) {
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = useAuthStore((state) => state.user?.email);
  const addWallet = useWalletStore((state) => state.addWallet);
  const fetchUserWallets = useWalletStore((state) => state.fetchUserWallets);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      toast.error("Please log in to add a wallet");
      return;
    }

    if (!address || !network) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      console.log("Email:", userEmail);
      setIsLoading(true);
      const userProfile = await UserService.getUserByEmail(userEmail);
      console.log("User Profile:", userProfile);
      console.log("User UUID:", userProfile?.user_uuid);
      if (!userProfile?.user_uuid) {
        toast.error("User profile not found. Please try refreshing the page.");
        return;
      }

      await addWallet(userProfile.user_uuid, address, network);
      await fetchUserWallets();
      toast.success("Wallet added successfully");
      onOpenChange(false);
      setAddress("");
      setNetwork("");
    } catch (error) {
      console.error("Failed to add wallet:", error);
      toast.error("Failed to add wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Wallet</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Wallet Address</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address"
              required
              className="text-foreground bg-background"
            />
          </div>

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
            {isLoading ? "Adding..." : "Add Wallet"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
