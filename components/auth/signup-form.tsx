"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SocialAuth } from "./social-auth";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";
import { signupUser } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/use-auth-store";

interface SignUpFormProps {
  onSuccess: (email: string) => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }

      const { user, token } = await signupUser(formData);
      setUser(user);
      setToken(token);
      toast.success("Signup successful! Please verify your email.");
      onSuccess(formData.email);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-lg font-medium">Email Or Username</label>
        <Input
          type="email"
          placeholder="user@mail.com"
          className="h-12 bg-[#1a2332] border-[#2a3543] text-white"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-medium">Create Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-12 bg-[#1a2332] border-[#2a3543] text-white pr-10"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-[#3898FF] hover:bg-[#3898FF]/90"
        disabled={isLoading}
      >
        Continue
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#2a3543]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-[#1a2332] px-4 text-gray-400">OR</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-[#2a3543] text-white hover:bg-[#2a3543]/50"
      >
        Continue With Wallet
      </Button>

      <SocialAuth />
    </form>
  );
}
