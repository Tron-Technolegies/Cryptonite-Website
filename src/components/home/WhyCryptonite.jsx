import React from "react";
import { FiShield, FiZap, FiGlobe, FiTrendingUp, FiClock, FiHeadphones } from "react-icons/fi";

const WhyCryptonite = () => {
  const items = [
    {
      id: 1,
      icon: <FiShield className="text-(--primary-color) text-2xl" />,
      title: "Enterprise Security",
      desc: "Military-grade security protocols with 24/7 monitoring and redundant systems to protect your investment.",
    },
    {
      id: 2,
      icon: <FiZap className="text-(--primary-color) text-2xl" />,
      title: "Renewable Energy",
      desc: "100% clean energy powered facilities with competitive electricity rates for maximum efficiency.",
    },
    {
      id: 3,
      icon: <FiGlobe className="text-(--primary-color) text-2xl" />,
      title: "Global Infrastructure",
      desc: "Strategic locations worldwide with redundant connectivity and optimal network latency.",
    },
    {
      id: 4,
      icon: <FiTrendingUp className="text-(--primary-color) text-2xl" />,
      title: "Maximum ROI",
      desc: "Optimized operations and competitive hosting rates designed to maximize your return on investment.",
    },
    {
      id: 5,
      icon: <FiClock className="text-(--primary-color) text-2xl" />,
      title: "Fast Deployment",
      desc: "Get started within 72 hours with our streamlined onboarding and rapid equipment deployment.",
    },
    {
      id: 6,
      icon: <FiHeadphones className="text-(--primary-color) text-2xl" />,
      title: "Expert Support",
      desc: "Dedicated technical support team available 24/7 to ensure optimal mining performance.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">

        
        <h2 className="text-3xl md:text-4xl font-bold text-(text-black-color) josefin-sans">
          WHY CHOOSE <span className="text-(--primary-color)">CRYPTONITE?</span>
        </h2>

        <p className="text-gray-600 mt-2 text-lg dm-sans">
          Industry leading infrastructure and support for maximum profitability
        </p>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl p-6 text-left shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="text-xl font-semibold text-black mb-2">{item.title}</h3>

              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyCryptonite;
