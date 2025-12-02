import React, { useState } from "react";

const events = [
  {
    id: 1,
    title: "Annual Team Meeting",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Bitcoin Summit 2025",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Crypto Growth Workshop",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Miners Tech Meetup",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Team Celebration",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Crypto Expo Riyadh",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
  },
];

const EventsAndCelebrations = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(events.length / itemsPerSlide);

  const goToSlide = (i) => {
    setCurrentSlide(i);
  };

  return (
    <section className="bg-white text-black py-20 px-6 md:px-16">

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
          Events & Celebrations
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-(--primary-color) rounded-full"></span>
        </h2>

        <p className="mt-4 text-gray-600 text-lg">
          Explore the key moments, events, achievements, and experiences that shape our journey.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative mt-10 overflow-hidden">

        {/* Slide Container */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${totalSlides * 100}%`,
            transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const slideItems = events.slice(
              slideIndex * itemsPerSlide,
              slideIndex * itemsPerSlide + itemsPerSlide
            );

            return (
              <div
                key={slideIndex}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-4"
                style={{ width: `${100 / totalSlides}%` }}
              >
                {slideItems.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 shadow-md rounded-2xl p-4 hover:shadow-xl transition duration-300"
                  >
                    {/* Image */}
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-xl transform hover:scale-110 transition duration-500"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-center text-lg font-semibold text-black">
                      {event.title}
                    </h3>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentSlide === i
                  ? "bg-yellow-400 scale-125"
                  : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsAndCelebrations;
