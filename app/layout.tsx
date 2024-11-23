import type { Metadata } from "next";
import { Poppins, Inria_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthModal } from "@/components/auth/auth-modal";
import { AuthProvider } from "./providers";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inriaSans = Inria_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inria",
  weight: ["300", "400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kharon",
  description: "Your one stop shop for all things DeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inriaSans.variable} ${inter.variable} bg-[#000] text-[#fff]`}
      >
        <AuthProvider>
          <Providers>
            <div className=" h-screen flex flex-row justify-start">
              <main className=" flex-1 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </Providers>
          <AuthModal />
          <Toaster theme="dark" position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
