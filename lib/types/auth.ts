import { User } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  password2: string;
}

export interface ResetPasswordCredentials {
  email: string;
  password: string;
  password2: string;
  token: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type AuthErrorCode =
  | "invalid_credentials"
  | "email_not_verified"
  | "invalid_token"
  | "expired_token"
  | "invalid_otp"
  | "expired_otp";
