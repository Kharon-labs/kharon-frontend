import { motion } from "framer-motion";
import { Token } from "@/interfaces/interfaces";
import { TokenSelect } from "./TokenSelect";
import { ArrowDownIcon } from "lucide-react";

interface SelectStepProps {
  isWalletConnected: boolean;
  onConnect: () => void;
  payToken: Token | null;
  receiveToken: Token | null;
  payAmount: string;
  setPayToken: (token: Token | null) => void;
  setReceiveToken: (token: Token | null) => void;
  setPayAmount: (amount: string) => void;
  onSelectPayCoin: () => void;
  tokens: Token[];
}

export function SelectStep({
  isWalletConnected,
  onConnect,
  payToken,
  receiveToken,
  payAmount,
  setPayToken,
  setReceiveToken,
  setPayAmount,
  onSelectPayCoin,
  tokens,
}: SelectStepProps) {
  // Calculate dollar value for pay amount
  const calculatePayDollarValue = () => {
    if (!payToken || !payAmount) return "0";
    return (parseFloat(payAmount) * payToken.price).toFixed(2);
  };

  // Handle pay amount changes and calculate receive amount
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setPayAmount(amount);
  };

  // Calculate receive amount
  const calculateReceiveAmount = () => {
    if (!payToken || !receiveToken || !payAmount) return "0";
    const payValue = parseFloat(payAmount) * payToken.price;
    return (payValue / receiveToken.price).toFixed(6);
  };

  // Calculate dollar value for receive amount
  const calculateReceiveDollarValue = () => {
    if (!payToken || !payAmount) return "0";
    return calculatePayDollarValue(); // Same as pay dollar value since it's equivalent
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center  font-poppins mb-8">
        <h1 className="text-2xl font-semibold text-[#fff]">
          Connect Your Wallet
        </h1>
        <button
          onClick={onConnect}
          className="px-4 py-2 bg-[#009FDF] rounded-lg text-[#000] font-medium"
        >
          Connect
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl text-white">Pay</h2>
          <div className="flex justify-between items-center">
            <TokenSelect
              tokens={tokens}
              selectedToken={payToken}
              onSelect={setPayToken}
            />
            <div className="flex flex-col items-end">
              <input
                type="number"
                value={payAmount}
                onChange={handleAmountChange}
                className="bg-transparent text-2xl text-white text-right outline-none w-[120px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
              />
              <span className="text-sm text-gray-400">
                ${calculatePayDollarValue()}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center bg-black">
              <ArrowDownIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-white">Receive</h2>
          <div className="flex justify-between items-center">
            <TokenSelect
              tokens={tokens}
              selectedToken={receiveToken}
              onSelect={setReceiveToken}
            />
            <div className="flex flex-col items-end">
              <span className="text-2xl text-white">
                {calculateReceiveAmount()}
              </span>
              <span className="text-sm text-gray-400">
                ${calculateReceiveDollarValue()}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onSelectPayCoin}
          className="w-full py-4 gradient-border-form rounded-xl text-white font-medium"
        >
          Swap
        </button>
      </div>
    </motion.div>
  );
}
