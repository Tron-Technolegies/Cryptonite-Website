import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const VerifyEmailPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axiosClient.get(
          `/auth/verify-email/${uid}/${token}/`
        );

        if (res.data.access) {
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        setStatus("success");

        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [uid, token, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      {status === "loading" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-green-400">
            Verifying Email...
          </h1>
          <p className="text-gray-300">
            Please wait while we verify your account.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-green-400">
            Email Verified 🎉
          </h1>
          <p className="text-gray-300">Redirecting to your dashboard...</p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-red-400">
            Verification Failed ❌
          </h1>
          <p className="text-gray-300">Invalid or expired link.</p>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-6 py-2 bg-green-500 rounded text-black font-semibold"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
