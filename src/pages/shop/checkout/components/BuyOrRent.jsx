import React from "react";
import { FiShoppingCart, FiRefreshCw, FiArrowRight } from "react-icons/fi";

const BuyOrRent = ({ price = 0, onBuy, onRent }) => {
  // Use the price prop passed from parent (which is the calculated total)
  const total = Number(price) || 0;

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* BUY */}
      <button
        onClick={onBuy}
        className="border-2 border-green-300 bg-green-50 rounded-xl p-6 text-left relative hover:bg-green-100 transition-colors"
      >
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
            <FiShoppingCart className="text-green-700" />
          </div>
          <div>
            <p className="font-semibold">Buy</p>
            <p className="text-sm text-gray-600">Own the equipment</p>
          </div>
        </div>

        <p className="text-sm text-gray-600">Price</p>
        <p className="text-green-600 font-bold text-lg">
          ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>

        <FiArrowRight className="absolute bottom-6 right-6 text-green-600" />
      </button>

      {/* RENT */}
      <button
        onClick={onRent}
        className="border border-green-300 bg-green-50 rounded-xl p-6 text-left relative hover:bg-green-100 transition-colors"
      >
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
            <FiRefreshCw className="text-green-700" />
          </div>
          <div>
            <p className="font-semibold">Rent</p>
            <p className="text-sm text-gray-600">Monthly subscription</p>
          </div>
        </div>

        <p className="text-sm text-gray-600">From</p>
        <p className="text-green-600 font-bold text-lg">
          ${Math.round(total / 12).toLocaleString()}/month
        </p>

        <FiArrowRight className="absolute bottom-6 right-6 text-green-600" />
      </button>

    </div>
  );
};

export default BuyOrRent;