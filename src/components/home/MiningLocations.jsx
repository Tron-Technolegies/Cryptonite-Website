import React from "react";
import miningLocations from "../../utils/miningLocations";

const MiningLocations = () => {
  const topLocations = miningLocations.slice(0, 3); // match screenshot: 3 cards

  return (
    <section className="bg-white py-20 px-6 md:px-16">

      {/* SECTION TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold text-black leading-snug">
          ASIC Miner <br />
          <span className="relative">
            Hosting Locations
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-(--primary-color) rounded-full"></span>
          </span>
        </h2>
      </div>

      {/* LOCATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {topLocations.map((location) => (
          <div
            key={location.id}
            className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            {/* Background Image */}
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-[420px] object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-45"></div>

            {/* CENTERED CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

              {/* TOP DESCRIPTION */}
              <p className="text-white text-xs md:text-sm font-semibold tracking-wide mb-4 uppercase leading-relaxed opacity-90">
                HOSTING CENTER LOCATED IN {location.country.toUpperCase()} <br />
                WITH CAPACITY OF {location.capacity}.
              </p>

              {/* LOCATION NAME */}
              <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-md">
                {location.name}
              </h3>

              {/* PRICE – Using existing data field (energySource) */}
              <div className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-md text-lg">
                {location.energySource}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MiningLocations;
