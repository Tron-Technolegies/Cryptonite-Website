import React from "react";
import {sendEnquiryMessage} from "../../utils/whatsApp"

const HeroSection = () => {
  return (
    <section className="bg-black text-white flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 md:px-12 lg:px-20 py-26 md:py-20 relative z-0">

      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/2 max-w-xl text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Uncomplicated mining{" "}
          <span className="text-(--primary-color)">starts here!</span>
        </h1>

        <p className="text-gray-300 mt-6 text-base sm:text-lg md:text-xl">
          Fast return on investment thanks to attractive hosting conditions.
          <br className="hidden sm:block" />
          Inquire today, mine tomorrow.
        </p>

        <button onClick={sendEnquiryMessage} className="mt-8 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-(--primary-color) text-black font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-105 text-base sm:text-lg">
          Start mining!
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src="https://res.cloudinary.com/dfe8yna1k/image/upload/v1761645546/wzv85xogduggf8brwhcx.webp"
          alt="Mining Machines"
          className="w-[260px] sm:w-[320px] md:w-[450px] lg:w-[520px] object-contain drop-shadow-xl"
        />
      </div>

    </section>
  );
};

export default HeroSection;
