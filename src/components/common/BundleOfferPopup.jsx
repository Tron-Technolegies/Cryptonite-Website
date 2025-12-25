import React from "react";
import { FiX, FiMessageCircle } from "react-icons/fi";

const BundleOfferPopup = ({ open, onClose }) => {
  if (!open) return null;

  const handleChatClick = () => {
    window.open(
      "https://wa.me/919999999999?text=Hi%20I%20am%20interested%20in%20your%20bundle%20offers",
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none">
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-7 pointer-events-auto border border-gray-100">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>

        {/* Accent */}
        <div className="h-1 w-14 bg-green-500 rounded-full mb-4" />

        {/* Heading */}
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Exclusive Bundle Offers 🎁
        </h3>

        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Save more by adding our recommended accessories and services with
          this miner. Limited-time bundled pricing available.
        </p>

        {/* Images */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <img
            src="/products/p1.png"
            alt="Bundle item"
            className="h-28 w-full rounded-xl object-cover border"
          />
          <img
            src="/products/p2.png"
            alt="Bundle item"
            className="h-28 w-full rounded-xl object-cover border"
          />
          <img
            src="/images/bundle3.jpg"
            alt="Bundle item"
            className="h-28 w-full rounded-xl object-cover border"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleChatClick}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-green-500 hover:bg-green-600 text-black font-semibold py-3.5 transition"
        >
          <FiMessageCircle size={18} />
          Chat with our team
        </button>

        {/* Trust note */}
        <p className="text-xs text-center text-gray-500 mt-3">
          Get instant support • No obligation • Fast response
        </p>
      </div>
    </div>
  );
};

export default BundleOfferPopup;
