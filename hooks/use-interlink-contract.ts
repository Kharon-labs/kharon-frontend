"use client";

import { useContract } from "@starknet-react/core";
import { INTERLINK_ABI, INTERLINK_ADDRESS } from "@/utils/contracts/interlink";

export function useInterlinkContract() {
  return useContract({
    abi: INTERLINK_ABI,
    address: INTERLINK_ADDRESS,
  });
}
