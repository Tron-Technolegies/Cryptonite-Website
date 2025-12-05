import React from "react";
import datacenterimg from "../../../public/hosting/hostingpageimg.png"

const DataCenters = () => {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-16 font-sans">
      <div className="bg-[#F4FAF6] rounded-2xl border border-gray-200 p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-10">

        {/* LEFT CONTENT */}
        <div className="flex-1">
          {/* Tag */}
          <span className="inline-block bg-[#DFF5E6] text-[#2E7D32] text-xs font-semibold px-3 py-1 rounded-full">
            Art Infrastructure
          </span>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-4 text-gray-900">
            WORLD-CLASS DATA CENTERS
          </h2>

          {/* Description */}
          <p className="text-gray-600 mt-4 leading-relaxed">
            Our facilities are designed from the ground up for cryptocurrency
            mining. With advanced cooling systems, redundant power supplies, and
            enterprise-grade security, your equipment operates at peak efficiency
            24/7.
          </p>

          {/* Bullet List */}
          <ul className="mt-6 text-gray-700 space-y-2">
            <li>• Advanced cooling systems</li>
            <li>• Redundant power infrastructure</li>
            <li>• 24/7 security monitoring</li>
            <li>• Fire suppression systems</li>
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex-1 w-full">
          <img
            src={datacenterimg}
            alt="Data Center"
            className="rounded-xl w-full object-cover shadow"
          />

          {/* Floating Badge */}
          <div className="absolute -bottom-4 left-4 bg-white shadow-lg px-4 py-2 rounded-xl border">
            <p className="text-green-600 font-bold text-sm">99.9%</p>
            <p className="text-[10px] text-gray-500">Uptime Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCenters;
