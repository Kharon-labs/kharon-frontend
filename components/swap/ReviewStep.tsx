import { motion } from "framer-motion";
import { Token } from "@/interfaces/interfaces";

interface ReviewStepProps {
  payToken: Token;
  receiveToken: Token;
  payAmount: string;
  onReviewSwap: () => void;
}

export function ReviewStep({
  payToken,
  receiveToken,
  payAmount,
  onReviewSwap,
}: ReviewStepProps) {
  const receiveAmount = "17.234985";
  const usdValue = "17.45";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-xl text-white">Pay</h2>
        <div className="flex justify-between items-center">
          <button className="flex items-center space-x-2 px-4 py-2 bg-black rounded-lg border border-gray-800">
            <img
              src={payToken.icon}
              alt={payToken.symbol}
              className="w-5 h-5"
            />
            <span className="text-white">{payToken.symbol}</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="text-right">
            <div className="text-2xl text-white">{payAmount}</div>
            <div className="text-sm text-gray-400">
              ${(parseFloat(payAmount) * payToken.price).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl text-white">Receive</h2>
        <div className="flex justify-between items-center">
          <button className="flex items-center space-x-2 px-4 py-2 bg-black rounded-lg border border-gray-800">
            <img
              src={receiveToken.icon}
              alt={receiveToken.symbol}
              className="w-5 h-5"
            />
            <span className="text-white">{receiveToken.symbol}</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="text-right">
            <div className="text-2xl text-white">{receiveAmount}</div>
            <div className="text-sm text-gray-400">${usdValue}</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Rate</span>
          <span className="text-white">1 STRK = 0.4317 USDT</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Swap Fee</span>
          <span className="text-white">0.15%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Min Received(incl Fees)</span>
          <span className="text-white">17.2698 USDT</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Max Slippage</span>
          <span className="text-white">0.5%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Providers</span>
          <span className="text-white">Nostra, Ekubo.Nostra</span>
        </div>
      </div>

      <button
        onClick={onReviewSwap}
        className="w-full py-4 gradient-border-form rounded-xl text-white font-medium"
      >
        Review Swap
      </button>
    </motion.div>
  );
}
