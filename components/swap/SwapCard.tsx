"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Token, SwapStep } from "@/interfaces/interfaces";
import { SelectStep } from "./SelectStep";
import { ReviewStep } from "./ReviewStep";
import { ConfirmStep } from "./ConfirmStep";
import { getTokens } from "@/lib/coingecko";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingSpinner } from "../ui/loading-spinner";
import { ErrorFallback } from "./ErrorFallback";

// const TOKENS: Token[] = [
//   { symbol: "STRK", icon: "/icons/strk.svg", name: "Strike", price: 0.4317 },
//   { symbol: "USDT", icon: "/icons/usdt.svg", name: "Tether USD", price: 1.0 },
// ];

export function SwapCard() {
  const [step, setStep] = useState<SwapStep>("select");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [payToken, setPayToken] = useState<Token | null>(null);
  const [receiveToken, setReceiveToken] = useState<Token | null>(null);
  const [payAmount, setPayAmount] = useState<string>("");

  const {
    data: tokens,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: getTokens,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const handleConnect = () => setIsWalletConnected(true);

  const handleSelectPayCoin = () => {
    if (payToken && receiveToken && payAmount) setStep("review");
  };

  const handleReviewSwap = () => setStep("confirm");
  const handleReject = () => setStep("select");

  const handleConfirm = () => {
    console.log("Swap confirmed");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ErrorFallback
          error={error as Error}
          resetErrorBoundary={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="w-full max-w-2xl gradient-border-swap p-10">
          <div className="relative p-6">
            <AnimatePresence mode="wait">
              {step === "select" && (
                <SelectStep
                  key="select"
                  isWalletConnected={isWalletConnected}
                  onConnect={handleConnect}
                  payToken={payToken}
                  receiveToken={receiveToken}
                  payAmount={payAmount}
                  setPayToken={setPayToken}
                  setReceiveToken={setReceiveToken}
                  setPayAmount={setPayAmount}
                  onSelectPayCoin={handleSelectPayCoin}
                  tokens={tokens || []}
                />
              )}

              {step === "review" && (
                <ReviewStep
                  key="review"
                  payToken={payToken!}
                  receiveToken={receiveToken!}
                  payAmount={payAmount}
                  onReviewSwap={handleReviewSwap}
                />
              )}

              {step === "confirm" && (
                <ConfirmStep
                  key="confirm"
                  payToken={payToken!}
                  receiveToken={receiveToken!}
                  payAmount={payAmount}
                  onReject={handleReject}
                  onConfirm={handleConfirm}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
