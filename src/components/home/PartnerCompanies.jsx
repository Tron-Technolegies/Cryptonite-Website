import React from "react";

const PartnerCompanies = () => {
  const logos = [
    "https://logos-world.net/wp-content/uploads/2023/09/Binance-Logo.png",
    "https://download.logo.wine/logo/Coinbase/Coinbase-Logo.wine.png",
    "https://logos-world.net/wp-content/uploads/2023/02/Kraken-Crypto-Logo.png",
    "https://cryptologos.cc/logos/bitmain-logo.png",
    "https://seeklogo.com/images/O/okx-logo-6F6C0E3AE0-seeklogo.com.png",
    "https://seeklogo.com/images/L/ledger-logo-20ECDF50E0-seeklogo.com.png",
  ];

  return (
    <div className="bg-gray-50 py-14 relative overflow-hidden">

      {/* SECTION TITLE */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-black mb-10">
        Trusted by Leading Crypto Companies
      </h2>

      {/* GRADIENT FADES (Left & Right Edges) */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>

      {/* LOGO SCROLLER */}
      <style>
        {`
          @keyframes scrollLogos {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .scroll-animation {
            animation: scrollLogos 30s linear infinite;
          }

          .scroll-animation:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="w-full flex overflow-hidden">
        <div className="flex scroll-animation whitespace-nowrap items-center">

          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="mx-12 shrink-0 opacity-80 hover:opacity-100 transition duration-300"
            >
              <img
                src={logo}
                alt={`Crypto Company ${index}`}
                className="h-14 md:h-20 object-contain grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default PartnerCompanies;
