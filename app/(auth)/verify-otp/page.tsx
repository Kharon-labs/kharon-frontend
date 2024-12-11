"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/auth-layout";
import { OTPInput } from "@/components/auth/otp-input";
import { verifyOTP, resendOTP } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { Icons } from "@/components/icons";
import { getCurrentUser } from "@/lib/services/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Suspense } from "react";
import {
  type OTPInput as OTPInputType,
  otpSchema,
} from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Icons.spinner className="h-6 w-6 animate-spin" />
  </div>
);

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const form = useForm<OTPInputType>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  if (!email) {
    router.push("/login");
    return null;
  }

  async function onSubmit(data: OTPInputType) {
    setIsLoading(true);
    try {
      const response = await verifyOTP(data);
      setToken(response.token);

      const userDetails = await getCurrentUser(email, response.token);
      setUser(userDetails);

      router.push("/dashboard");
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "OTP verification failed",
      });
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOTP() {
    setIsLoading(true);
    try {
      await resendOTP(email);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Failed to resend OTP",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the verification code sent to your email"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <OTPInput onComplete={field.onChange} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-sm text-red-500 text-center">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Verify Code
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleResendOTP}
            disabled={isLoading}
            type="button"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Resend Code
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyOTPContent />
    </Suspense>
  );
}
