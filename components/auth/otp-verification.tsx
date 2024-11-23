"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { verifyOTP, resendOTP } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { IoArrowBack } from "react-icons/io5";

interface OTPVerificationProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function OTPVerification({
  email,
  onSuccess,
  onBack,
}: OTPVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!otp) {
        toast.error("Please enter the verification code");
        return;
      }

      await verifyOTP({ email, otp });
      toast.success("Email verified successfully!");
      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Invalid verification code");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOTP() {
    setIsResending(true);
    try {
      await resendOTP(email);
      toast.success("New verification code sent!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to resend code");
      }
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        className="text-gray-400 hover:text-white p-0"
        onClick={onBack}
      >
        <IoArrowBack className="h-6 w-6" />
      </Button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter verification code"
          className="h-12 bg-[#1a2332] border-[#2a3543] text-white"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-[#3898FF] hover:bg-[#3898FF]/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Verifying...</span>
            </div>
          ) : (
            "Verify"
          )}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResending}
            className="text-[#3898FF] hover:text-[#3898FF]/90 text-sm"
          >
            {isResending ? "Sending..." : "Resend Code"}
          </button>
        </div>
      </form>
    </div>
  );
}
