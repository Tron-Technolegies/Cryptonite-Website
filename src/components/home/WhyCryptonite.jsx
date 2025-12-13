import React from "react";
import { 
  FiShield, 
  FiZap, 
  FiGlobe, 
  FiTrendingUp, 
  FiClock, 
  FiHeadphones 
} from "react-icons/fi";

const WhyCryptonite = () => {
  const items = [
    {
      id: 1,
      icon: <FiShield className="text-green-400 text-2xl" />,
      title: "Enterprise Security",
      desc: "Military-grade security protocols with 24/7 monitoring and redundant systems to protect your investment.",
    },
    {
      id: 2,
      icon: <FiZap className="text-green-400 text-2xl" />,
      title: "Renewable Energy",
      desc: "100% clean energy powered facilities with competitive electricity rates for maximum efficiency.",
    },
    {
      id: 3,
      icon: <FiGlobe className="text-green-400 text-2xl" />,
      title: "Global Infrastructure",
      desc: "Strategic locations worldwide with redundant connectivity and optimal network latency.",
    },
    {
      id: 4,
      icon: <FiTrendingUp className="text-green-400 text-2xl" />,
      title: "Maximum ROI",
      desc: "Optimized operations and competitive hosting rates designed to maximize your return on investment.",
    },
    {
      id: 5,
      icon: <FiClock className="text-green-400 text-2xl" />,
      title: "Fast Deployment",
      desc: "Get started within 72 hours with our streamlined onboarding and rapid equipment deployment.",
    },
    {
      id: 6,
      icon: <FiHeadphones className="text-green-400 text-2xl" />,
      title: "Expert Support",
      desc: "Dedicated technical support team available 24/7 to ensure optimal mining performance.",
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
        <p className="text-gray-300 mt-3 text-lg dm-sans">
          Industry leading infrastructure and support for maximum profitability
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
              <div className="
                bg-[#0f1916]
                w-12 h-12 
                rounded-lg 
                flex items-center justify-center
                border border-[#1f2d27]
                mb-5
              ">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyCryptonite;
