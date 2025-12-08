import React from "react";

const AboutHeroSection = () => {
  return (
    <div className="bg-white text-black px-4 sm:px-6 md:px-16 lg:px-24 py-16 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide josefin-sans">
          About Cryptonite <br className="hidden sm:block" />
          Mining
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-2xl sm:text-sm text-black leading-relaxed max-w-xl mx-auto dm-sans">
          Leading the future of cryptocurrency mining with professional
          infrastructure, renewable energy, and unwavering commitment to our
          clients' success.
        </p>
      </div>
    </div>
  );
};

export default AboutHeroSection;
