import React from "react";
import {
  FiShield,
  FiZap,
  FiGlobe,
  FiTrendingUp,
  FiClock,
  FiHeadphones,
} from "react-icons/fi";

const WhyCryptonite = () => {
  const items = [
    {
      id: 1,
      icon: <FiShield className="text-green-400 text-2xl" />,
      title: "Enterprise Security",
      desc: "24/7 monitored facilities with layered physical security, access control, and operational redundancy designed for continuous mining",
    },
    {
      id: 2,
      icon: <FiZap className="text-green-400 text-2xl" />,
      title: "Renewable Energy",
      desc: "Mining operations powered by renewable and low-carbon energy sources,selected for long-term power stability and predictable pricing",
    },
    {
      id: 3,
      icon: <FiGlobe className="text-green-400 text-2xl" />,
      title: "Global Infrastructure",
      desc: "Mining operations powered by renewable and low-carbon energy sources,selected for long-term power stability and predictable pricing.",
    },
    {
      id: 4,
      icon: <FiTrendingUp className="text-green-400 text-2xl" />,
      title: "Optimized Returns",
      desc: "Hosting locations selected based on power reliability, climate conditions,regulatory clarity, and long-term operational viability.",
    },
    {
      id: 5,
      icon: <FiClock className="text-green-400 text-2xl" />,
      title: "Operational Efficiency",
      desc: "Optimized power distribution, cooling, and monitoring designed to maintainconsistent hashrate and minimize operational disruption.",
    },
    {
      id: 6,
      icon: <FiHeadphones className="text-green-400 text-2xl" />,
      title: "Expert Support",
      desc: "Dedicated teams providing continuous monitoring, incident response, and operational support across all hosting locations, ensuring stable and uninterrupted mining operations.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-[#0d1210] relative overflow-hidden">
      {/* Background glow top-left */}
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-green-500 opacity-5 blur-[130px] pointer-events-none"></div>

      {/* Background glow bottom-right */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-green-400 opacity-5 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white josefin-sans">
          WHY CHOOSE <span className="text-green-400">CRYPTONITE?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-white mt-3 text-lg dm-sans">
          Infrastructure built for miners who think in years, not cycles.
        </p>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#101614] 
                rounded-xl 
                p-7 
                border border-[#1a2622] 
                hover:border-green-400/40
                shadow-[0px_0px_20px_rgba(0,255,140,0.05)]
                hover:shadow-[0px_0px_25px_rgba(0,255,140,0.12)]
                transition-all duration-300
                text-left
              "
            >
              {/* Icon Container */}
              <div
                className="
                bg-[#0f1916]
                w-12 h-12 
                rounded-lg 
                flex items-center justify-center
                border border-[#1f2d27]
                mb-5
              "
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-white leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCryptonite;
