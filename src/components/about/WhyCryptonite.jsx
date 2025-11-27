import React from "react";
import { FaServer, FaCogs, FaMoneyBillWave, FaTools } from "react-icons/fa";
import {sendEnquiryMessage} from "../../utils/whatsApp"

const WhyCryptonite = () => {
  return (
    <section className="bg-[#000000] text-white py-20 px-6 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Box 1 */}
          <div className="border border-[#0d2c52] rounded-xl p-8 text-center bg-[#081a33]">
            <FaTools className="mx-auto text-5xl text-(--primary-color)" />
            <p className="mt-4 text-lg">Seamless Mining Setup</p>
          </div>

          {/* Box 2 */}
          <div className="border border-[#0d2c52] rounded-xl p-8 text-center bg-[#081a33]">
            <FaServer className="mx-auto text-5xl text-(--primary-color)" />
            <p className="mt-4 text-lg">Cost-Effective Hosting</p>
          </div>

          {/* Box 3 */}
          <div className="border border-[#0d2c52] rounded-xl p-8 text-center bg-[#081a33]">
            <FaMoneyBillWave className="mx-auto text-5xl text-(--primary-color)" />
            <p className="mt-4 text-lg">100% Earnings, No Cuts</p>
          </div>

          {/* Box 4 */}
          <div className="border border-[#0d2c52] rounded-xl p-8 text-center bg-[#081a33]">
            <FaCogs className="mx-auto text-5xl text-(--primary-color)" />
            <p className="mt-4 text-lg">Optimized Performance</p>
          </div>

        </div>

        {/* RIGHT SIDE TEXT */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-(--primary-color) leading-snug">
            Why Cryptonite Is Your Trusted Mining Partner
          </h2>

          <p className="mt-5 text-[#c9d4e0] leading-relaxed text-lg">
            Purpose-built solutions to help you succeed in the world of crypto mining.
          </p>

          <button onClick={sendEnquiryMessage} className="mt-8 px-6 py-3 font-medium rounded-lg bg-(--primary-color) text-black">
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhyCryptonite;
