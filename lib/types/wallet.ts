export interface Wallet {
  address: string;
  network: string;
  userId: string;
  lastTransaction?: string;
  transactionCount?: number;
}
