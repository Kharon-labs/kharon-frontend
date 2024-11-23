import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import LogoSlider from "./LogoSlider";
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Hero />
      <LogoSlider />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
