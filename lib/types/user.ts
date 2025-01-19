export interface User {
  user_uuid: string;
  email: string;
  name?: string;
  isVerified: boolean;
  provider?: "google" | "email";
  token?: string;
}
