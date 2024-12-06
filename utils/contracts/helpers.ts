import { uint256 } from "starknet";

export function toUint256(value: number | string) {
  return uint256.bnToUint256(value.toString());
}

export function fromUint256(value: { low: string; high: string }) {
  return uint256.uint256ToBN({ low: value.low, high: value.high });
}
