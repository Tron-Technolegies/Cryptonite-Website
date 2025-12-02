import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import cryptonite from "../../../public/logos/cryptonitelogo.png";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   
    <nav className="bg-[#f5f5f5] text-black px-4 md:px-10 h-16 flex items-center justify-between fixed top-0 left-0 w-full shadow-sm z-[9999]">

      {/* LOGO */}
      <div className="flex items-center h-full">
        <Link to="/">
          <img
            src={cryptonite}
            alt="Cryptonite Logo"
            className="h-max w-auto md:h-12 object-contain cursor-pointer"
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

      {/* Mobile Toggle Button */}
      <div
        className="md:hidden text-3xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu />
      </div>

      {/* Mobile Menu */}
      <ul
        className={`absolute left-0 w-full bg-white flex flex-col items-center space-y-6 py-6 md:hidden shadow-md transition-all duration-300 ${
          isOpen ? "top-24 opacity-100" : "top-10 opacity-0 pointer-events-none"
        }`}
      >
        <Link to="/miners" onClick={() => setIsOpen(false)}>ASIC miners</Link>
        <Link to="/hosting" onClick={() => setIsOpen(false)}>Hosting</Link>
        <Link to="/referral" onClick={() => setIsOpen(false)}>Referral</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>Company</Link>

        {/* Icons (mobile) */}
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
