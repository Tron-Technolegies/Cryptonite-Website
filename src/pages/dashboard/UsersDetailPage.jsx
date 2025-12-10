import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import UserProfilePage from "./UserProfilePage";
import UsersSecurityPage from "./UsersSecurityPage";

const UsersDetailPage = () => {
  const [activePage, setActivePage] = useState("profile");

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
      {/* Sidebar */}
      <Sidebar
        active={activePage}
        setActivePage={setActivePage}
        onLogout={logout}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex justify-center p-6 md:p-10">
        <div className="
          w-full max-w-4xl
          bg-white 
          shadow-lg 
          rounded-2xl 
          p-8 
          border border-gray-200
        ">
          {/* Page Header */}
          <h1 className="text-2xl font-semibold mb-6">
            {activePage === "profile" ? "Personal Information" : "Security Settings"}
          </h1>

          {/* Render Page */}
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default UsersDetailPage;
