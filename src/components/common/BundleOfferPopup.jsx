import React from "react";
import {
  FiX,
  FiTrendingUp,
  FiZap,
  FiMessageCircle,
} from "react-icons/fi";

const BundleOfferPopup = ({ open, onClose }) => {
  if (!open) return null;

  const handleChatClick = () => {
    window.open(
      "https://wa.me/919999999999?text=Hi%20I%20am%20interested%20in%20your%20bundle%20offers",
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* CLOSE BUTTON (SMALLER) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-1.5 shadow text-gray-600 hover:text-gray-800 transition"
          aria-label="Close"
        >
          <FiX size={14} />
        </button>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6 text-white">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-white/20 p-2 rounded-lg">
              <FiTrendingUp size={20} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Exclusive Bundle Offers
            </h3>
          </div>
          <p className="text-green-100 text-sm sm:text-base">
            Ordering more than 5? We have Special offers for you
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* BENEFITS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col items-center text-center bg-green-50 rounded-2xl p-5">
              <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full mb-3">
                <FiTrendingUp size={22} />
              </div>
              <h4 className="font-semibold text-gray-900">
                Save More
              </h4>
              <p className="text-sm text-gray-600">
                Up to 15% off
              </p>
            </div>

            <div className="flex flex-col items-center text-center bg-blue-50 rounded-2xl p-5">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full mb-3">
                <FiZap size={22} />
              </div>
              <h4 className="font-semibold text-gray-900">
                Premium Support
              </h4>
              <p className="text-sm text-gray-600">
                Priority setup
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleChatClick}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold py-4 transition"
          >
            <FiMessageCircle size={18} />
            Chat with our team
          </button>
        </div>
      </div>
    </div>
  );
};

export default BundleOfferPopup;
