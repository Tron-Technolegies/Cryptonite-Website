import React from "react";

const AboutHeroSection = () => {
  return (
    <section className="bg-[#000000] text-[#c9d4e0] py-20 px-6 md:px-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-(--primary-color)">
          Welcome to Cryotonite
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#ffffff]">
          At Cryptonite, we specialize in Crypto mining infrastructure, offering
          top-tier solutions for hardware procurement, hosting, and repair
          services. Our state-of-the-art facilities and industry expertise
          ensure seamless mining operations, whether you’re looking to buy,
          host, or maintain ASIC miners.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-(--primary-color) font-semibold">About us</p>

          <h2 className="text-3xl md:text-3xl mt-3 font-bold text-(--primary-color)">
            Leading Crypto Mining Company in Abu Dhabi, UAE
          </h2>

          <p className="mt-5 leading-relaxed text-[#ffffff] text-lg">
            With years of experience in the UAE, we’ve built a seamless mining
            ecosystem for our clients. From sourcing the most profitable mining
            machines to providing top-tier hosting services, we ensure optimal
            performance and uptime.
          </p>

          <p className="mt-5 leading-relaxed text-[#ffffff] text-lg">
            Our facilities feature IoT-based controls, expert infrastructure
            setup, and round-the-clock maintenance to ensure maximum efficiency
            and uptime. We also provide free miner configuration, pool setup
            assistance, and on-site repair services to keep your operations
            running smoothly.
          </p>

          <p className="mt-5 leading-relaxed text-[#ffffff] text-lg">
            Visit our crypto hosting center in Abu Dhabi and take your mining
            operations to the next level!
          </p>
        </div>

        <div className="flex justify-center lg:justify-center mt-20">
          <div className="bg-[#0f2038] p-10 rounded-lg border border-[#1e3a55] grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl ">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">5000+</h3>
              <p className="text-[#9db2c4] mt-2">ASIC Miners Hosted</p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">30 MW+</h3>
              <p className="text-[#9db2c4] mt-2">Combined capacity of 30+ MW</p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">2</h3>
              <p className="text-[#9db2c4] mt-2">Hosting across 2 nations</p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">0%</h3>
              <p className="text-[#9db2c4] mt-2">
                Commission on Mining Earnings
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
