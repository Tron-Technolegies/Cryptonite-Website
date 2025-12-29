import React from "react";
import { FaUserShield } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { GiDiamondHard } from "react-icons/gi";

const OurValues = () => {
  const values = [
    {
      icon: <FaUserShield className="text-green-600 text-2xl" />,
      title: "Mission-Driven",
      desc: "We focus on building professional mining infrastructure that is accessible, reliable, and built to last.",
    },
    {
      icon: <BsLightningChargeFill className="text-green-600 text-2xl" />,
      title: "Innovation First",
      desc: "We continuously improve our systems, processes, and operations to stay efficient and resilient"
    },
    {
      icon: <MdSupportAgent className="text-green-600 text-2xl" />,
      title: "Operator-Focused",
      desc: "We design our infrastructure around the real needs of miners, from deployment to daily operations",
    },
    {
      icon: <GiDiamondHard className="text-green-600 text-2xl" />,
      title: "Quality Assured",
      desc: "Enterprise-grade facilities with strict standards for uptime, security, and performance"
    },
  ];

  return (
    <div className="max-w-5xl mx-auto text-center my-20">
      <h2 className="text-3xl font-bold josefin-sans">OUR VALUES</h2>
      <p className="text-black mt-2 dm-sans">The principles behind how we build and operate.</p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
        {values.map((item, index) => (
          <div
            key={index}
            className="
              border rounded-xl p-6 text-left bg-white shadow-sm hover:shadow-md transition
              w-[90%] sm:w-full max-w-sm
            "
          >
            <div className="mb-4">{item.icon}</div>

            <h3 className="font-semibold text-lg dm-sans">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2 dm-sans">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValues;
