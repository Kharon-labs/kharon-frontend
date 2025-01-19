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

const parseUserResponse = (data: any): User | null => {
  try {
    if (typeof data === "object" && data !== null) {
      return data as User;
    }

    if (typeof data === "string") {
      try {
        const jsonData = JSON.parse(data);
        return jsonData as User;
      } catch {
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
      }
    }

    return null;
  } catch (error) {
    console.error("Error parsing user response:", error, "Raw data:", data);
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
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await api.get(`/user/by-email/${email}`);
      console.log("Raw API response:", response.data);

      const parsedUser = parseUserResponse(response.data);
      if (!parsedUser) {
        throw new Error("Failed to parse user data");
      }
      return parsedUser;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.log("User not found, will create new user");
          return null;
        }

        console.error("API Error:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
        throw new Error(
          error.response?.data?.message ||
            `Failed to fetch user profile: ${error.message}`
        );
      }
      throw error;
    }
  },
};
