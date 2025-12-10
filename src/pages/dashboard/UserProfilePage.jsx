import React from "react";

const UserProfilePage = () => {
  return (
    <div className="space-y-8">

      {/* Profile Card */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-medium mb-4">Basic Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium text-gray-900">John Doe</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium text-gray-900">john@example.com</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium text-gray-900">9876543210</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joined Date</p>
            <p className="font-medium text-gray-900">12 Oct 2024</p>
          </div>

        </div>
      </div>

      {/* Other Info */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-medium mb-4">Account Information</h2>

        <div className="space-y-4">
          <p className="text-gray-700">Account Type: <span className="font-medium">Standard User</span></p>
          <p className="text-gray-700">Status: <span className="font-medium text-green-600">Active</span></p>
        </div>
      </div>

    </div>
  );
};

export default UserProfilePage;
