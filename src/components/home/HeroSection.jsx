import React from "react";
import { sendEnquiryMessage } from "../../utils/whatsApp";
import heroimg from "../../../public/heroimg.png";

const HeroSection = () => {
  return (
    <section
      className="
        relative 
        h-[75vh] 
        sm:h-[85vh] 
        lg:h-screen 
        bg-[#EFFFF3]
        flex items-center
        px-6 sm:px-10 lg:px-20
        overflow-hidden
      "
    >
      {/* DIAGONAL SHAPE */}
      <div className="absolute top-0 right-0 w-full h-full bg-white clip-diagonal-wide pointer-events-none"></div>

      {/* CONTENT WRAPPER */}
      <div className="relative flex flex-col lg:flex-row items-center w-full z-[10]">

        {/* LEFT TEXT */}
        <div className="max-w-3xl flex-1 pt-10 sm:pt-0">
          <h1
            className="
              text-3xl 
              sm:text-4xl 
              md:text-5xl 
              lg:text-6xl 
              font-bold 
              leading-tight 
              josefin-sans 
              text-black
            "
          >
            PROFESSIONAL <br />
            CRYPTOCURRENCY <br />
            <span className="text-(--primary-color)">MINING</span> SOLUTIONS
          </h1>

          <p
            className="
              text-black 
              mt-4 sm:mt-6 
              text-base 
              sm:text-lg 
              md:text-xl 
              leading-relaxed 
              max-w-xl 
              dm-sans 
              font-medium
            "
          >
            Fast return on investment with premium hosting infrastructure.
            Enterprise-grade facilities powered by 100% renewable energy across
            global locations.
          </p>

          <div className="mt-6 sm:mt-8">
            <button
              onClick={sendEnquiryMessage}
              className="
                px-6 sm:px-8 
                py-3 sm:py-4 
                rounded-md 
                bg-(--secondary-color) 
                text-white 
                font-semibold 
                hover:bg-green-700 
                transition
              "
            >
              Start Mining Today →
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 hidden lg:flex justify-end">
          <img
            src={heroimg}
            alt="Hero Illustration"
            className="w-[500px] lg:w-[620px] xl:w-[700px] object-contain drop-shadow-md"
          />
        </div>

        {/* Mobile Image */}
        <div className="flex lg:hidden justify-center mt-10">
          <img
            src={heroimg}
            alt="Hero Illustration"
            className="w-[260px] sm:w-[320px] object-contain drop-shadow-md opacity-90"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
