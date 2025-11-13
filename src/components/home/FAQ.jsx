import React, { useState } from "react";
import faqs from "../../utils/faq";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-gray-900 rounded-xl border border-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-5 text-left"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-100">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <FaMinus className="text-gray-400" />
              ) : (
                <FaPlus className="text-gray-400" />
              )}
            </button>

            {/* Expandable Answer */}
            {openIndex === index && (
              <div className="px-5 pb-5 text-sm text-gray-400 border-t border-gray-800">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
