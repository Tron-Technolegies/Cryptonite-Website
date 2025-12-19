import React, { useState } from "react";
import testimonials from "../../utils/testimonials";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Testimonials = () => {
  const [active, setActive] = useState(1);

  const prev = () => setActive(active === 0 ? testimonials.length - 1 : active - 1);
  const next = () => setActive((active + 1) % testimonials.length);

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* SOFT CENTER GLOW */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[520px] h-[520px] bg-white/50 blur-[180px] rounded-full" />
      </div>

      {/* TITLE */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="text-white text-3xl md:text-4xl josefin-sans font-bold tracking-wide uppercase">
          Trusted by Miners Worldwide
        </h2>
        <p className="text-gray-400 text-sm mt-3">
          Don’t just take our word for it — hear from our satisfied clients
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative z-10 flex items-center justify-center">
        {/* LEFT BUTTON */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-6 md:left-20 
             w-10 h-10 md:w-12 md:h-12 
             rounded-full bg-white text-black 
             flex items-center justify-center shadow-lg 
             z-20"
        >
          <FiChevronLeft size={22} />
        </button>

        {/* CARD STACK */}
        <div className="relative w-full max-w-xl h-[260px] flex items-center justify-center">
          {testimonials.map((t, index) => {
            const pos = index - active;
            if (Math.abs(pos) > 2) return null;

            return (
              <div
                key={t.id}
                className="
                  absolute w-[360px] rounded-2xl
                  bg-[#0d0d0d] text-white
                  px-8 py-10 text-center border border-gray-500
                  transition-all duration-500 ease-out
                "
                style={{
                  transform: `
                    translateX(${pos * 110}px)
                    scale(${pos === 0 ? 1 : 0.92})
                  `,
                  opacity: pos === 0 ? 1 : 0.35,
                  zIndex: 10 - Math.abs(pos),
                  filter: pos === 0 ? "blur(0)" : "blur(2px)",
                }}
              >
                {/* AVATAR */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full mx-auto mb-4 object-cover"
                />

                {/* NAME */}
                <h4 className="font-semibold text-base">{t.name}</h4>

                {/* ROLE */}
                <p className="text-gray-400 text-xs mb-4">{t.role}</p>

                {/* QUOTE */}
                <p className="text-gray-300 text-sm leading-relaxed">{t.quote}</p>
              </div>
            );
          })}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={next}
          className="absolute right-2 sm:right-6 md:right-20 
             w-10 h-10 md:w-12 md:h-12 
             rounded-full bg-white text-black 
             flex items-center justify-center shadow-lg 
             z-20"
        >
          <FiChevronRight size={22} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
