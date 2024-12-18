import Image from "next/image";
import React from "react";

const logos = [
  { src: "/metamask.png", alt: "Metamask" },
  { src: "/etoro.png", alt: "Etoro" },
  { src: "/degiro.png", alt: "Degiro" },
  { src: "/binance.png", alt: "Binance" },
  { src: "/ameritrade.png", alt: "Ameritrade" },
  { src: "/coinbase.png", alt: "Coinbase" },
  { src: "/cryptocom.png", alt: "Crypto.com" },
  { src: "/kucoin.png", alt: "Kucoin" },
  { src: "/robinhood.png", alt: "Robinhood" },
  { src: "/trade_republic.png", alt: "Trade Republic" },
];

const LogoSlider = () => {
  const LogoSet = () => (
    <div className="flex justify-center space-x-8 sm:space-x-10 lg:space-x-16 items-center whitespace-nowrap">
      {logos.map((logo, index) => (
        <div
          key={index}
          className="relative mx-3 sm:mx-6 w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-20 flex items-center justify-center"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            layout="responsive"
            width={100}
            height={100}
            objectFit="contain"
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-[#000] py-6 hover:[&>div]:animate-infinite-scroll-pause">
      <div className="relative flex w-[200%] animate-infinite-scroll">
        <LogoSet />
        <LogoSet />
      </div>
    </div>
  );
};

export default LogoSlider;
