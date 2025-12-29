import React from "react";

const AboutHeroSection = () => {
  return (
    <section className="bg-white text-black px-4 sm:px-6 md:px-16 lg:px-24 py-14 md:py-20 font-sans">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold tracking-wide josefin-sans">
          ABOUT CRYPTONITE <br className="hidden sm:block" />
          MINING
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-4 dm-sans text-black
            text-base sm:text-base md:text-lg
            leading-relaxed md:leading-8
            max-w-xl sm:max-w-2xl mx-auto
          "
        >
          Cryptonite Mining is an infrastructure operator focused on designing,
          deploying, and running Bitcoin mining facilities that perform reliably
          through market cycles.
        </p>
      </div>
    </section>
  );
};

export default AboutHeroSection;
