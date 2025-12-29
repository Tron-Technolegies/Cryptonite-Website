import React from "react";

const MiningHosting = () => {
  return (
    <section className="w-full pt-14 md:pt-20 pb-0 bg-[#f8f9fb] flex flex-col items-center px-4">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center josefin-sans max-w-4xl">
        MINING HOSTING WITH CRYPTONITE
      </h2>

      {/* Paragraph */}
      <p className="text-gray-600 text-center dm-sans mt-4
        max-w-xl sm:max-w-2xl md:max-w-3xl
        text-sm sm:text-base md:text-lg
        leading-relaxed md:leading-8">
        Looking for a hosting location for your ASIC miners? We offer the best
        and most affordable spots in our modern hosting farms — with the highest
        German-level service quality.
      </p>

      {/* Image */}
      <img
        src="./hosting/hostingmap.png"
        alt="Mining Hosting World Map"
        className="mt-10 w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl block"
      />
    </section>
  );
};

export default MiningHosting;
