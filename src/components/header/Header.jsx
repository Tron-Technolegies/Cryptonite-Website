import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import cryptonite from "../../../public/logos/cryptonitelogoupdated.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white text-black px-4 md:px-10 h-20 flex items-center justify-between w-full shadow-sm z-[9999]">

      {/* LOGO */}
      <div className="flex items-center h-full">
        <Link to="/">
          <img
            src={cryptonite}
            alt="Cryptonite Logo"
            className="
              h-8 
              sm:h-10 
              md:h-12 
              w-auto 
              object-contain 
              cursor-pointer
            "
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-10 text-[16px] font-medium">
        <Link to="/about" className="hover:text-(--primary-color)">About</Link>
        <Link to="/hosting" className="hover:text-(--primary-color)">Hosting</Link>
        <Link to="/miners" className="hover:text-(--primary-color)">ASIC miners</Link>
        <Link to="/referral" className="hover:text-(--primary-color)">Referral</Link>
        <Link to="/about" className="hover:text-(--primary-color)">Company</Link>
      </ul>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center space-x-6 text-xl">
        <FiSearch className="cursor-pointer hover:text-(--primary-color)" />

        <div className="relative cursor-pointer">
          <FiShoppingCart className="hover:text-(--primary-color)" />
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </div>

        <Link
          to="/login"
          className="px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-900"
        >
          Sign in
        </Link>
      </div>

      {/* Mobile Button */}
      <div
        className="md:hidden text-3xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu />
      </div>

      {/* Mobile Menu — FIXED + HIGH Z-INDEX */}
      <ul
        className={`
          fixed 
          left-0 
          top-20 
          w-full 
          bg-white/95 
          backdrop-blur-lg 
          flex flex-col items-center space-y-6 py-6 
          md:hidden 
          transition-all duration-300 
          shadow-xl
          z-[99999]
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/hosting" onClick={() => setIsOpen(false)}>Hosting</Link>
        <Link to="/miners" onClick={() => setIsOpen(false)}>ASIC miners</Link>
        <Link to="/referral" onClick={() => setIsOpen(false)}>Referral</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>Company</Link>

        {/* Icons */}
        <div className="flex items-center space-x-8 pt-4 text-2xl">
          <FiSearch className="cursor-pointer" />
          <FiShoppingCart className="cursor-pointer" />
        </div>

        <Link
          to="/login"
          className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold"
        >
          Sign in
        </Link>
      </ul>

    </nav>
  );
};

export default Header;
