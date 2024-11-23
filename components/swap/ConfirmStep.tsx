import { motion } from "framer-motion";
import { Token } from "@/interfaces/interfaces";

interface ConfirmStepProps {
  payToken: Token;
  receiveToken: Token;
  payAmount: string;
  onReject: () => void;
  onConfirm: () => void;
}

export function ConfirmStep({
  payToken,
  receiveToken,
  payAmount,
  onReject,
  onConfirm,
}: ConfirmStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gray-900">
          <img src="/logo.svg" alt="Logo" className="w-full h-full" />
        </div>
        <h1 className="text-xl font-semibold text-white">
          Swap {payToken.symbol} To {receiveToken.symbol}
        </h1>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg text-white">Pay</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={payToken.icon}
                alt={payToken.symbol}
                className="w-5 h-5"
              />
              <span className="text-white">{payToken.symbol}</span>
            </div>
            <div className="text-right">
              <div className="text-xl text-white">
                -{payAmount} {payToken.symbol}
              </div>
              <div className="text-sm text-gray-400">
                ${(parseFloat(payAmount) * payToken.price).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg text-white">Receive</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={receiveToken.icon}
                alt={receiveToken.symbol}
                className="w-5 h-5"
              />
              <span className="text-white">{receiveToken.symbol}</span>
            </div>
            <div className="text-right">
              <div className="text-xl text-[#009FDF]">
                +17.234985 {receiveToken.symbol}
              </div>
              <div className="text-sm text-gray-400">$17.45</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg text-white">Approve Spending Limit</h2>
          <h2 className="text-lg text-white">Swap Tokens</h2>
        </div>

        <div className="flex items-center justify-between bg-gray-900 rounded-lg px-4 py-3">
          <span className="text-gray-400">Estimated Fee</span>
          <div className="flex items-center space-x-1">
            <img
              src={payToken.icon}
              alt={payToken.symbol}
              className="w-4 h-4"
            />
            <span className="text-white">$0.037</span>
            <span className="text-gray-400">Max $0.11</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onReject}
            className="flex-1 py-3 bg-transparent border border-gray-600 rounded-xl text-white font-medium hover:bg-gray-900 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-[#009FDF] rounded-xl text-white font-medium hover:bg-[#0086BC] transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
}
