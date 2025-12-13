import React from "react";

const UserProfilePage = () => {
  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">

      {/* Profile Card */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg sm:text-xl font-medium mb-4">
          Basic Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          <div>
            <p className="text-xs sm:text-sm text-gray-500">
              Full Name
            </p>
            <p className="font-medium text-gray-900 text-sm sm:text-base">
              John Doe
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-gray-500">
              Email Address
            </p>
            <p className="font-medium text-gray-900 text-sm sm:text-base break-all">
              john@example.com
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-gray-500">
              Phone Number
            </p>
            <p className="font-medium text-gray-900 text-sm sm:text-base">
              9876543210
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-gray-500">
              Joined Date
            </p>
            <p className="font-medium text-gray-900 text-sm sm:text-base">
              12 Oct 2024
            </p>
          </div>

        </div>
      </div>

      {/* Account Info */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg sm:text-xl font-medium mb-4">
          Account Information
        </h2>

        <div className="space-y-3 sm:space-y-4">
          <p className="text-gray-700 text-sm sm:text-base">
            Account Type:{" "}
            <span className="font-medium">Standard User</span>
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

export default UserProfilePage;
