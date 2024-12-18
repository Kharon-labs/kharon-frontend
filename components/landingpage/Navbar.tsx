"use client";

import Link from "next/link";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { ImCoinYen } from "react-icons/im";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { logoutUser } from "@/lib/services/auth-service";
import { logoutFromGoogle } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/use-auth-store";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { user: userStore, setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLaunchApp() {
    if (isAuthenticated && user) {
      router.push("/dashboard");
      return;
    }
    router.push("/login");
  }

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      if (user?.provider === "google") {
        await logoutFromGoogle();
      } else if (user?.email && user?.token) {
        await logoutUser(user.email, user.token);
      }
      setUser(null);
      setToken(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-[#000] text-[#fff]">
      <div className="max-w-[1536px] mx-auto px-4 py-4 sm:px-6 lg:px-8 font-poppins">
        <div className="flex justify-between items-center py-4">
          {/* logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-inriaSans font-bold text-[#009FDF]"
            >
              Kharon
            </Link>
          </div>

          {/* Nav Links */}
          <ul className="hidden lg:flex items-center space-x-6 text-lg font-semibold">
            <li className="group hover:text-[#ff00bc]">
              <Link href="/porfolio-tracker" className="relative">
                Portfolio Tracker
                <span className="absolute left-[5px] bottom-[-2px] w-[90%] h-[1px] bg-[#ff00bc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
            <li className="group hover:text-[#ff00bc]">
              <Link href="/swap" className="relative">
                Swap
                <span className="absolute left-[2px] bottom-[-2px] w-[85%] h-[1px] bg-[#ff00bc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
            <li className="group hover:text-[#ff00bc]">
              <Link href="/cryptocurrencies" className="relative">
                Cryptocurrencies
                <span className="absolute left-[5px] bottom-[-2px] w-[90%] h-[1px] bg-[#ff00bc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
          </ul>

          {/* Search Bar, Login/User Info and Get Started Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="flex items-center bg-[#000] px-4 py-2 rounded-xl">
              <IoIosSearch className="text-[#fff] text-2xl" />
              <input
                type="text"
                placeholder="Asset, Wallets, ENS"
                className="bg-transparent text-white focus:outline-none ml-2 placeholder-gray-400"
              />
            </div>

            <button>
              <ImCoinYen className="text-2xl" />
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user?.username}</span>
                <button
                  onClick={() => router.push("/auth/logout")}
                  className="px-4 py-1 text-[#fff] font-semibold bg-[#000] border-[1px] hover:border-black border-white rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLaunchApp}
                  className="px-6 py-2 bg-[#009fdf] hover:bg-[#ff00bc] text-[#000] font-semibold rounded-lg"
                >
                  Launch App
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl text-[#fff] focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed top-0 right-0 z-50 bg-black bg-opacity-90 transition-transform transform translate-x-0 opacity-100"
            style={{ width: "300px", height: "80vh" }}
          >
            {/* Close Icon */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl text-white focus:outline-none"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col items-center justify-start space-y-4 pt-6">
              <div className="flex items-center bg-[#000] px-4 py-2 rounded-xl mb-4">
                <IoIosSearch className="text-[#fff] text-2xl" />
                <input
                  type="text"
                  placeholder="Assets, Wallets, ENS"
                  className="bg-transparent text-white focus:outline-none ml-2 placeholder-gray-400"
                />
              </div>

              <ul className="flex flex-col text-lg font-semibold space-y-10">
                <li>
                  <Link
                    href="/portfolio-tracker"
                    className="text-center border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                  >
                    Portfolio Tracker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/swap"
                    className="text-center border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                  >
                    Swap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cryptocurrencies"
                    className="text-center border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                  >
                    Cryptocurrencies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/currency"
                    className="text-center border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                  >
                    Currency <span className="ml-2">{">"}</span>
                  </Link>
                </li>
                {isAuthenticated ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-center border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => router.push("/auth/login")}
                        className="w-full text-center border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                      >
                        Login
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLaunchApp}
                        className="w-full text-center bg-[#009fdf] hover:bg-[#ff00bc] px-4 py-2 rounded-lg transition"
                      >
                        Launch App
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
