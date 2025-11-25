import React from "react";

const HostingHeader = () => {
  return (
    <div className="bg-black text-white px-4 sm:px-6 md:px-16 lg:px-24 py-12 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Heading Section */}
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold leading-tight">
          HOSTING SERVICE FOR <br className="hidden sm:block" />
          CRYPTO MINING
        </h1>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mt-3">
          AT <span className="text-[--primary-color]">4,6CT</span>
        </h2>

        {/* FIXED: TWO PER ROW ALWAYS ON SMALL SCREENS */}
        <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8">

          <div className="border-l-2 border-[--primary-color] pl-3">
            <p className="text-base sm:text-lg font-semibold">in 72h</p>
            <p className="text-xs sm:text-sm text-gray-300">Online ohne Aufpreis</p>
          </div>

          <div className="border-l-2 border-[--primary-color] pl-3">
            <p className="text-base sm:text-lg font-semibold">4500+</p>
            <p className="text-xs sm:text-sm text-gray-300">Geräte im Hosting</p>
          </div>

          <div className="border-l-2 border-[--primary-color] pl-3">
            <p className="text-base sm:text-lg font-semibold">› 97%</p>
            <p className="text-xs sm:text-sm text-gray-300">Up-Time</p>
          </div>

          <div className="border-l-2 border-[--primary-color] pl-3">
            <p className="text-base sm:text-lg font-semibold">› 8,5 Mio €</p>
            <p className="text-xs sm:text-sm text-gray-300">Miner-Wert</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HostingHeader;
