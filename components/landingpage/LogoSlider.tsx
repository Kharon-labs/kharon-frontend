import Image from "next/image";
import React from "react";

const LogoSlider = () => {
  return (
    <div className="overflow-hidden bg-[#000] py-6">
      <div className="flex justify-center space-x-8 sm:space-x-10 lg:space-x-16 items-center whitespace-nowrap animate-scroll">
        {/* Metamask */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/metamask.png"
            alt="Metamask"
            layout="responsive"
            width={100}
            height={100}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Etoro */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/etoro.png"
            alt="Etoro"
            layout="responsive"
            width={100}
            height={100}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Degiro */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/degiro.png"
            alt="Degiro"
            layout="responsive"
            width={100}
            height={100}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Binance */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/binance.png"
            alt="Binance"
            layout="responsive"
            width={100}
            height={50}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Ameritrade */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/ameritrade.png"
            alt="Ameritrade"
            layout="responsive"
            width={100}
            height={50}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Coinbase */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/coinbase.png"
            alt="Coinbase"
            layout="responsive"
            width={100}
            height={50}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Crypto.com */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/cryptocom.png"
            alt="Crypto.com"
            layout="responsive"
            width={100}
            height={50}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Kucoin */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/kucoin.png"
            alt="Kucoin"
            layout="responsive"
            width={100}
            height={50}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Robinhood */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/robinhood.png"
            alt="Robinhood"
            layout="responsive"
            width={100}
            height={50}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>

        {/* Trade Republic */}
        <div className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center">
          <Image
            src="/trade_republic.png"
            alt="Trade Republic"
            layout="responsive"
            width={100}
            height={50}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
