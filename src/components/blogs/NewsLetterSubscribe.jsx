import React from "react";
import { HiOutlineMail } from "react-icons/hi";

const NewsLetterSubscribe = () => {
  return (
    <div className="w-full bg-[#E9FFEE] py-20 text-center">
      
      {/* Heading */}
      <h2 className="text-3xl font-bold tracking-wide">
        SUBSCRIBE TO OUR NEWSLETTER
      </h2>

      <p className="text-gray-600 mt-2 max-w-xl mx-auto">
        Get the latest mining insights, tips, and industry news delivered to
        your inbox weekly.
      </p>

      {/* Subscribe Form */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-8">
        
        {/* Email Field */}
        <div className="flex items-center bg-white rounded-full px-5 py-3 w-80 shadow-sm border">
          <HiOutlineMail className="text-gray-500 text-lg" />
          <input
            type="email"
            placeholder="Enter your email"
            className="ml-3 w-full outline-none text-sm"
          />
        </div>

        {/* Subscribe Button */}
        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition">
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default NewsLetterSubscribe;
