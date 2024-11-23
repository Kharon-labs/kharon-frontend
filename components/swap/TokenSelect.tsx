"use client";

import { useState, useRef, useEffect } from "react";
import { Token } from "@/interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";

interface TokenSelectProps {
  tokens: Token[];
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
}

export function TokenSelect({
  tokens,
  selectedToken,
  onSelect,
}: TokenSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (token: Token) => {
    onSelect(token);
    setIsOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-black hover:bg-gray-900 transition-colors border border-gray-800"
      >
        {selectedToken ? (
          <>
            <Image
              src={selectedToken.icon}
              alt={selectedToken.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="font-medium">{selectedToken.symbol}</span>
          </>
        ) : (
          <span className="text-gray-400">Select Token</span>
        )}
        <svg
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "transform rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-full min-w-[320px] right-0 rounded-lg bg-black border border-gray-800 shadow-lg"
          >
            <div className="p-3 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tokens..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto no-scrollbar">
              <div className="p-2 space-y-1">
                {tokens.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">
                    Loading tokens...
                  </div>
                ) : filteredTokens.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">
                    No tokens found
                  </div>
                ) : (
                  filteredTokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => handleSelect(token)}
                      className="w-full flex items-center p-2 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={token.icon}
                          alt={token.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0 mx-3">
                        <div className="flex flex-col items-start">
                          <span className="font-medium truncate w-full">
                            {token.symbol}
                          </span>
                          <span className="text-sm text-gray-400 truncate w-full">
                            {token.name}
                          </span>
                        </div>
                      </div>
                      {token.price && (
                        <div className="flex-shrink-0 text-sm text-gray-400 min-w-[80px] text-right">
                          ${token.price.toFixed(2)}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
