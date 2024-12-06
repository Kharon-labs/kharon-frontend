import { motion } from "framer-motion";
import { Token } from "@/interfaces/interfaces";
import { TokenSelect } from "@/components/swap/TokenSelect";
import { PiHandDepositFill } from "react-icons/pi";
import { useInterlinkContract } from "@/hooks/use-interlink-contract";
import { useAccount } from "@starknet-react/core";
import { toUint256, fromUint256 } from "@/utils/contracts/helpers";
import { useState } from "react";
import { toast } from "sonner";

interface DepositStepProps {
  selectedToken: Token | null;
  amount: string;
  setSelectedToken: (token: Token | null) => void;
  setAmount: (amount: string) => void;
  tokens: Token[];
}

export function DepositStep({
  selectedToken,
  amount,
  setSelectedToken,
  setAmount,
  tokens,
}: DepositStepProps) {
  const { contract } = useInterlinkContract();
  const { address } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleTransaction = async (
  //     action: () => Promise<any>,
  //     { loadingMessage, successMessage, errorMessage }: {
  //       loadingMessage: string
  //       successMessage: string
  //       errorMessage: string
  //     }
  //   ) => {
  //     if (!contract || !address) return
  //     setLoading(true)

  //     try {
  //       // Show loading toast
  //       const promise = action()

  //       toast.promise(promise, {
  //         loading: loadingMessage,
  //         success: successMessage,
  //         error: errorMessage,
  //       })

  //       await promise
  //       await promise.wait?.() // For transaction confirmation
  //     } catch (err) {
  //       console.error(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  const calculateDollarValue = () => {
    if (!selectedToken || !amount) return "0";
    return (parseFloat(amount) * selectedToken.price).toFixed(2);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  //   const handleDeposit = (token: string, amount: string) => {
  //     handleTransaction(
  //       () => contract.deposit({
  //         token,
  //         amount: toUint256(amount)
  //       }),
  //       {
  //         loadingMessage: "Depositing tokens...",
  //         successMessage: `Successfully deposited ${amount} tokens`,
  //         errorMessage: "Failed to deposit tokens. Please try again.",
  //       }
  //     )
  //   }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <PiHandDepositFill className="w-6 h-6 text-white" />
          <span className="text-2xl text-white font-semibold">
            Deposit Token
          </span>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <TokenSelect
            tokens={tokens}
            selectedToken={selectedToken}
            onSelect={setSelectedToken}
          />
          <div className="flex flex-col items-end">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="bg-transparent text-3xl text-white text-right outline-none w-[120px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
            />
            <span className="text-sm text-gray-400">
              ${calculateDollarValue()}
            </span>
          </div>
        </div>

        <button
          //  onClick={() => handleDeposit(selectedToken?.address || "", amount)}
          className="w-full py-4 rounded-xl text-white font-medium gradient-border-form"
        >
          Deposit
        </button>
      </div>
    </motion.div>
  );
}
