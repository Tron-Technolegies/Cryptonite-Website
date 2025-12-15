import React from "react";
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

const ContactHeader = () => {
  return (
    <section className="w-full bg-white py-20 px-4">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-black">
          GET IN TOUCH
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Have questions about our services? Our team is here to help you get
          started with professional cryptocurrency mining.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Email */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiMail size={22} />
            </div>
          </div>
          <h4 className="font-semibold text-lg mb-1">Email Us</h4>
          <p className="text-gray-600 text-sm mb-4">
            contact@cryptonite.com
          </p>
          <button className="w-full bg-green-500 text-white py-2 rounded-full text-sm font-medium hover:bg-green-600 transition">
            Send Email
          </button>
        </div>

        {/* Call */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiPhone size={22} />
            </div>
          </div>
          <h4 className="font-semibold text-lg mb-1">Call Us</h4>
          <p className="text-gray-600 text-sm mb-4">
            +1 (555) 123-4567
          </p>
          <button className="w-full border border-gray-300 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
            Start Call
          </button>
        </div>

        {/* Chat */}
        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiMessageSquare size={22} />
            </div>
          </div>
          <h4 className="font-semibold text-lg mb-1">Live Chat</h4>
          <p className="text-gray-600 text-sm mb-4">
            Available 24/7
          </p>
          <button className="w-full border border-gray-300 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
            Start Chat
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactHeader;
