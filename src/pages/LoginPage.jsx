import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import LoaderButton from "../components/common/LoaderButton";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      setLoading(true);

      const res = await authApi.login({ email, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.detail || "Invalid email or password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f7f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#f7faf7] rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign in</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 text-sm outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

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

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <LoaderButton
            loading={loading}
            text="Sign In"
            loadingText="Signing in..."
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
          />
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
