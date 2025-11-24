import React from "react";

const Sidebar = ({ active, setActivePage, onLogout }) => {
  const menu = [
    { key: "profile", label: "My Profile" },
    { key: "security", label: "Security" },
    // { key: "orders", label: "Orders" },
    // { key: "billing", label: "Billing" },
    // { key: "notifications", label: "Notifications" },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#000000] border-r border-[#000000] p-6 flex flex-col text-white">

      {/* Title */}
      <h2 className="font-bold text-xl mb-8 text-(--primary-color)">
        Dashboard
      </h2>

      {/* Menu */}
      <ul className="space-y-3 flex-1">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`cursor-pointer p-3 rounded-lg text-sm transition ${
              active === item.key
                ? "bg-(--primary-color) text-black font-semibold shadow-md"
                : "text-[#c3d3ea] hover:bg-[#102544] hover:text-white"
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="text-red-400 text-sm font-semibold hover:underline mt-auto"
      >
        Logout
      </button>

    </div>
  );
};

export default Sidebar;
