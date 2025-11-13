import React from "react";

const Achievements = () => {
  const stats = [
    { id: 1, number: "72", label: "hours after purchase online" },
    { id: 2, number: "5", label: "Continents Worldwide" },
    { id: 3, number: "98", label: "percent uptime" },
    { id: 4, number: "4,500", label: "devices in hosting" },
  ];

  return (
    <section className="bg-black py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {stats.map((stat) => (
            <div key={stat.id} className="relative">
              <div className="absolute left-1 top-0 bottom-0 w-1 bg-amber-50 hidden md:block"></div>
              <div className="md:pl-6">
                <h3 className="text-4xl font-bold" style={{ color: "var(--primary-color)" }}>{stat.number}</h3>
                <p className="text-white mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center md:text-left">
          <h3 className="text-lg font-bold text-black mb-3">
            NexMine in numbers
          </h3>
          <p className="text-white max-w-3xl mx-auto md:mx-0 leading-relaxed">
            We promise a <span className="font-semibold">quick</span> and{" "}
            <span className="font-semibold">secure</span> entry into crypto
            mining, made possible by our globally distributed locations, direct
            hardware ownership, and{" "}
            <span className="font-semibold">German</span> contractual structure.
            Find out now which miner and location are right for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
