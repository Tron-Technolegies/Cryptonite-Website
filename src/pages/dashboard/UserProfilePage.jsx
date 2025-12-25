import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.getMe();
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">

      {/* BASIC DETAILS */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg sm:text-xl font-medium mb-4">
          Basic Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          <ProfileField
            label="Full Name"
            value={loading ? "—" : user?.full_name || user?.username || "—"}
          />

          <ProfileField
            label="Email Address"
            value={loading ? "—" : user?.email || "—"}
            breakAll
          />

          {/* <ProfileField
            label="Phone Number"
            value={loading ? "—" : user?.phone || "—"}
          />

          <ProfileField
            label="Joined Date"
            value={
              loading
                ? "—"
                : user?.created_at
                ? formatDate(user.created_at)
                : "—"
            }
          /> */}

        </div>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg sm:text-xl font-medium mb-4">
          Account Information
        </h2>

        <div className="space-y-3 sm:space-y-4">
          <p className="text-gray-700 text-sm sm:text-base">
            Account Type:{" "}
            <span className="font-medium">
              {loading ? "—" : user?.role || "Standard User"}
            </span>
          </p>

          <p className="text-gray-700 text-sm sm:text-base">
            Status:{" "}
            <span className="font-medium text-green-600">
              Active
            </span>
          </p>
        </div>
      </div>

    </div>
  );
};

const ProfileField = ({ label, value, breakAll }) => (
  <div>
    <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    <p
      className={`font-medium text-gray-900 text-sm sm:text-base ${
        breakAll ? "break-all" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default UserProfilePage;
