import React from "react";
import { FiTruck, FiHome, FiCheck, FiArrowRight } from "react-icons/fi";

const BuyOptions = ({ productName, onShip, onHost }) => {
  return (
    <div>

      <div className="flex justify-center mb-4">
        <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
          Buying {productName}
        </span>
      </div>

      <h3 className="text-center text-xl font-semibold mb-10">
        How would you like to receive your miner?
      </h3>

      <div className="grid md:grid-cols-2 gap-6">

        {/* SHIP */}
        <button
          onClick={onShip}
          className="border-2 border-green-300 bg-green-50 rounded-xl p-6 text-left relative"
        >
          <div className="flex gap-3 mb-4">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
              <FiTruck className="text-green-700" />
            </div>
            <div>
              <p className="font-semibold">Ship to Me</p>
              <p className="text-sm text-gray-600">Deliver to your location</p>
            </div>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><FiCheck /> Worldwide shipping</li>
            <li className="flex gap-2"><FiCheck /> Insured delivery</li>
            <li className="flex gap-2"><FiCheck /> Track shipment</li>
          </ul>

          <FiArrowRight className="absolute bottom-6 right-6 text-green-600" />
        </button>

        {/* HOST */}
        <button
          onClick={onHost}
          className="border border-gray-300 rounded-xl p-6 text-left relative"
        >
          <div className="flex gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FiHome className="text-green-700" />
            </div>
            <div>
              <p className="font-semibold">Host with Us</p>
              <p className="text-sm text-gray-600">We manage everything</p>
            </div>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><FiCheck /> Professional facility</li>
            <li className="flex gap-2"><FiCheck /> 24/7 monitoring</li>
            <li className="flex gap-2"><FiCheck /> Low electricity cost</li>
          </ul>

          <FiArrowRight className="absolute bottom-6 right-6 text-green-600" />
        </button>

      </div>
    </div>
  );
};

export default BuyOptions;
