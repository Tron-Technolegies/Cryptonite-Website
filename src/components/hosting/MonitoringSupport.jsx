import React from "react";
import monitoringImg from "../../../public/hosting/hostingpageimg.png"; // adjust path if needed

const MonitoringSupport = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-0 my-16">
      <div className="max-w-7xl mx-auto bg-[#f6fbf7] border border-green-200 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-10">
        
        {/* LEFT CONTENT */}
        <div className="flex-1">
          {/* Badge */}
          <span className="inline-block text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full mb-4">
            Dedicated Team
          </span>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 josefin-sans">
            EXPERT MONITORING & <br className="hidden sm:block" />
            SUPPORT
          </h2>

          {/* Description */}
          <p className="text-gray-700 dm-sans leading-relaxed mb-4 max-w-xl">
            Our team of experienced technicians monitors your equipment around
            the clock. From performance optimization to emergency response, we
            ensure your mining operation runs smoothly at all times.
          </p>

          {/* Bullet Points */}
          <ul className="list-disc list-inside space-y-2 text-gray-700 dm-sans text-sm">
            <li>Real-time performance monitoring</li>
            <li>Proactive issue detection</li>
            <li>Rapid response times</li>
            <li>Dedicated account managers</li>
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 relative flex justify-center">
          <img
            src={monitoringImg}
            alt="Expert Monitoring and Support"
            className="w-full max-w-md rounded-xl object-cover shadow-md"
          />

          {/* Overlay Badge */}
          <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-green-600 shadow">
            24/7 Support
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringSupport;
