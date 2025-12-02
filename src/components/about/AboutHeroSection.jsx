import React from "react";
import { FaServer, FaBolt, FaGlobeEurope, FaPercent } from "react-icons/fa";

const AboutHeroSection = () => {
  return (
    <section className="bg-white text-black py-20 px-6 md:px-16">

      {/* TITLE BLOCK */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-3xl md:text-5xl font-bold relative inline-block">
          Welcome to Cryptonite
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-(--primary-color) rounded-full"></span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Cryptonite delivers best-in-class crypto mining infrastructure with 
          industry-leading solutions for hardware procurement, hosting, and 
          ASIC miner repair. Our facilities are built for stability, efficiency, 
          and long-term profitability.
        </p>
      </div>

      {/* MAIN FLEX LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* LEFT SIDE — ABOUT TEXT */}
        <div>
          <p className="text-(--primary-color) font-semibold tracking-wider uppercase">
            About Us
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-snug">
            Leading Crypto Mining Company in Germany
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            With over a decade of experience, Cryptonite has engineered a 
            powerful and scalable mining ecosystem — from high-yield ASIC 
            machine acquisition to delivering stable, secure, and high-performance 
            hosting across Europe.
          </p>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Our mining centers are equipped with IoT monitoring, optimized 
            rack architecture, redundant cooling systems, and 24/7 technical 
            maintenance. We assist with miner setup, pool configuration, 
            remote monitoring, and on-site repair services.
          </p>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Visit our European hosting centers and elevate your mining 
            operations with industrial-grade infrastructure.
          </p>
        </div>

        {/* RIGHT SIDE — STATS GRID */}
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto lg:mx-0">

          {/* CARD 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center">
            <FaServer className="text-(--primary-color) text-3xl mx-auto mb-3" />
            <h3 className="text-3xl font-bold">5000+</h3>
            <p className="text-gray-500 mt-1 text-sm">ASIC Miners Hosted</p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center">
            <FaBolt className="text-(--primary-color) text-3xl mx-auto mb-3" />
            <h3 className="text-3xl font-bold">30 MW+</h3>
            <p className="text-gray-500 mt-1 text-sm">Combined Capacity</p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center">
            <FaGlobeEurope className="text-(--primary-color)text-3xl mx-auto mb-3" />
            <h3 className="text-3xl font-bold">2</h3>
            <p className="text-gray-500 mt-1 text-sm">Hosting Nations</p>
          </div>

          {/* CARD 4 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center">
            <FaPercent className="text-(--primary-color) text-3xl mx-auto mb-3" />
            <h3 className="text-3xl font-bold">0%</h3>
            <p className="text-gray-500 mt-1 text-sm">Commission Fees</p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutHeroSection;
