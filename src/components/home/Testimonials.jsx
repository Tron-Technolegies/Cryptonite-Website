import React, { useState } from "react";
import testimonials from "../../utils/testimonials";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-[#F8FBFF] py-20 px-6 md:px-16">

      {/* SECTION TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide">
          Trusted by Miners Worldwide
        </h2>
        <p className="text-black mt-3">
          Don’t just take our word for it — hear from our satisfied clients
        </p>
      </div>

      {/* TESTIMONIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            {/* RATING */}
            <div className="flex gap-1 text-green-600 text-sm mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* QUOTE ICON */}
            <div className="text-green-500 text-5xl leading-none mb-4">
              ❝
            </div>

            {/* QUOTE TEXT */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              “{t.quote}”
            </p>

            {/* USER INFO */}
            <div className="flex items-center gap-4 mt-auto">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-black">{t.name}</h4>
                <p className="text-gray-500 text-sm">
                  {t.role}
                  <br />
                  {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SLIDER NAV + DOTS */}
      <div className="flex items-center justify-center gap-10 mt-10">

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="text-gray-500 hover:text-black transition"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* DOTS */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition ${
                activeSlide === index
                  ? "bg-green-600"
                  : "bg-green-300"
              }`}
            />
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="text-gray-500 hover:text-black transition"
        >
          <FiChevronRight size={24} />
        </button>

      </div>
    </section>
  );
};

export default Testimonials;
