import Image from "next/image";

const Hero = () => {
  return (
    <section className=" bg-[#000] text-[#fff] py-10 lg:py-20">
      <div className=" container mx-auto flex flex-col items-center justify-between px-4 lg:px-8 md:flex-row">
        <div className=" text-center md:text-left space-y-6 max-w-3xl">
          <p className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-inria">
            Manage All <span className="gradient-text">Your Wallets</span> &
            <br /> Exchanges From One Place{" "}
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#fff] mt-4 font-poppins">
            Connect Your Entire Portfolio To Track, Buy, Swap, And Stake Your
            Assets.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 items-center md:items-start justify-center md:justify-start space-y-4 sm:space-y-0">
            <button className="px-6 py-3 bg-[#009fdf] hover:bg-[#ff00bc] text-black text-sm md:text-lg font-semibold rounded-lg font-poppins">
              Get Started
            </button>
            <button className="px-6 py-3 text-white text-sm md:text-lg font-semibold bg-black border border-white hover:border-black rounded-lg font-poppins">
              Log In
            </button>
          </div>
        </div>
        <div className="mt-10 md:mt-0 lg:w-1/2">
          <div className="hover:animate-pulse">
            <Image
              src="/bloom.jpeg"
              alt="hero image"
              width={800}
              height={500}
              className="floating-object mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
