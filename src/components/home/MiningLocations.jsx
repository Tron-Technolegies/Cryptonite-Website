import React from "react";
import miningLocations from "../../utils/miningLocations";
import { FiTrendingUp, FiZap, FiMapPin } from "react-icons/fi";

const MiningLocations = () => {
  const topLocations = miningLocations.slice(0, 4);

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl josefin-sans font-extrabold text-black uppercase tracking-wide josefin-sans">
          GLOBAL MINING LOCATIONS
        </h2>
        <p className="text-(text--black-color) mt-2 text-lg dm-sans">
          Strategic data centers worldwide powered by 100% renewable energy
        </p>
      </div>

      {/* LOCATION CARDS */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {topLocations.map((location) => (
          <div
            key={location.id}
            className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg overflow-hidden bg-white transition"
          >
            {/* IMAGE */}
            <img src={location.image} alt={location.name} className="w-full h-56 object-cover" />

            {/* CONTENT */}
            <div className="p-6">
              {/* TITLE + STATUS */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-black">{location.name}</h3>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {location.status}
                </span>
              </div>

              {/* COUNTRY */}
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <FiMapPin className="text-(--primary-color)" />
                {location.country}
              </p>

              {/* SPECS */}
              <div className="mt-4 space-y-3 text-sm">
                {/* Capacity */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiZap className="text-(--primary-color)" />
                    Capacity
                  </div>
                  <span className="font-semibold text-black">{location.capacity}</span>
                </div>

                {/* Hash Rate */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiTrendingUp className="text-(--primary-color)" />
                    Hashrate
                  </div>
                  <span className="font-semibold text-black">{location.hashRateCapacity}</span>
                </div>

                {/* Energy */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-gray-600">⚡ Energy</div>
                  <span className="font-semibold text-black text-right">
                    {location.energySource}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MiningLocations;
