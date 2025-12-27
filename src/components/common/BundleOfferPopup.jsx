import React from "react";
import { FiX, FiMessageCircle, FiPackage, FiTrendingDown, FiZap } from "react-icons/fi";

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
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition"
        >
          <FiX size={22} />
        </button>

        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <FiPackage size={28} />
            </div>
            <h3 className="text-3xl font-bold">
              Exclusive Bundle Offers
            </h3>
          </div>
          {/* <p className="text-green-50 text-lg">
            You're ordering in bulk! Unlock special bundle pricing and premium accessories.
          </p> */}
        </div>

        {/* Content Section */}
        <div className="p-8">
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiTrendingDown className="text-white" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Save More</h4>
              <p className="text-sm text-gray-600">Up to 15% off on bundles</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiZap className="text-white" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Premium Support</h4>
              <p className="text-sm text-gray-600">Priority setup & maintenance</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiPackage className="text-white" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Free Accessories</h4>
              <p className="text-sm text-gray-600">Cables, PSUs & cooling</p>
            </div>
          </div>

          {/* Product Images */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Accessories</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 group-hover:border-green-500 transition-all duration-300">
                  <img
                    src="/products/p1.png"
                    alt="Bundle item"
                    className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-medium">Power Supply Unit</p>
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 group-hover:border-green-500 transition-all duration-300">
                  <img
                    src="/products/p2.png"
                    alt="Bundle item"
                    className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-medium">Cooling System</p>
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 group-hover:border-green-500 transition-all duration-300">
                  <img
                    src="/images/bundle3.jpg"
                    alt="Bundle item"
                    className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-medium">Premium Cables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">Limited Time Offer</h4>
                <p className="text-sm text-gray-700">
                  Orders of 5+ miners qualify for special bundle pricing. Our team will create a custom package for you!
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleChatClick}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FiMessageCircle size={22} />
            contact us to receive a customized discount
          </button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 mt-5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Instant Response</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Custom Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>No Obligation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleOfferPopup;