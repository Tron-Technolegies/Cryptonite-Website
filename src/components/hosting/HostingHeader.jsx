import React from "react";

const HostingHeader = () => {
  return (
    <section className="bg-white text-black px-4 sm:px-6 md:px-16 lg:px-24 py-14 md:py-20 font-sans">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide josefin-sans">
          PREMIUM HOSTING <br className="hidden sm:block" />
          SOLUTIONS
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-4 dm-sans text-black
            text-sm sm:text-base md:text-lg
            leading-relaxed md:leading-8
            max-w-xl sm:max-w-2xl mx-auto dm-sans
          "
        >
          Professional Bitcoin mining infrastructure. Operated at scale. <br />Reliable hosting for miners who value performance and stability.
        </p>
      </div>
    </section>
  );
};

export default HostingHeader;
