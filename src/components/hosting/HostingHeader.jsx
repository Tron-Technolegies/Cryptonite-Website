import React from "react";

const HostingHeader = () => {
  return (
    <div className="bg-white text-black px-4 sm:px-6 md:px-16 lg:px-24 py-16 font-sans">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide josefin-sans">
          PREMIUM HOSTING <br className="hidden sm:block" />
          SOLUTIONS
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-2xl sm:text-sm text-black leading-relaxed max-w-xl mx-auto dm-sans">
          Professional cryptocurrency mining hosting with competitive rates,
          renewable energy, and world-class support. Start mining profitably today.
        </p>

      </div>
    </div>
  );
};

export default HostingHeader;
