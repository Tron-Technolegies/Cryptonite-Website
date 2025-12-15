import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import LoaderButton from "../components/common/LoaderButton";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await authApi.signup({
        username,
        email,
        password,
        password2: confirmPassword,
      });

      toast.success(
        "Signup successful! Please check your email for verification."
      );

      navigate("/login");
    } catch (error) {
      const msg =
        error.response?.data?.password?.[0] ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.username?.[0] ||
        error.response?.data?.detail ||
        "Signup failed";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f7f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#f7faf7] rounded-xl p-8 shadow-sm">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-700">Name</label>
            <input
              name="username"
              type="text"
              className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 text-sm outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 text-sm outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-3 py-2 pr-10 rounded-md border border-gray-300 text-sm outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full mt-1 px-3 py-2 pr-10 rounded-md border border-gray-300 text-sm outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* CHECKBOXES */}
          <div className="space-y-2 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-green-600" />
              Remember me
            </label>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="accent-green-600 mt-1"
                required
              />
              <span>
                I agree to all the{" "}
                <span className="text-green-600 cursor-pointer">Terms</span>{" "}
                and{" "}
                <span className="text-green-600 cursor-pointer">
                  Privacy policy
                </span>
              </span>
            </label>
          </div>

          {/* BUTTON */}
          <LoaderButton
            loading={loading}
            text="Sign Up"
            loadingText="Creating account..."
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
          />
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignupPage;
