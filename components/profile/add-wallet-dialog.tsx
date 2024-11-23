"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWalletDialog({ open, onOpenChange }: AddWalletDialogProps) {
  const [network, setNetwork] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Add New Wallet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Network</label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger className="bg-[#252525] border-gray-800">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent className="bg-[#252525] border-gray-800">
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="bsc">Starknet</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="bsc">BSC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Wallet Address</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-[#252525] border-gray-800"
              placeholder="Enter wallet address"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-[#fd6767] hover:bg-[#cd4141]"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#009FDF] hover:bg-[#007edf]">
              Add Wallet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
