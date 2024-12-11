import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/(auth)/login/page";
import SignupPage from "@/app/(auth)/signup/page";
import VerifyOTPPage from "@/app/(auth)/verify-otp/page";
import RequestResetPage from "@/app/(auth)/reset-password/page";
import ResetPasswordPage from "@/app/(auth)/reset-password/[token]/page";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import * as authService from "@/lib/services/auth-service";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("test@example.com"),
  }),
}));

// Mock auth store
jest.mock("@/lib/stores/use-auth-store", () => ({
  useAuthStore: jest.fn(() => ({
    user: null,
    setUser: jest.fn(),
    setToken: jest.fn(),
    // add any other methods/properties your store uses
  })),
}));

// Mock auth service
jest.mock("@/lib/services/auth-service");

describe("Auth Flow Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Login Page", () => {
    it("handles successful login", async () => {
      render(<LoginPage />);

      fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
        target: { value: "password123" },
      });

      (authService.loginUser as jest.Mock).mockResolvedValueOnce({});

      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(authService.loginUser).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "password123",
        });
      });
    });

    it("displays validation errors", async () => {
      render(<LoginPage />);

      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });
  });

  describe("Signup Page", () => {
    it("handles successful signup", async () => {
      render(<SignupPage />);

      fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/create password/i), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
        target: { value: "password123" },
      });

      (authService.signupUser as jest.Mock).mockResolvedValueOnce({});

      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

      await waitFor(() => {
        expect(authService.signupUser).toHaveBeenCalled();
      });
    });
  });

  describe("Verify OTP Page", () => {
    it("handles successful OTP verification", async () => {
      render(<VerifyOTPPage />);

      // Fill in OTP inputs
      const otpInputs = screen.getAllByRole("textbox");
      otpInputs.forEach((input) => {
        fireEvent.change(input, { target: { value: "1" } });
      });

      // Click the verify button
      const verifyButton = screen.getByRole("button", { name: /verify code/i });
      fireEvent.click(verifyButton);

      await waitFor(() => {
        expect(authService.verifyOTP).toHaveBeenCalled();
      });
    });
  });

  describe("Reset Password Flow", () => {
    it("handles password reset request", async () => {
      render(<RequestResetPage />);

      fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), {
        target: { value: "test@example.com" },
      });

      (authService.requestPasswordReset as jest.Mock).mockResolvedValueOnce({});

      fireEvent.click(screen.getByRole("button", { name: /send reset link/i }));

      await waitFor(() => {
        expect(authService.requestPasswordReset).toHaveBeenCalled();
      });
    });

    it("handles password reset with token", async () => {
      render(
        <ResetPasswordPage
          params={{ token: "test-token" }}
          searchParams={{ email: "test@example.com" }}
        />
      );

      const newPasswordInput =
        screen.getByPlaceholderText(/enter new password/i);
      const confirmPasswordInput =
        screen.getByPlaceholderText(/confirm new password/i);

      fireEvent.change(newPasswordInput, {
        target: { value: "newpassword123" },
      });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "newpassword123" },
      });

      (authService.resetPassword as jest.Mock).mockResolvedValueOnce({});

      fireEvent.click(screen.getByRole("button", { name: /reset password/i }));

      await waitFor(() => {
        expect(authService.resetPassword).toHaveBeenCalled();
      });
    });
  });
});
