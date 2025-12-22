import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "../../api/authApi";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.forgotPassword({ email });
      toast.success(res.data.detail);
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7faf7] px-4">
      <div className="bg-[#f4fbf4] rounded-2xl px-10 py-12 w-full max-w-md text-center">
        <h1 className="text-xl font-semibold mb-8">Forget Password</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="text-sm text-gray-600 block mb-2">
              Enter your email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <Link
          to="/login"
          className="inline-block mt-6 text-sm text-gray-500 hover:text-gray-700"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
