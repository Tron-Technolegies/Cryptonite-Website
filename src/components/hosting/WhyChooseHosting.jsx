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
    icon: <FiShield />,
    title: "Enterprise Security",
    desc: "24/7 monitored facilities with layered physical security and redundant systems.",
  },
  {
    icon: <FiZap />,
    title: "Renewable Energy",
    desc: "Mining operations powered by renewable and low-carbon energy sources across selected locations.",
  },
  {
    icon: <FiGlobe />,
    title: "Global Infrastructure",
    desc: "Professionally operated hosting sites across multiple regions, designed for scale and reliability.",
  },
  {
    icon: <FiTrendingUp />,
    title: "Operational Efficiency",
    desc: "Optimized power distribution, cooling, and monitoring designed to maintain consistent performance.",
  },
  {
    icon: <FiClock />,
    title: "Fast Deployment",
    desc: "Streamlined onboarding and deployment once hardware and requirements are confirmed.",
  },
  {
    icon: <FiHeadphones />,
    title: "Expert Operations Support",
    desc: "Dedicated technical teams monitoring and supporting infrastructure around the clock.",
  },
];

const WhyChooseHosting = () => {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 josefin-sans">
          WHY CHOOSE OUR <br className="hidden md:block" /> HOSTING?
        </h2>

        <p className="text-black max-w-2xl mx-auto mb-14 dm-sans">
          Industry-leading infrastructure designed for maximum profitability
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="border border-green-200 rounded-xl p-6 text-left hover:shadow-md transition"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600 text-xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2 dm-sans">
                {item.title}
              </h3>

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
