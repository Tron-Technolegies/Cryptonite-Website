import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

const ResetPasswordPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await authApi.resetPassword(uid, token, {
        password: newPassword,
        password2: confirm,
      });

      alert("Password reset successful. Please login.");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.detail || "Invalid or expired link.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>

      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 rounded bg-[#081a33] border border-[#14324f] text-white"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded bg-[#081a33] border border-[#14324f] text-white"
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-(--primary-color) rounded text-black font-semibold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
