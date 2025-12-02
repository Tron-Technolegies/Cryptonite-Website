import React from "react";
import { FaUser, FaSearch, FaServer, FaRocket } from "react-icons/fa";
import { sendEnquiryMessage } from "../../utils/whatsApp";

const steps = [
  {
    icon: <FaUser />,
    title: "First Contact",
    text: "Submit an inquiry, and our team will reach out to understand your mining goals.",
  },
  {
    icon: <FaSearch />,
    title: "Consultation",
    text: "We analyze your needs and recommend the ideal miner and hosting location.",
  },
  {
    icon: <FaServer />,
    title: "Setup & Hosting",
    text: "We handle purchasing, installation, and complete hosting setup for you.",
  },
  {
    icon: <FaRocket />,
    title: "Mining Begins",
    text: "Your miner goes online. We take care of monitoring, uptime, and maintenance.",
  },
];

const HostingPurchaseSteps = () => {
  return (
    <section className="bg-white text-black py-24 px-6 md:px-16">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
          Hosting Purchase Process
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-(--primary-color) rounded-full"></span>
        </h2>
        <p className="mt-5 text-gray-600 text-lg">
          A simple, transparent and efficient process to get your miner hosted and running quickly.
        </p>
      </div>

      {/* Steps Grid — clean & minimal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">

        {steps.map((step, i) => (
          <div
            key={i}
            className="
              bg-white border border-gray-200 
              rounded-2xl p-8 shadow-sm 
              hover:shadow-lg hover:-translate-y-1
              transition-all duration-300 text-center
            "
          >
            {/* Icon */}
            <div className="mx-auto mb-4 w-16 h-16 rounded-xl bg-(--primary-color)/10 flex items-center justify-center">
              <div className="text-(--primary-color) text-3xl">{step.icon}</div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}

      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <button
          onClick={sendEnquiryMessage}
          className="
            px-10 py-3 bg-(--primary-color) text-black 
            font-semibold rounded-full shadow-md 
            hover:brightness-110 transition
          "
        >
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default HostingPurchaseSteps;
