import React from "react";
import { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import PartnerCompanies from "../components/home/PartnerCompanies";
import ProductCards from "../components/home/ProductCards";
import MiningLocations from "../components/home/MiningLocations";
import FAQ from "../components/home/FAQ";
import Achievements from "../components/home/Achievements";
import Gallery from "../components/home/Gallery";
import Calculator from "../components/home/Calculator";
import WhyCryptonite from "../components/home/WhyCryptonite";
import MiningNews from "../components/home/MiningNews";
import Blogs from "../components/home/Blogs";
import Testimonials from "../components/home/Testimonials";
import ContactForm from "../components/about/ContactForm";
import CoinTicker from "../components/home/CoinTicker";
import MinerProfitability from "../components/home/MinerProfitability";
import AsicTopMiners from "../components/home/AsicTopMiners";
import AnnouncementBar from "../components/header/AnnouncementBar";
import BundleProductsSection from "../components/home/BundleProductsSection";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (window.location.hash === "#faq") {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div>
      <HeroSection />
      <CoinTicker />
      <Achievements />
      <AsicTopMiners />
      <ProductCards />
      <MiningLocations />
      <BundleProductsSection />
      <WhyCryptonite />
      {/* <MinerProfitability/> */}

      <MiningNews />
      <Blogs />
      {/* <PartnerCompanies/>  */}

      {/* <Calculator/> */}
      {/* <Gallery/> */}
      <Testimonials />
      <section id="faq">
        <FAQ />
      </section>
      <ContactForm />
    </div>
  );
};

export default HomePage;
