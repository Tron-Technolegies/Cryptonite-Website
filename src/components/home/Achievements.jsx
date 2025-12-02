import React from "react";

const Achievements = () => {
  const stats = [
    { id: 1, number: "72", label: "hours after purchase online" },
    { id: 2, number: "5", label: "Continents Worldwide" },
    { id: 3, number: "98", label: "percent uptime" },
    { id: 4, number: "4,500", label: "devices in hosting" },
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Stats Grid */}
        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-14 text-center 
        ">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              {/* Decorative underline */}
              <div className="relative inline-block mb-3">
                <span
                  className="text-5xl font-extrabold"
                  style={{ color: "var(--primary-color)" }}
                >
                  {stat.number}
                </span>
                <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-10 h-1 bg-yellow-400 rounded-full"></span>
              </div>

              {/* Label */}
              <p className="text-black text-lg font-medium mt-2 opacity-90">
                {stat.label}
              </p>

              {/* Separator Line on Desktop */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute top-0 right-0 h-full w-[1px] bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            NexMine in numbers
          </h3>

          <p className="text-black max-w-3xl mx-auto text-lg leading-relaxed opacity-90">
            We promise a <span className="font-semibold">quick</span> and{" "}
            <span className="font-semibold">secure</span> entry into crypto
            mining, made possible by our globally distributed locations,
            direct hardware ownership, and{" "}
            <span className="font-semibold">German</span> contractual structure.
            Find out now which miner and location are right for you.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Achievements;
