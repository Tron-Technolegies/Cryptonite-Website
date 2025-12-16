import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function HowToUseCalculator() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#F4F7F5] rounded-xl shadow my-8 dm-sans">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <h3 className="text-lg font-semibold">How to use this calculator?</h3>
        {open ? <FiChevronUp size={22} /> : <FiChevronDown size={22} />}
      </button>

      {/* Content */}
      {open && (
        <div className="px-6 pb-6 border-t border-[#A6BFAF]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm text-gray-700">
            {/* Left */}
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600  font-bold">1</span>
                Enter your hashrate in TH/s.
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">3</span>
                Enter your miner’s power consumption in watts.
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">5</span>
                Enter the pool fee (usually 2% for PPLNS, 4% for PPS/FPPS).
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">7</span>
                Enter your electricity costs per kWh.
              </li>
            </ul>

            {/* Right */}
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">2</span>
                Optional: Adjust the current Bitcoin price and factor in future expectations.
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">4</span>
                Optional: Adjust the current hash value.
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">6</span>
                Click <strong>“Calculate”</strong> to see revenue, electricity costs, and profit.
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">8</span>
                Optional: Download the results as a PDF file.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
