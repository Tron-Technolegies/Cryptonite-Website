import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

// console.log("ENV BASE URL =", import.meta.env.VITE_API_URL);

const SignupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  ;


  const handleSignup = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await authApi.signup({
        username,
        email,
        password,
        password2: confirmPassword,
      });

      alert("Signup successful! Please check the email for account verification link.");
      navigate("/login");

    } catch (error) {
      console.log(error.response?.data);

      const msg =
        error.response?.data?.password ||
        error.response?.data?.email ||
        error.response?.data?.username ||
        error.response?.data?.detail ||
        "Signup failed";

      alert(msg);
    }
  };

  return (
    <section className="bg-[#000000] min-h-screen flex items-center justify-center px-6 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center text-center lg:text-left lg:items-start">
          <h1 className="text-4xl font-bold text-(--primary-color) mb-4">
            Create Your Account
          </h1>
          <p className="text-[#d1d7e0] max-w-md text-lg leading-relaxed">
            Join our mining community and access powerful hosting tools,
            performance insights, and seamless account management.
          </p>
        </div>

        {/* SIGNUP BOX */}
        <div className="bg-[#0b1c36] p-5 md:p-6 rounded-xl border border-[#12395e] shadow-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-(--primary-color) mb-2">
            Sign Up
          </h2>
          <p className="text-[#d1d7e0] mb-4 text-sm">
            Let's get you all set up.
          </p>

          <form className="space-y-3" onSubmit={handleSignup}>
            {/* USERNAME */}
            <div>
              <label className="text-xs text-[#d1d7e0]">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Enter Your Username"
                className="w-full mt-1 p-2 rounded-lg bg-[#081a33] border border-[#14324f] text-white text-sm outline-none"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs text-[#d1d7e0]">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                className="w-full mt-1 p-2 rounded-lg bg-[#081a33] border border-[#14324f] text-white text-sm outline-none"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-[#d1d7e0]">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter Your Password"
                className="w-full mt-1 p-2 rounded-lg bg-[#081a33] border border-[#14324f] text-white text-sm outline-none"
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-xs text-[#d1d7e0]">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Your Password"
                className="w-full mt-1 p-2 rounded-lg bg-[#081a33] border border-[#14324f] text-white text-sm outline-none"
                required
              />
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2 mt-1">
              <input type="checkbox" className="mt-1 w-4 h-4" required />
              <p className="text-xs text-[#9bb2c7] leading-tight">
                I agree to the{" "}
                <span className="text-[#42e2e2] cursor-pointer hover:underline">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-[#42e2e2] cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-(--primary-color) text-black font-semibold rounded-full hover:opacity-90 transition text-sm"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-3 text-xs text-center text-[#9bb2c7]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-(--primary-color) cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
