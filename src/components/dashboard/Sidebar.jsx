import React from "react";
import { FiUser, FiShield, FiLogOut } from "react-icons/fi";

const Sidebar = ({ active, setActivePage, onLogout, isOpen }) => {
  const menu = [
    { key: "profile", label: "My Profile", icon: <FiUser size={18} /> },
    { key: "security", label: "Security", icon: <FiShield size={18} /> },
  ];

  return (
    <aside
      className={`
        fixed md:static top-0 left-0
        w-64 min-h-screen
        bg-white border-r border-gray-200
        p-6 flex flex-col
        z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* TITLE */}
      <h2 className="font-semibold text-xl mb-8 text-gray-900 tracking-wide">
        User Settings
      </h2>

      {/* MENU */}
      <ul className="space-y-2">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`
              flex items-center gap-3
              cursor-pointer
              px-4 py-3 rounded-lg
              text-sm transition-all
              ${
                active === item.key
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>

      {/* LOGOUT */}
      <button
        onClick={onLogout}
        className="
          flex items-center gap-2
          text-red-500 text-sm font-medium
          mt-6
          hover:underline
        "
      >
        <FiLogOut size={16} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
