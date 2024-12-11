export interface User {
  id: string;
  email: string;
  name?: string;
  isVerified: boolean;
  provider?: "google" | "email";
  token?: string;
}
