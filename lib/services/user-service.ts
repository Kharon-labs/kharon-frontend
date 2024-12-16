import axios from "axios";
import { User } from "@/lib/types/user";

const API_BASE_URL = "https://kharon-crawler.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CreateUserPayload {
  name: string;
  email: string;
}

export const UserService = {
  async createUser(payload: CreateUserPayload): Promise<User> {
    try {
      const { data } = await api.post<User>("/user", payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to create user"
        );
      }
      throw error;
    }
  },
  async getUserByEmail(email: string): Promise<User> {
    try {
      const { data } = await api.get<User>(`/user/by-email/${email}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch user profile"
        );
      }
      throw error;
    }
  },
};
