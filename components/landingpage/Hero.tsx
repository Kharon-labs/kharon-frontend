"use client";

import Image from "next/image";
import { AnimatedHeroImage } from "./AnimatedHeroImage";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className=" bg-[#000] text-[#fff] py-10 lg:py-20">
      <div className=" container mx-auto flex flex-col items-center justify-between px-4 lg:px-8 md:flex-row">
        <div className=" text-center md:text-left space-y-6 max-w-3xl">
          <p className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-inria">
            Track All <span className="gradient-text">Your Assets</span> &
            <br /> Receive Notification Instantly{" "}
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#fff] mt-4 font-poppins">
            Connect Your Wallet To Track, Manage, And Get Notified For All
            Transactions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 items-center md:items-start justify-center md:justify-start space-y-4 sm:space-y-0">
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 bg-[#009fdf] hover:bg-[#ff00bc] text-black text-sm md:text-lg font-semibold rounded-lg font-poppins"
            >
              Launch App
            </button>
          </div>
        </div>
        <div className="mt-10 md:mt-0 lg:w-1/2">
          <AnimatedHeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
