import React, { useState } from "react";
import faqs from "../../utils/faq";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-6 md:px-16">

      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Everything you need to know about our mining services
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border border-gray-200 transition-all duration-300 overflow-hidden ${
                isOpen ? "bg-[#F8FBFF]" : "bg-white"
              }`}
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-5 md:p-6 text-left"
              >
                <h3 className="text-base md:text-lg font-semibold text-black">
                  {faq.question}
                </h3>

                <div className="w-6 h-6 flex items-center justify-center rounded-full text-black">
                  {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
                </div>
              </button>

              {/* ANSWER */}
              <div
                className={`transition-all duration-300 ${
                  isOpen ? "max-h-40 opacity-100 mb-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 md:px-6 pb-5 text-gray-600 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default FAQ;
