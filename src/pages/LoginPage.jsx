import React from "react";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="bg-[#000000] min-h-screen flex items-center justify-center px-6 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT SIDE CONTENT */}
        <div className="flex flex-col justify-center text-center lg:text-left lg:items-start">
          <h1 className="text-4xl font-bold text-(--primary-color) mb-4">
            Welcome Back
          </h1>

          <p className="text-[#d1d7e0] max-w-md text-lg leading-relaxed">
            Log in to access your mining dashboard, track performance,
            manage your hosting, and stay connected with your mining operations — 
            all from one secure place.
          </p>
        </div>

        {/* RIGHT SIDE – LOGIN BOX */}
        <div className="bg-[#0b1c36] p-6 md:p-7 rounded-xl border border-[#12395e] shadow-lg">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-(--primary-color) mb-2">
            Login
          </h2>

          <p className="text-[#d1d7e0] mb-6 text-sm">
            Enter your credentials to continue.
          </p>

          {/* Login Form */}
          <form className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm text-[#d1d7e0]">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full mt-1 p-3 rounded-lg bg-[#081a33] border border-[#14324f] text-white outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-[#d1d7e0]">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full mt-1 p-3 rounded-lg bg-[#081a33] border border-[#14324f] text-white outline-none"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right -mt-1">
              <span className="text-xs text-(--primary-color) cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-(--primary-color) text-black font-semibold rounded-full hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-5 text-sm text-center text-[#9bb2c7]">
            Don't have an account?{" "}
            <span className="text-(--primary-color) cursor-pointer hover:underline">
              Sign Up
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LoginPage;
