import axios from "axios";
import { Wallet } from "@/lib/types/wallet";

const API_BASE_URL = "https://kharon-crawler.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface AddWalletPayload {
  user_id: string;
  wallet_address: string;
  network: string;
}

interface DeleteWalletPayload {
  user_id: string;
  wallet_address: string;
}

interface UpdateWalletPayload {
  user_id: string;
  wallet_address: string;
  new_network: string;
}

export const WalletService = {
  async addWallet(payload: AddWalletPayload): Promise<Wallet> {
    try {
      const { data } = await api.post<Wallet>("/user/wallets", payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to add wallet"
        );
      }
      throw error;
    }
  },

  async deleteWallet(payload: DeleteWalletPayload): Promise<void> {
    try {
      await api.delete("/user/wallets", { data: payload });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to delete wallet"
        );
      }
      throw error;
    }
  },

  async updateWallet(payload: UpdateWalletPayload): Promise<Wallet> {
    try {
      const { data } = await api.patch<Wallet>("/user/wallets", payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to update wallet"
        );
      }
      throw error;
    }
  },

  async fetchWallets(userId: string): Promise<Wallet[]> {
    try {
      const { data } = await api.get<Wallet[]>(`/user/wallets/by-id/${userId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch wallets"
        );
      }
      throw error;
    }
  },
};
