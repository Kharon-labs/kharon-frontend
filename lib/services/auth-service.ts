import { User } from "@/lib/stores/use-auth-store";

const API_URL = "https://kharon-server.onrender.com";

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
  const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, password2 }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return response.json();
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
}

export async function verifyOTP({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/v1/auth/verifyOTP`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "OTP verification failed");
  }

  return response.json();
}

export async function resendOTP(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/user/sendOTP`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to resend OTP");
  }
}

export async function getCurrentUser(
  email: string,
  token: string
): Promise<User> {
  console.log("getCurrentUser called with:", {
    email,
    token,
    url: `${API_URL}/user/dashboard?email=${encodeURIComponent(email)}`,
  });

  const response = await fetch(
    `${API_URL}/user/dashboard?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        token: token,
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Dashboard API Error:", {
      status: response.status,
      error,
      headers: Object.fromEntries(response.headers.entries()),
    });
    throw new Error(error.message || "Failed to fetch user details");
  }

  const userData = await response.json();
  console.log("Dashboard API Success Response:", userData);
  return userData;
}

export async function requestPasswordReset(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/auth/requestResetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      redirectUrl: `${window.location.origin}/reset-password`,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to request password reset");
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
  const response = await fetch(`${API_URL}/api/v1/auth/resetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, password2, token }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Password reset failed");
  }
}

export async function logoutUser(email: string, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ email }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Logout failed");
  }

  window.location.href = "/";
}

export async function loginWithGoogle(): Promise<AuthResponse> {
  window.location.href = `${API_URL}/user/google`;
  return new Promise(() => {});
}

export async function logoutFromGoogle(): Promise<void> {
  const response = await fetch(`${API_URL}/user/google/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Google logout failed");
  }

  window.location.href = "/";
}
