import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiX } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import cryptonite from "../../../public/logos/cryptonitelogoupdated.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const textColor = isHome ? "text-white" : "text-black";
  const hoverColor = "hover:text-green-400";
  const borderColor = isHome ? "border-white" : "border-black";

  return (
    <>
      <nav
        className={`
          absolute top-0 left-0 w-full
          bg-transparent
          px-4 md:px-10 h-20
          flex items-center justify-between
          z-50
          ${textColor}
        `}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center h-full">
          <img
            src={cryptonite}
            alt="Cryptonite Logo"
            className="h-8 sm:h-10 md:h-12 object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex space-x-10 text-[16px] font-medium">
          <Link to="/about" className={hoverColor}>About</Link>
          <Link to="/hosting" className={hoverColor}>Hosting</Link>
          <Link to="/shop" className={hoverColor}>Shop</Link>
          <Link to="/blogs" className={hoverColor}>Blog</Link>
          <Link to="/contact" className={hoverColor}>Contact</Link>
        </ul>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center space-x-6 text-xl">
          <FiSearch className={`cursor-pointer ${hoverColor}`} />

          <div className="relative cursor-pointer">
            <FiShoppingCart className={hoverColor} />
            <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </div>

          <Link
            to="/login"
            className={`
              px-5 py-2 rounded-full text-sm font-semibold transition
              border ${borderColor}
              hover:bg-green-500 hover:border-green-500 hover:text-black
            `}
          >
            Sign in
          </Link>
        </div>

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            to="/login"
            className={`px-3 py-1 rounded-full text-xs border ${borderColor}`}
          >
            Sign in
          </Link>

          <GiHamburgerMenu
            className="text-3xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`
          fixed inset Holden
          inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          z-40
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE SLIDE MENU */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[80%] max-w-sm
          bg-[#0b0f0e]
          shadow-2xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          z-50
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
          <span className="text-lg font-semibold text-white">Menu</span>
          <FiX
            className="text-2xl text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col px-6 py-8 space-y-6 text-lg text-white">
          {["about", "hosting", "shop", "blogs", "contact"].map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              onClick={() => setIsOpen(false)}
              className="border-b border-white/10 pb-2 hover:text-green-400 transition"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
