import React, { useState } from "react";
import { FaInfoCircle, FaUserCircle, FaGlobe } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-4 md:px-10 py-5 flex items-center justify-between relative">

      {/* LOGO */}
      <div className="flex items-center">
        <span className="text-(--primary-color) text-2xl font-extrabold tracking-wide">
          CRYPTONITE
        </span>
      </div>

      {/* DESKTOP MENU */}
      <ul className="hidden md:flex space-x-8 text-medium font-medium">
        <li className="hover:text-(--primary-color) cursor-pointer">Hosting</li>
        <li className="hover:text-(--primary-color) cursor-pointer">Shop</li>
        <li className="hover:text-(--primary-color) cursor-pointer">About</li>
        <li className="hover:text-(--primary-color) cursor-pointer">Services</li>
        <li className="hover:text-(--primary-color) cursor-pointer">Blog</li>
      </ul>

      {/* DESKTOP ICONS */}
      <div className="hidden md:flex items-center space-x-5 text-lg">
        <FaInfoCircle className="cursor-pointer hover:text-(--primary-color)" />
        <FaUserCircle className="cursor-pointer hover:text-(--primary-color)" />
        <FaGlobe className="cursor-pointer hover:text-(--primary-color)" />
      </div>

      {/* MOBILE MENU BUTTON */}
      <div
        className="md:hidden text-3xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu />
      </div>

      {/* MOBILE MENU */}
      <ul
        className={`absolute left-0 w-full bg-black flex flex-col items-center space-y-4 py-6 md:hidden border-t border-gray-800 transition-all duration-300 ${
          isOpen ? "top-16 opacity-100" : "top-10 opacity-0 pointer-events-none"
        }`}
      >
        <li className="hover:text-(--primary-color) cursor-pointer">Hosting</li>
        <li className="hover:text-(--primary-color) cursor-pointer">Shop</li>
        <li className="hover:text-(--primary-color) cursor-pointer">About</li>
        <li className="hover:text-(--primary-color) cursor-pointer">Services</li>
        <li className="hover:text-(--primary-color) cursor-pointer">Blog</li>

        {/* MOBILE ICONS */}
        <div className="flex space-x-6 pt-4 text-xl">
          <FaInfoCircle className="cursor-pointer hover:text-(--primary-color)" />
          <FaUserCircle className="cursor-pointer hover:text-(--primary-color)" />
          <FaGlobe className="cursor-pointer hover:text-(--primary-color)" />
        </div>
      </ul>
    </nav>
  );
};

export default Header;
