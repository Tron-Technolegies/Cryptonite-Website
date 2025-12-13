import React from "react";
import storyImg from "../../../public/hosting/hostingpageimg.png"; 

const OurStory = () => {
  return (
    <div className="w-[90%] mx-auto my-16 flex flex-col md:flex-row items-center justify-between gap-10">
      
      {/* Left Text Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">OUR STORY</h2>

        <p className="text-[16px] leading-relaxed mb-3 text-black dm-sans">
          Founded in 2019, Cryptonite Mining emerged from a vision to make
          professional cryptocurrency mining accessible to everyone. What
          started as a single data center in Iceland has grown into a global
          operation spanning three continents.
        </p>

        <p className="text-[16px] leading-relaxed mb-3 text-black dm-sans">
          We recognized that mining success requires more than just equipment—
          it demands optimal infrastructure, competitive energy rates, and
          expert support. That’s why we built our facilities in locations with
          abundant renewable energy and optimal cooling conditions.
        </p>

        <p className="text-[16px] leading-relaxed text-black dm-sans">
          Today, we’re proud to serve hundreds of clients worldwide, from
          individual miners to large-scale operations, all benefiting from our
          enterprise-grade infrastructure and dedicated support.
        </p>
      </div>

      {/* Right Image Section */}
      <div className="flex-1 flex justify-center">
        <img
          src={storyImg}
          alt="Our Story"
          className="w-full max-w-[420px] rounded-xl object-cover shadow-md"
        />
      </div>
    </div>
  );
};

export default OurStory;
