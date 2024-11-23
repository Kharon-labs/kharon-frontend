"use client";

import { useEffect, useState } from "react";
import Cryptocurrency from "@/components/crypto/Cryptocurrency";
import Favorites from "@/components/crypto/Favorites";
import Exchanges from "@/components/crypto/Exchanges";
import { fetchCoins, fetchExchanges } from "../../../lib/coingecko";
import { Coin } from "@/interfaces/interfaces";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { RiExchangeLine } from "react-icons/ri";

const CryptocurrencyPage = () => {
  const [activeTab, setActiveTab] = useState<
    "cryptocurrencies" | "favorites" | "exchanges"
  >("cryptocurrencies");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    fetchCoins().then((data) => setCoins(data));
    fetchExchanges().then((data) => setExchanges(data));
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((coinId) => coinId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8">
        <div className=" flex items-center">
          <button
            className={` p-2 flex items-center hover:text-[#009FDF] mr-2 group relative ${
              activeTab === "cryptocurrencies"
                ? "text-[#009FDF]"
                : "text-[#fff] "
            } `}
            onClick={() => setActiveTab("cryptocurrencies")}
          >
            <HiOutlineCurrencyDollar className=" mr-2 text-xl sm:text-2xl lg:text-4xl mb-4" />
            <h1 className="text-2xl font-semibold font-poppins mb-4 ">
              Cryptocurrencies
            </h1>
            <span className=" absolute right-[15px] bottom-[15px] w-[85%] h-[1px] bg-[#009FDF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>

          <button
            className={` p-2 flex items-center hover:text-[#009FDF] mr-2 group relative ${
              activeTab === "favorites" ? "text-[#009FDF]" : "text-[#fff] "
            } `}
            onClick={() => setActiveTab("favorites")}
          >
            <MdOutlineStarBorderPurple500 className=" mr-2 text-xl sm:text-2xl lg:text-4xl mb-4" />
            <h1 className="text-2xl font-semibold font-poppins mb-4">
              Favorite
            </h1>
            <span className=" absolute right-[15px] bottom-[15px] w-[75%] h-[1px] bg-[#009FDF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>

          <button
            className={` p-2 flex items-center hover:text-[#009FDF] mr-2 group relative ${
              activeTab === "exchanges" ? "text-[#009FDF]" : "text-[#fff] "
            } `}
            onClick={() => setActiveTab("exchanges")}
          >
            <RiExchangeLine className=" mr-2 text-xl sm:text-2xl lg:text-4xl mb-4" />
            <h1 className="text-2xl font-semibold font-poppins mb-4">
              Exchange
            </h1>
            <span className=" absolute right-[15px] bottom-[15px] w-[75%] h-[1px] bg-[#009FDF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          {/* <button
            className={`px-4 py-2 ${
              activeTab === "cryptocurrencies" ? "bg-blue-500" : "bg-gray-700"
            } rounded`}
            onClick={() => setActiveTab("cryptocurrencies")}
          >
            Cryptocurrencies
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "favorites" ? "bg-blue-500" : "bg-gray-700"
            } rounded`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "exchanges" ? "bg-blue-500" : "bg-gray-700"
            } rounded`}
            onClick={() => setActiveTab("exchanges")}
          >
            Exchanges
          </button> */}
        </div>

        {activeTab === "cryptocurrencies" && (
          <Cryptocurrency coins={coins} handleSetFavorites={toggleFavorite} />
        )}
        {activeTab === "favorites" && (
          <Favorites coins={coins} favorites={favorites} />
        )}
        {activeTab === "exchanges" && <Exchanges exchanges={exchanges} />}
      </div>
    </div>
  );
};

export default CryptocurrencyPage;
