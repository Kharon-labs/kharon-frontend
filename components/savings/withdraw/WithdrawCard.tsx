"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Token } from "@/interfaces/interfaces";
import { getTokens } from "@/lib/coingecko";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorFallback } from "@/components/swap/ErrorFallback";
import { WithdrawStep } from "./WithdrawStep";

export function WithdrawCard() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>("");

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorFallback
        error={error as Error}
        resetErrorBoundary={() => refetch()}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl gradient-border-swap p-10">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="relative p-6">
          <WithdrawStep
            selectedToken={selectedToken}
            amount={amount}
            setSelectedToken={setSelectedToken}
            setAmount={setAmount}
            tokens={tokens || []}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}
