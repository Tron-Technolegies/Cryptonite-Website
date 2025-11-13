import React from "react";

const PartnerCompanies = () => {
  const logos = [
    "/dummylogos/logo1.webp",
    "/dummylogos/logo2.webp",
    "/dummylogos/logo1.webp",
    "/dummylogos/logo2.webp",
    "/dummylogos/logo1.webp",
    "/dummylogos/logo2.webp",
  ];

  return (
    <div className="bg-gray-50 py-12 overflow-hidden relative">
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="w-full flex justify-center items-center">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="mx-12 shrink-0 opacity-80 hover:opacity-100 transition duration-300"
            >
              <img
                src={logo}
                alt={`Partner ${index}`}
                className="w-36 md:w-44 object-contain grayscale hover:grayscale-0 transform hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerCompanies;
