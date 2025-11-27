import React, { useRef, useEffect, useState } from "react";
import { FaUser, FaSearch, FaServer, FaRocket } from "react-icons/fa";
import {sendEnquiryMessage} from "../../utils/whatsApp"

const steps = [
  {
    id: "01",
    title: "First Contact",
    description:
      "Reach out to us via our quick inquiry form, email, or phone. Our team will respond promptly to discuss your goals and requirements.",
    icon: <FaUser className="text-(--primary-color) text-4xl" />,
  },
  {
    id: "02",
    title: "Analysis & Advice",
    description:
      "We take time to understand your needs. In a personalized consultation, we analyze your mining goals and recommend ideal setups and locations.",
    icon: <FaSearch className="text-(--primary-color) text-4xl" />,
  },
  {
    id: "03",
    title: "Purchase & Hosting",
    description:
      "Once your miner and hosting location are finalized, we conclude a transparent contract through our German-based company.",
    icon: <FaServer className="text-(--primary-color) text-4xl" />,
  },
  {
    id: "04",
    title: "Mining Start",
    description:
      "Your mining setup goes live within a few days. From then on, we handle operation, monitoring, and maintenance for maximum uptime and profit.",
    icon: <FaRocket className="text-(--primary-color) text-4xl" />,
  },
];

const HostingPurchaseSteps = () => {
  const containerRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Scroll-based animated line (CSS only)
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(
        Math.max(((windowHeight - rect.top) / (rect.height + windowHeight)) * 100, 0),
        100
      );

      setLineHeight(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-black text-white py-20 px-6 sm:px-10 lg:px-24 overflow-hidden relative">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold mb-3">Hosting Purchase Process</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Follow these simple steps to start your mining journey — transparent, efficient, and reliable.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Base line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-10 bottom-20 w-1 bg-gray-700 hidden md:block rounded-full" />

          {/* Animated line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-10 w-1 bg-(--primary-color) hidden md:block rounded-full transition-all duration-300"
            style={{ height: `${Math.min(lineHeight, 85)}%` }}
          />

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`mb-20 flex flex-col md:flex-row items-center relative ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Step Circle */}
              <div className="relative flex flex-col items-center md:w-1/2">
                  <div
                  className="relative bg-(--primary-color) text-black font-bold rounded-full px-8 py-4 shadow-xl text-lg
                             md:absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 z-10"
                >
                  {step.id}
                </div>
              </div>

              {/* Step Card */}
              <div
                className={`md:w-1/2 bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800 hover:shadow-2xl transition-all ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  {step.icon}
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          {/* Final Button */}
          <div className="flex justify-center mt-28">
            <button onClick={sendEnquiryMessage} className="bg-(--primary-color) text-black font-semibold px-10 py-3.5 rounded-full shadow-md hover:brightness-110 transition duration-300">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostingPurchaseSteps;
