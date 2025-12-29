import React from "react";
import {
  FiZap,
  FiShield,
  FiHeadphones,
  FiClock,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

const features = [
  {
    icon: <FiZap />,
    title: "Low-Cost Energy",
    desc: "Access to competitive electricity rates with 100% renewable energy sources.",
  },
  {
    icon: <FiShield />,
    title: "Enterprise Security",
    desc: "Military-grade security with 24/7 surveillance and redundant systems.",
  },
  {
    icon: <FiHeadphones />,
    title: "Expert Support",
    desc: "Dedicated technical team available around the clock for all your needs.",
  },
  {
    icon: <FiClock />,
    title: "Fast Deployment",
    desc: "Get your miners online within 72 hours of equipment arrival.",
  },
  {
    icon: <FiGlobe />,
    title: "Global Reach",
    desc: "Strategic locations worldwide with optimal network connectivity.",
  },
  {
    icon: <FiTrendingUp />,
    title: "Maximum Uptime",
    desc: "99.9% uptime guarantee with redundant infrastructure and backup systems.",
  },
];

const WhyChooseHosting = () => {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 josefin-sans">
          WHY CHOOSE OUR <br className="hidden md:block" /> HOSTING?
        </h2>
        <p className="text-black max-w-2xl mx-auto mb-14 dm-sans">
          Industry-leading infrastructure designed for maximum profitability
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="border border-green-200 rounded-xl p-6 text-left hover:shadow-md transition"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600 text-xl mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 dm-sans">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed dm-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseHosting;
