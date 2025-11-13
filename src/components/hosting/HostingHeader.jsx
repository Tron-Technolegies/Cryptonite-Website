import React from "react";

const HostingHeader = () => {
  return (
    <div className="bg-black text-white px-6 md:px-16 lg:px-24 py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading Section */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          HOSTING SERVICE <br />
          FOR CRYPTO MINING
        </h1>

        <h2 className="text-4xl md:text-6xl font-extrabold mt-2">
          AT <span className="text-(--primary-color)">4,6CT</span>
        </h2>

        {/* Info Boxes */}
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center mt-12 space-y-6 md:space-y-0 md:space-x-16">

          {/* Box 1 */}
          <div className="border-l-2 border-(--primary-color) pl-4">
            <p className="text-lg font-semibold">in 72h</p>
            <p className="text-sm text-gray-300">Online ohne Aufpreis</p>
          </div>

          {/* Box 2 */}
          <div className="border-l-2 border-(--primary-color) pl-4">
            <p className="text-lg font-semibold">4500+</p>
            <p className="text-sm text-gray-300">Geräte im Hosting</p>
          </div>

          {/* Box 3 */}
          <div className="border-l-2 border-(--primary-color) pl-4">
            <p className="text-lg font-semibold">› 97%</p>
            <p className="text-sm text-gray-300">Up-Time</p>
          </div>

          {/* Box 4 */}
          <div className="border-l-2 border-(--primary-color) pl-4">
            <p className="text-lg font-semibold">› 8,5 Mio €</p>
            <p className="text-sm text-gray-300">Miner-Wert</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HostingHeader;
