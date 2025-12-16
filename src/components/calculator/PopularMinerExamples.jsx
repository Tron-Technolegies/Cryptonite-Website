import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineCalculator } from "react-icons/hi";

export default function PopularMinerExamples() {
  const [open, setOpen] = useState(false);

  const miners = [
    {
      model: "Antminer S21 Pro 234T",
      hashrate: "234 TH/s",
      power: "3,510 W",
      electricity: "0.062 €/kWh",
      location: "#NexNA1 (USA)",
      daily: "€1.93",
      monthly: "€58.82",
      roi: "46.9 mo",
    },
    {
      model: "Antminer S21 Pro 234T",
      hashrate: "234 TH/s",
      power: "3,510 W",
      electricity: "0.062 €/kWh",
      location: "#NexNA1 (USA)",
      daily: "€1.93",
      monthly: "€58.82",
      roi: "46.9 mo",
    },
    {
      model: "Antminer S21 Pro 234T",
      hashrate: "234 TH/s",
      power: "3,510 W",
      electricity: "0.062 €/kWh",
      location: "#NexNA1 (USA)",
      daily: "€1.93",
      monthly: "€58.82",
      roi: "46.9 mo",
    },
  ];

  return (
    <div className="bg-[#f6faf7] rounded-xl  mt-10">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-2">
          <HiOutlineCalculator className="text-green-600" />
          <h3 className="text-lg font-semibold">Popular Miner Examples</h3>
        </div>

        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {/* Content */}
      {open && (
        <div className="border-t border-[#A6BFAF] px-4 pb-4 overflow-x-auto">
          <table className="w-full text-sm mt-4">
            <thead className="text-gray-600 border-b border-[#A6BFAF]">
              <tr>
                <th className="text-left py-3">Model</th>
                <th>Hashrate</th>
                <th>Power</th>
                <th>Electricity</th>
                <th>Location</th>
                <th>Daily</th>
                <th>Monthly</th>
                <th>ROI</th>
              </tr>
            </thead>

            <tbody>
              {miners.map((m, i) => (
                <tr key={i} className="border-b border-[#A6BFAF] last:border-b-0">
                  <td className="py-4 font-medium">{m.model}</td>
                  <td className="text-center">{m.hashrate}</td>
                  <td className="text-center">{m.power}</td>
                  <td className="text-center">{m.electricity}</td>
                  <td className="text-center">{m.location}</td>
                  <td className="text-center">{m.daily}</td>
                  <td className="text-center">{m.monthly}</td>
                  <td className="text-center">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                      {m.roi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Note */}
          <p className="text-sm text-gray-500 mt-4">
            <strong>Note:</strong> Calculation examples are based on publicly available data. Actual
            returns may vary.
          </p>
        </div>
      )}
    </div>
  );
}
