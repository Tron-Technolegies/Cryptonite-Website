import React from "react";

const MiningHosting = () => {
  return (
    <section className="w-full pt-16 pb-0 bg-[#f8f9fb] flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center">
        MINING HOSTING WITH CRYPTONITE
      </h2>

      <p className="text-gray-600 text-center max-w-xl mt-3">
        Looking for a hosting location for your ASIC miners? We offer the best
        and most affordable spots in our modern hosting farms — with the highest
        German-level service quality.
      </p>

      <img
        src="./hosting/hostingmap.png"
        alt="Mining Hosting World Map"
        className="mt-10 w-full max-w-4xl block"
      />
    </section>
  );
};

export default MiningHosting;
