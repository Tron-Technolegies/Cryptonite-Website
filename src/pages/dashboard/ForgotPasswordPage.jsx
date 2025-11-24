import React, { useState } from "react";
import authApi from "../../api/authApi";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.forgotPassword({ email });
      setSuccess("Password reset link sent! Check backend terminal.");
    } catch (err) {
      alert(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>

      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full p-3 rounded bg-[#081a33] border border-[#14324f] text-white"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-(--primary-color) rounded text-black font-semibold"
        >
          Send Reset Link
        </button>
      </form>

      {success && <p className="text-green-400 mt-4">{success}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
