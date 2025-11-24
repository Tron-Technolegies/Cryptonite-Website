import React, { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  if (!user) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#000000] text-white px-6 py-10">
      
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {/* Profile Header */}
      <div className="bg-[#0b1c36] border border-[#12395e] shadow-lg rounded-xl p-6 flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100"
            className="w-20 h-20 rounded-full border-2 border-(--primary-color)"
          />

          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-[#9bb2c7]">Customer</p>
            {/* <p className="text-gray-400 text-sm">India</p> */}
          </div>
        </div>

        <button className="text-(--primary-color) text-sm hover:underline">
          Edit ✏️
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-[#0b1c36] border border-[#12395e] shadow-lg rounded-xl p-6 mt-8">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Personal Information</h3>
          <button className="text-(--primary-color) text-sm hover:underline">
            Edit ✏️
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
          <div>
            <p className="text-gray-400 text-sm">Full Name</p>
            <p className="font-medium text-white">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="font-medium text-white">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Bio</p>
            <p className="font-medium text-white">Team Member</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="font-medium text-white">+91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-[#0b1c36] border border-[#12395e] shadow-lg rounded-xl p-6 mt-8">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Address</h3>
          <button className="text-(--primary-color) text-sm hover:underline">
            Edit ✏️
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
          <div>
            <p className="text-gray-400 text-sm">Country</p>
            <p className="font-medium text-white">India</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">City/State</p>
            <p className="font-medium text-white">Kerala</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Postal Code</p>
            <p className="font-medium text-white">695601</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">TAX ID</p>
            <p className="font-medium text-white">ABCD123456</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserProfilePage;
