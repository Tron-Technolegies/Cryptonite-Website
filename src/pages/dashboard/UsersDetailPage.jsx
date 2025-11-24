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
    <div className="flex bg-black min-h-screen">
      <Sidebar
        active={activePage}
        setActivePage={setActivePage}
        onLogout={logout}
      />

      <div className="flex-1 p-8">{renderPage()}</div>
    </div>
  );
};

export default UsersDetailPage;
