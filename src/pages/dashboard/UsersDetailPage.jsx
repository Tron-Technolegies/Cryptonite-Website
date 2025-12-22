import React, { useState, useEffect } from "react";
import userApi from "../../api/userApi";
import UserProfilePage from "./UserProfilePage";
import UsersSecurityPage from "./UsersSecurityPage";
import UserOrdersPage from "./UsersOrdersPage";

const UsersDetailPage = () => {
  const [active, setActive] = useState("personal");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.getMe();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderContent = () => {
    switch (active) {
      case "personal":
        return <UserProfilePage />;
      // case "security":
      //   return <UsersSecurityPage />;
      case "orders":
        return <UserOrdersPage />;
      default:
        return <UserProfilePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
      {/* HEADER */}
      <h1 className="text-2xl sm:text-4xl font-bold tracking-tight josefin-sans">
        My Profile
      </h1>
      <p className="text-black mt-2 text-sm dm-sans">
        Manage your account settings, addresses, and preferences.
      </p>

      <hr className="my-6 sm:my-8 border-gray-200" />

      {/* PROFILE SUMMARY */}
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 mb-8">
        {/* AVATAR */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
          <svg
            className="text-white"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        {/* INFO */}
        <div className="text-center sm:text-left">
          <h2 className="font-bold text-xl sm:text-2xl mb-2">
            {user?.full_name || user?.username}
          </h2>

          <div className="text-sm text-gray-600 space-y-2">
            <p>Email: {user?.email || "—"}</p>
            <p>Location: Austria</p>
          </div>

          <span className="inline-block mt-3 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            Verified Account
          </span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-6">
        {/* SIDEBAR */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="border border-gray-200 rounded-2xl p-2 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            <SidebarItem
              label="Personal Info"
              active={active === "personal"}
              onClick={() => setActive("personal")}
            />
            {/* <SidebarItem
              label="Security"
              active={active === "security"}
              onClick={() => setActive("security")}
            /> */}
            <SidebarItem
              label="Orders"
              active={active === "orders"}
              onClick={() => setActive("orders")}
            />

            {/* DESKTOP SIGN OUT */}
            <div className="hidden lg:block mt-4">
              <hr className="my-3 mx-2 border-gray-200" />
              <button
                onClick={logout}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <section className="col-span-12 lg:col-span-9">
          <div className="border border-gray-200 rounded-2xl p-5 sm:p-8">
            {renderContent()}
          </div>
        </section>
      </div>

      {/* MOBILE SIGN OUT */}
      <div className="lg:hidden mt-6">
        <button
          onClick={logout}
          className="w-full py-3 rounded-xl text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap px-4 py-2 sm:py-3 rounded-xl text-sm font-medium transition-colors
      ${
        active
          ? "bg-green-50 text-green-700"
          : "text-gray-700 hover:bg-gray-50"
      }`}
  >
    {label}
  </button>
);

export default UsersDetailPage;
