import React, { useState } from "react";
import authApi from "../../api/authApi";

const UsersSecurityPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await authApi.forgotPassword({ email });
      setSuccess(res.data.detail);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Security Settings</h2>

      <div className="border border-gray-200 rounded-2xl p-6 max-w-md">
        <h3 className="font-semibold mb-2">Reset Password</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email address. We’ll send you a password reset link.
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsersSecurityPage;
