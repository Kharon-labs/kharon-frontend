import { motion } from "framer-motion";
import { Token } from "@/interfaces/interfaces";
import { TokenSelect } from "@/components/swap/TokenSelect";
import { PiHandWithdrawFill } from "react-icons/pi";

interface WithdrawStepProps {
  selectedToken: Token | null;
  amount: string;
  setSelectedToken: (token: Token | null) => void;
  setAmount: (amount: string) => void;
  tokens: Token[];
}

export function WithdrawStep({
  selectedToken,
  amount,
  setSelectedToken,
  setAmount,
  tokens,
}: WithdrawStepProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <PiHandWithdrawFill className="w-6 h-6 text-white" />
          <span className="text-2xl text-white font-semibold">
            Withdraw Token
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

        <button className="w-full py-4 rounded-xl text-white font-medium gradient-border-form">
          Deposit
        </button>
      </div>
    </motion.div>
  );
}
