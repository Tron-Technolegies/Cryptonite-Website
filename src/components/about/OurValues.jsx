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
      desc: "Democratize cryptocurrency mining with accessible, professional grade infrastructure for everyone.",
    },
    {
      icon: <BsLightningChargeFill className="text-green-600 text-2xl" />,
      title: "Innovation First",
      desc: "Constantly improving our technology and processes to deliver the best mining experience.",
    },
    {
      icon: <MdSupportAgent className="text-green-600 text-2xl" />,
      title: "Customer Focused",
      desc: "Your success is our success. We're committed to providing exceptional support and service.",
    },
    {
      icon: <GiDiamondHard className="text-green-600 text-2xl" />,
      title: "Quality Assured",
      desc: "Enterprise-grade infrastructure with industry-leading uptime and security standards.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto text-center my-20">
      <h2 className="text-3xl font-bold">OUR VALUES</h2>
      <p className="text-gray-600 mt-2">The principles that guide everything we do</p>

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

            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValues;
