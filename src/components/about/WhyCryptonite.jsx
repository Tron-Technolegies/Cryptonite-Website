import React from "react";
import { FaServer, FaCogs, FaMoneyBillWave, FaTools } from "react-icons/fa";
import { sendEnquiryMessage } from "../../utils/whatsApp";

const WhyCryptonite = () => {
  const features = [
    {
      icon: <FaTools />,
      title: "Seamless Mining Setup",
      text: "Quick configuration & onboarding for all ASIC miners.",
    },
    {
      icon: <FaServer />,
      title: "Cost-Effective Hosting",
      text: "Energy-efficient facilities ensuring higher profitability.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "100% Earnings, No Cuts",
      text: "You keep all your mining rewards — zero commission fees.",
    },
    {
      icon: <FaCogs />,
      title: "Optimized Performance",
      text: "24/7 monitoring, stable power & efficient cooling systems.",
    },
  ];

  return (
    <section className="bg-white text-black py-24 px-6 md:px-16 relative overflow-hidden">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-50/40 to-white pointer-events-none"></div>

      <div className="relative">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            Why Cryptonite Is Your Trusted Mining Partner
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-(--primary-color) rounded-full"></span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Purpose-built infrastructure and expert engineering designed to maximize
            your mining performance and long-term profitability.
          </p>
        </div>

        {/* GRID WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE – Modern Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white/70 backdrop-blur-md
                  border border-gray-200
                  rounded-2xl p-8 shadow-lg
                  hover:shadow-2xl hover:-translate-y-1
                  transition-all duration-300
                  text-center
                "
              >
                {/* ICON */}
                <div
                  className="
                    mx-auto text-5xl mb-4 
                    text-(--primary-color)
                    drop-shadow-sm
                  "
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.text}</p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE TEXT SECTION */}
          <div className="lg:pl-6 text-center lg:text-left">
            <p className="text-(--primary-color) font-semibold tracking-wider uppercase">
              Trust. Performance. Reliability.
            </p>

            <h3 className="text-3xl md:text-4xl font-bold mt-4 leading-snug">
              Built for Seamless, Scalable  
              <span className="block text-(--primary-color)">Mining Success</span>
            </h3>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
              Our cutting-edge infrastructure delivers consistent uptime, stable
              operating conditions, and optimized hardware performance. With
              Cryptonite, your mining operations scale effortlessly with zero
              compromise on reliability.
            </p>

            <button
              onClick={sendEnquiryMessage}
              className="
                mt-8 px-10 py-3 font-semibold rounded-full 
                bg-(--primary-color) text-black 
                hover:brightness-110 transition 
                shadow-lg
              "
            >
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyCryptonite;
