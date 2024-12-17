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

const parseUserResponse = (data: string): User | null => {
  try {
    const cleanData = data.replace("User Profile: ", "");

    const match = cleanData.match(/User\s*{([^}]+)}/);
    if (!match) return null;

    const objContent = match[1];
    const pairs = objContent.split(",").map((pair) => pair.trim());

    const obj = {} as User;
    pairs.forEach((pair) => {
      const [key, value] = pair.split(":").map((s) => s.trim());
      const cleanKey = key.replace(/['"]/g, "");

      let processedValue;
      if (value === "[]") {
        processedValue = [];
      } else if (value.startsWith('"') && value.endsWith('"')) {
        processedValue = value.slice(1, -1);
      } else if (value === "null" || value === "undefined") {
        processedValue = null;
      } else {
        processedValue = value;
      }

      (obj as any)[cleanKey] = processedValue;
    });

    return obj;
  } catch (error) {
    console.error("Error parsing user response:", error);
    return null;
  }
};

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
      const { data } = await api.get<string>(`/user/by-email/${email}`);
      const parsedUser = parseUserResponse(data);
      if (!parsedUser) {
        throw new Error("Failed to parse user data");
      }
      return parsedUser;
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
