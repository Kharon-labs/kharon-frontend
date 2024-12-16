import axios from "axios";
import { User } from "@/lib/stores/use-auth-store";

const API_URL = "https://kharon-server.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface AuthResponse {
  user: User;
  token: string;
}

export async function signupUser({
  email,
  password,
  password2,
}: {
  email: string;
  password: string;
  password2: string;
}): Promise<AuthResponse> {
  try {
    const { data } = await api.post("/api/v1/auth/signup", {
      email,
      password,
      password2,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    const { data } = await api.post("/user/login", {
      email,
      password,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function verifyOTP({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<AuthResponse> {
  try {
    const { data } = await api.post("/api/v1/auth/verifyOTP", {
      email,
      otp,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
}

export async function resendOTP(email: string): Promise<void> {
  try {
    await api.post("/user/sendOTP", { email });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to resend OTP");
  }
}

export async function getCurrentUser(
  email: string,
  token: string
): Promise<User> {
  try {
    const { data } = await api.get("/user/dashboard", {
      params: { email },
      headers: {
        token: token,
      },
    });

    return data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user details"
    );
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  try {
    await api.post("/api/v1/auth/requestResetPassword", {
      email,
      redirectUrl: `${window.location.origin}/reset-password`,
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to request password reset"
    );
  }
}

export async function resetPassword({
  email,
  password,
  password2,
  token,
}: {
  email: string;
  password: string;
  password2: string;
  token: string;
}): Promise<void> {
  try {
    await api.post("/api/v1/auth/resetPassword", {
      email,
      password,
      password2,
      token,
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
}

export async function logoutUser(email: string, token: string): Promise<void> {
  try {
    await api.post(
      "/user/logout",
      { email },
      {
        headers: { token },
      }
    );
    window.location.href = "/";
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
}

export async function loginWithGoogle(): Promise<AuthResponse> {
  window.location.href = `${API_URL}/user/google`;
  return new Promise(() => {});
}

export async function logoutFromGoogle(): Promise<void> {
  try {
    await api.post("/user/google/logout");
    window.location.href = "/";
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Google logout failed");
  }
}
