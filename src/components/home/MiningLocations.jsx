import React from "react";
import miningLocations from "../../utils/miningLocations";

const MiningLocations = () => {
  const topLocations = miningLocations.slice(0, 4);

  return (
    <section className="bg-black py-16 px-6 md:px-14">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        🌍 Our Global Mining Locations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {topLocations.map((location) => (
          <div
            key={location.id}
            className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div className="p-6 text-gray-300">
              <h3 className="text-xl font-semibold text-white mb-1">
                {location.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {location.country}
              </p>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-400 mb-4">
                <p>
                  <span className="text-gray-500 font-medium">Capacity:</span>{" "}
                  {location.capacity}
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Hashrate:</span>{" "}
                  {location.hashRateCapacity}
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Energy:</span>{" "}
                  {location.energySource}
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Status:</span>{" "}
                  <span
                    className={`${
                      location.status === "Operational"
                        ? "text-green-400"
                        : "text-yellow-400"
                    } font-semibold`}
                  >
                    {location.status}
                  </span>
                </p>
              </div>

              {/* <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-700 pt-3">
                {location.description}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MiningLocations;
