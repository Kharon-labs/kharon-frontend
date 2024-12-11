"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { OTPVerification } from "@/components/auth/otp-verification";
import { useState } from "react";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { useRouter } from "next/navigation";

interface SignupFormProps {
  onSuccess: (userEmail: string) => void;
}

export function AuthModal() {
  const router = useRouter();
  const { isModalOpen, setIsModalOpen, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  function handleAuthSuccess(userEmail: string) {
    setEmail(userEmail);
    if (user && !user.emailVerified) {
      setShowOTP(true);
    } else {
      handleClose();
      router.push("/dashboard");
    }
  }

  function handleVerificationSuccess() {
    handleClose();
    router.push("/dashboard");
  }

  function handleClose() {
    setIsModalOpen(false);
    setShowOTP(false);
    setEmail("");
    setActiveTab("login");
  }

  if (showOTP) {
    return (
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-[#1a2332] border-none p-0 text-white w-full max-w-[400px]">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Verify Your Email</h2>
            <p className="text-gray-400 mb-6">
              We've sent a verification code to {email}
            </p>
            <OTPVerification
              email={email}
              onSuccess={handleVerificationSuccess}
              onBack={() => setShowOTP(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#1a2332] border-none p-0 text-white w-full max-w-[400px]">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "login" | "signup")}
        >
          <TabsList className="grid grid-cols-2 bg-transparent h-14">
            <TabsTrigger
              value="login"
              className="data-[state=active]:text-[#3898FF] data-[state=active]:border-b-2 data-[state=active]:border-[#3898FF] text-xl font-normal"
            >
              Log In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:text-[#3898FF] data-[state=active]:border-b-2 data-[state=active]:border-[#3898FF] text-xl font-normal"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="px-6 pb-6">
            <LoginForm onSuccess={handleAuthSuccess} />
          </TabsContent>
          <TabsContent value="signup" className="px-6 pb-6">
            <SignupForm
              onSuccess={() => handleAuthSuccess("user@example.com")}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
