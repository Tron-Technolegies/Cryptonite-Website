import React from "react";
import datacenterimg from "../../../public/hosting/hostingpageimg.png"

const DataCenters = () => {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-16 font-sans">
      <div className="bg-[#F4FAF6] rounded-2xl border border-gray-200 p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-10">

        {/* LEFT CONTENT */}
        <div className="flex-1 dm-sans">
          {/* Tag */}
          <span className="inline-block bg-[#DFF5E6] text-[#2E7D32] text-xs font-semibold px-3 py-1 rounded-full">
            Infrastructure Overview
          </span>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-4 text-gray-900 josefin-sans">
            WORLD-CLASS DATA CENTERS
          </h2>

          {/* Description */}
          <p className="text-gray-600 mt-4 leading-relaxed dm-sans">
           Our data centers are engineered specifically for high-density Bitcoin mining operations.
 Each facility is designed to deliver consistent performance through stable power, efficient cooling, and secure environments.
We focus on operational reliability — not overpromising outcomes.

          </p>

          {/* Bullet List */}
          <ul className="mt-6 text-gray-700 space-y-2 dm-sans">
            <li>• Advanced cooling systems optimized for ASIC performance</li>
            <li>• Redundant power infrastructure with failover protection</li>
            <li>• 24/7 on-site monitoring and access control</li>
            <li>• Integrated fire detection and suppression systems</li>
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
            <p className="text-green-600 font-bold text-sm dm-sans"> Targeted 99.9%%</p>
            <p className="text-[10px] text-gray-500 dm-sans">Operational Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCenters;
