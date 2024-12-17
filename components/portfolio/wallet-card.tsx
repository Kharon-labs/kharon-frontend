import { useState } from "react";
import { Wallet } from "@/lib/types/wallet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import { truncateAddress } from "@/lib/utils/truncate-address";
import { useWalletStore } from "@/lib/stores/wallet-stores";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { UserService } from "@/lib/services/user-service";
import { toast } from "sonner";

interface WalletCardProps {
  wallet: Wallet;
}

export function WalletCard({ wallet }: WalletCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const removeWallet = useWalletStore((state) => state.removeWallet);
  const userEmail = useAuthStore((state) => state.user?.email);

  const handleDelete = async () => {
    if (!userEmail) return;

    try {
      setIsDeleting(true);
      const userProfile = await UserService.getUserByEmail(userEmail);
      if (!userProfile?.user_uuid) throw new Error("User UUID not found");

      await removeWallet(userProfile.user_uuid, wallet.wallet_address);
      toast.success("Wallet removed successfully");
    } catch (error) {
      console.error("Error deleting wallet:", error);
      toast.error("Failed to remove wallet. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getExplorerUrl = (network: string, address: string) => {
    const explorers = {
      Ethereum: `https://etherscan.io/address/${address}`,
      Starknet: `https://starkscan.co/contract/${address}`,
    };
    return (
      explorers[network as keyof typeof explorers] ||
      `https://explorer.com/${address}`
    );
  };

  return (
    <Card className="p-4 space-y-4 bg-background">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-foreground">
            {truncateAddress(wallet.wallet_address)}
          </h3>
          <p className="text-sm text-muted-foreground">{wallet.network}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-black hover:bg-black/90 text-white hover:text-white border-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <Button
        variant="outline"
        className="w-full text-foreground"
        onClick={() =>
          window.open(
            getExplorerUrl(wallet.network, wallet.wallet_address),
            "_blank"
          )
        }
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        View on Explorer
      </Button>
    </Card>
  );
}
