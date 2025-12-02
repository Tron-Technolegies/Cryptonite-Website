import React, { useState } from "react";
import faqs from "../../utils/faq";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-6 md:px-16">

      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-black inline-block relative">
          Frequently Asked Questions
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-yellow-400 rounded-full"></span>
        </h2>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* QUESTION */}
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-5 text-left"
            >
              <h3 className="text-base md:text-lg font-semibold text-black">
                {faq.question}
              </h3>

              <div className="
                w-7 h-7 flex items-center justify-center 
                rounded-full bg-gray-100 text-gray-600
                transition-all duration-300
              ">
                {openIndex === index ? (
                  <FaMinus className="text-sm" />
                ) : (
                  <FaPlus className="text-sm" />
                )}
              </div>
            </button>

            {/* ANSWER */}
            <div
              className={`
                overflow-hidden transition-all duration-300 
                ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <div className="px-5 pb-5 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-200">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default FAQ;
