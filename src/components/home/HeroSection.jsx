import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-black text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-20 relative overflow-hidden">
      <div className="max-w-xl z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Uncomplicated mining{" "}
          <span className="text-(--primary-color)">starts here!</span>
        </h1>
        <p className="text-gray-300 mt-6 text-lg">
          Fast return on investment thanks to attractive hosting conditions.
          <br />
          Inquire today mine tomorrow.
        </p>
        <button className="mt-8 px-6 py-3 rounded-full bg-(--primary-color) text-black font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          Start mining!
        </button>
      </div>
      <div className="mt-10 md:mt-0 w-full md:w-1/2 flex justify-center">
        <img
          src="https://res.cloudinary.com/dfe8yna1k/image/upload/v1761645546/wzv85xogduggf8brwhcx.webp"
          alt="Mining Machines"
          className="w-[400px] md:w-[500px] rounded-lg object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
