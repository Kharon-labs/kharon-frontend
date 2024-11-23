import Link from "next/link";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { CgFacebook } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className=" bg-[#000] text-[#fff] py-8">
      <div className="flex flex-col max-w-[1536px] mx-auto px-4 py-4 sm:px-6 lg:px-8 font-poppins">
        {/* "Stay in Touch" Text */}
        <div className="flex items-center justify-center py-4">
          <p className="font-poppins text-center text-base md:text-lg">
            Stay in Touch
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center space-x-6 sm:space-x-10 lg:space-x-24 mb-6 px-6 sm:px-12 lg:px-20">
          <Link href="#" className="hover:text-gray-400">
            <FaTwitter className="text-xl sm:text-2xl lg:text-4xl" />
          </Link>
          <Link href="#" className="hover:text-gray-400">
            <AiFillInstagram className="text-xl sm:text-2xl lg:text-4xl" />
          </Link>
          <Link href="#" className="hover:text-gray-400">
            <FaTelegramPlane className="text-xl sm:text-2xl lg:text-4xl" />
          </Link>
          <Link href="#" className="hover:text-gray-400">
            <CgFacebook className="text-xl sm:text-2xl lg:text-4xl" />
          </Link>
          <Link href="#" className="hover:text-gray-400">
            <FaLinkedinIn className="text-xl sm:text-2xl lg:text-4xl" />
          </Link>
          <Link href="#" className="hover:text-gray-400">
            <FaYoutube className="text-xl sm:text-2xl lg:text-4xl" />
          </Link>
          <Link href="#" className="hover:text-gray-400">
            <MdEmail className="text-xl sm:text-2xl lg:text-4xl" />
          </Link>
        </div>
      </div>

      <hr className=" border-gray-700 mb-6" />

      <div className=" max-w-7xl font-poppins mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        <div>
          <h3 className="text-[#009FDF] mb-4 font-bold text-lg sm:text-xl lg:text-2xl">
            Explore
          </h3>

          <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Crypto Portfolio Tracker
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Swap
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Earn
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Crypto News
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                DeFi Portfolio Tracker
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Starknet Wallet Tracker
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Solana Wallet Tracker
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Cosmos Wallet Tracker
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Ethereum Wallet Tracker
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                TON Wallet Tracker
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#009FDF] mb-4 font-bold text-lg sm:text-xl lg:text-2xl">
            Company
          </h3>
          <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Product Update
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Press Kit
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                APT Docs
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Public API Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                CoinStats News Feed
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Solana Wallet Tracker
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Cosmos Wallet Tracker
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#009FDF] mb-4 font-bold text-lg sm:text-xl lg:text-2xl">
            Support
          </h3>
          <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                How To Connect Exchange And Wallets
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                How To Track Your DeFi Assets
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Learn About Profit/Loss Calculations
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                How To Swap
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                How To Trade On CoinStats
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <h3 className="text-[#009FDF] mb-4 font-bold text-lg sm:text-xl lg:text-2xl">
            Policies
          </h3>
          <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Disclaimer
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-400 text-sm sm:text-base lg:text-lg"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
