import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaUserCircle, FaGlobe } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-4 md:px-10 py-5 flex items-center justify-between relative">
      <div className="flex items-center">
        <Link to="/">
          <span className="text-(--primary-color) text-2xl font-extrabold tracking-wide cursor-pointer">
            CRYPTONITE
          </span>
        </Link>
      </div>

      <ul className="hidden md:flex space-x-8 text-medium font-medium">
        <Link to="/hosting" className="hover:text-(--primary-color)">
          Hosting
        </Link>
        <Link to="/shop" className="hover:text-(--primary-color)">
          Shop
        </Link>
        <Link to="/about" className="hover:text-(--primary-color)">
          About
        </Link>
        <Link to="/services" className="hover:text-(--primary-color)">
          Services
        </Link>
        <Link to="/blog" className="hover:text-(--primary-color)">
          Blog
        </Link>
      </ul>

      <div className="hidden md:flex items-center space-x-5 text-lg">
        <FaInfoCircle className="cursor-pointer hover:text-(--primary-color)" />
        <FaUserCircle className="cursor-pointer hover:text-(--primary-color)" />
        <FaGlobe className="cursor-pointer hover:text-(--primary-color)" />
      </div>

      {/* Mobile Toggle Button */}
      <div
        className="md:hidden text-3xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu />
      </div>

      {/* Mobile Menu */}
      <ul
        className={`absolute left-0 w-full bg-black flex flex-col items-center space-y-4 py-6 md:hidden border-t border-gray-800 transition-all duration-300 ${
          isOpen ? "top-16 opacity-100" : "top-10 opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to="/hosting"
          className="hover:text-(--primary-color)"
          onClick={() => setIsOpen(false)}
        >
          Hosting
        </Link>
        <Link
          to="/shop"
          className="hover:text-(--primary-color)"
          onClick={() => setIsOpen(false)}
        >
          Shop
        </Link>
        <Link
          to="/about"
          className="hover:text-(--primary-color)"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          to="/services"
          className="hover:text-(--primary-color)"
          onClick={() => setIsOpen(false)}
        >
          Services
        </Link>
        <Link
          to="/blog"
          className="hover:text-(--primary-color)"
          onClick={() => setIsOpen(false)}
        >
          Blog
        </Link>

        {/* Mobile Icons */}
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
