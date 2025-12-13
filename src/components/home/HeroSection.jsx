import React from "react";
import building from "../../../public/homepageimg.png"; 

const HeroSection = () => {
  return (
    <section
      className="
        relative 
        h-[85vh] 
        lg:h-screen 
        w-full
        overflow-hidden
        flex items-center justify-center
        bg-[#0b0f0e]
      "
    >
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1714] via-[#0a120f] to-[#050807]" />

      {/* CENTER GREEN GLOW */}
      <div className="absolute w-[650px] h-[650px] bg-[#1aff85] opacity-20 blur-[220px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-6xl">

        {/* EXACT BUILDING IMAGE */}
        <img
          src={building}
          alt="Cryptonite Infrastructure"
          className="
            mx-auto mb-10
            w-full max-w-5xl
            opacity-90
            pointer-events-none
            drop-shadow-[0_0_15px_rgba(34,197,94,0.35)]
          "
        />

        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
          IN MINE WE <span className="text-green-500">TRUST</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-5 text-gray-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
          Fast return on investment with premium hosting infrastructure.
          Enterprise-grade facilities powered by 100% renewable energy across
          global locations.
        </p>

        {/* CTA BUTTON */}
        <button
          className="
            mt-8
            px-8 py-3
            rounded-full
            bg-green-600/90
            text-white
            font-semibold
            hover:bg-green-700
            transition
            shadow-[0_0_20px_rgba(26,255,133,0.35)]
          "
        >
          Start Mining
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
