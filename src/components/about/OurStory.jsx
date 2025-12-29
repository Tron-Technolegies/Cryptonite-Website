import React from "react";
import storyImg from "../../../public/hosting/hostingpageimg.png";

const OurStory = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-0">
      <div className="max-w-7xl mx-auto my-16 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Text Section */}
        <div className="flex-1 max-w-xl md:max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 josefin-sans">
            OUR STORY
          </h2>

          <p className="text-base sm:text-[16px] md:text-[17px] leading-relaxed mb-4 text-gray-800 dm-sans">
           Founded in 2019, Cryptonite Mining was created with a clear focus: to make professional-grade Bitcoin mining accessible through reliable infrastructure and responsible energy use.

          </p>

          <p className="text-base sm:text-[16px] md:text-[17px] leading-relaxed mb-4 text-gray-800 dm-sans">
            What began as a single data center deployment has grown into a global mining operation spanning multiple regions, supported by renewable energy sources and purpose-built facilities.

          </p>

          <p className="text-base sm:text-[16px] md:text-[17px] leading-relaxed text-gray-800 dm-sans">
           From the beginning, we understood that successful mining depends on more than hardware alone. It requires stable power, efficient cooling, secure environments, and operational expertise. Cryptonite was built to deliver all four — consistently and at scale.
Today, we support miners ranging from individual operators to large-scale deployments, all running on enterprise-grade infrastructure managed by experienced teams.

          </p>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={storyImg}
            alt="Our Story"
            className="w-full max-w-xs sm:max-w-sm md:max-w-[420px] rounded-xl object-cover shadow-md"
          />
        </div>

      </div>
    </section>
  );
};

export default OurStory;
