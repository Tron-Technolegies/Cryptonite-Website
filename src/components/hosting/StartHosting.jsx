import React from "react";
import { sendEnquiryMessage } from "../../utils/whatsApp";

const StartHosting = () => {
  return (
    <div className="bg-[#E8FFEF] py-20 px-4 text-center font-sans">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
        READY TO START HOSTING?
      </h2>

      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        Join hundreds of miners already benefiting from our premium hosting
        services.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* BUTTON 1 */}
        <button
          onClick={sendEnquiryMessage}
          className="w-full sm:w-auto max-w-xs bg-[#4CAF50] hover:bg-[#43A047] text-white font-semibold px-6 py-3 rounded-md shadow flex items-center justify-center gap-2 transition"
        >
          Get Started Today →
        </button>

        {/* BUTTON 2 */}
        <button
          onClick={sendEnquiryMessage}
          className="w-full sm:w-auto max-w-xs border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold px-6 py-3 rounded-md transition"
        >
          Schedule a Call
        </button>
      </div>
    </div>
  );
};

export default StartHosting;
