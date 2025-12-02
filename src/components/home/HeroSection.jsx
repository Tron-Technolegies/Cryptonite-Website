import React from "react";
import { sendEnquiryMessage } from "../../utils/whatsApp";

const HeroSection = () => {
  return (
    <section className="bg-[#f5f5f5] flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 py-20">

      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/2 max-w-xl">
        
        {/* Top Badge */}
        <div className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-full w-fit mb-6 text-sm font-medium">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Most profitable Bitcoin miner hosting – Award
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-black">
          The Easiest Crypto Mining Platform
        </h1>

        <p className="text-black mt-6 text-base sm:text-lg md:text-xl leading-relaxed">
          Crypto mining hosting is a user-friendly crypto mining platform 
          based in the Germany. With electricity rates from 4¢/kW, our facilities 
          are designed for the highest possible Bitcoin mining profits.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={sendEnquiryMessage}
            className="px-8 py-4 rounded-full bg-black text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform"
          >
            Start Mining
          </button>

          <button
            className="px-8 py-4 rounded-full border border-black text-black font-semibold hover:bg-gray-200 transition"
          >
            Book a Call
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
        <img
          src="https://res.cloudinary.com/dfe8yna1k/image/upload/v1761645546/wzv85xogduggf8brwhcx.webp"
          alt="Mining Machines"
          className="w-[260px] sm:w-[350px] md:w-[450px] lg:w-[520px] object-contain drop-shadow-xl"
        />
      </div>

    </section>
  );
};

export default HeroSection;
