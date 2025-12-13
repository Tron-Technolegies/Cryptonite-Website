import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import UserProfilePage from "./UserProfilePage";
import UsersSecurityPage from "./UsersSecurityPage";
import { GiHamburgerMenu } from "react-icons/gi";

const UsersDetailPage = () => {
  const [activePage, setActivePage] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <UserProfilePage />;
      case "security":
        return <UsersSecurityPage />;
      default:
        return <UserProfilePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* MOBILE OVERLAY */}
      <div
        className={`
          fixed inset-0 bg-black/40 z-40
          transition-opacity
          ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          md:hidden
        `}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <Sidebar
        active={activePage}
        setActivePage={(key) => {
          setActivePage(key);
          setSidebarOpen(false);
        }}
        onLogout={logout}
        isOpen={sidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* MOBILE TOP BAR */}
        <div className="md:hidden flex items-center gap-4 px-6 h-16 bg-white shadow-sm">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
          <h1 className="font-semibold text-lg">
            {activePage === "profile"
              ? "My Profile"
              : "Security Settings"}
          </h1>
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex justify-center p-4 md:p-10">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-200">
            {/* DESKTOP TITLE */}
            <h1 className="hidden md:block text-2xl font-semibold mb-6">
              {activePage === "profile"
                ? "Personal Information"
                : "Security Settings"}
            </h1>

            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersDetailPage;
