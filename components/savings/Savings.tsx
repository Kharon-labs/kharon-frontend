"use client";

import { RefreshCw } from "lucide-react";
import { SiWindows } from "react-icons/si";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";

const Savings = () => {
  return (
    <div className=" container mx-auto p-4 px-14 ">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-4">Savings</h1>
            <div className="flex items-center gap-2">
              <p className="text-gray-400">Total Savings :</p>
              <span className="text-3xl text-white">$51,509.90</span>
              <button className="p-1">
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/savings/deposit"
              className="px-8 py-3 bg-[#009FDF] hover:bg-[#007edf] text-[#000] rounded-xl font-medium"
            >
              Deposit
            </Link>
            <Link
              href="/savings/withdraw"
              className="px-8 py-3 border border-white rounded-xl text-[#fff] hover:text-gray-300 font-medium"
            >
              Withdraw
            </Link>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A1A] text-white">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            </div>
            All Networks
            <RiArrowDropDownLine />
          </button>
        </div>

        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Name</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">24th Changer</th>
                <th className="pb-4">Price</th>
                <th className="pb-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-gray-800">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="/tokens/strk.png"
                      alt="STRK"
                      className="w-6 h-6"
                    />
                    <span className="font-medium">STRK</span>
                  </div>
                </td>
                <td>20.86</td>
                <td>
                  <span className="px-2 py-1 bg-red-900/50 text-red-500 rounded">
                    -0.05%
                  </span>
                </td>
                <td>$4,171.68</td>
                <td className="text-right">$60,298.0</td>
              </tr>
              <tr className="border-t border-gray-800">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="/tokens/btc.png"
                      alt="Bitcoin"
                      className="w-6 h-6"
                    />
                    <span className="font-medium">Bitcoin</span>
                    <span className="text-gray-400">.BTC</span>
                  </div>
                </td>
                <td>15.86</td>
                <td>
                  <span className="px-2 py-1 bg-red-900/50 text-red-500 rounded">
                    -0.02%
                  </span>
                </td>
                <td>$3,171.68</td>
                <td className="text-right">$50,298.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Savings;
