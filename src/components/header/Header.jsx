import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import cryptonite from "../../../public/logos/cryptonitelogoupdated.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="
        absolute top-0 left-0
        w-full
        bg-transparent
        text-white
        px-4 md:px-10
        h-20
        flex items-center justify-between
        z-30
      "
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
        <Link to="/about" className="hover:text-green-400">About</Link>
        <Link to="/hosting" className="hover:text-green-400">Hosting</Link>
        <Link to="/shop" className="hover:text-green-400">Shop</Link>
        <Link to="/blogs" className="hover:text-green-400">Blog</Link>
        <Link to="/contact" className="hover:text-green-400">Contact</Link>
      </ul>

      {/* DESKTOP ICONS */}
      <div className="hidden md:flex items-center space-x-6 text-xl">
        <FiSearch className="cursor-pointer hover:text-green-400" />

        <div className="relative cursor-pointer">
          <FiShoppingCart className="hover:text-green-400" />
          <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
            0
          </span>
        </div>

        <Link
          to="/login"
          className="px-5 py-2 border border-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
        >
          Sign in
        </Link>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center gap-4">
        <Link to="/login" className="px-3 py-1 border border-white rounded-full text-xs">
          Sign in
        </Link>
        <GiHamburgerMenu
          className="text-3xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* MOBILE MENU */}
      <ul
        className={`
          absolute top-20 left-0 w-full
          bg-black/90 backdrop-blur-lg
          flex flex-col items-center gap-6 py-6
          transition-all duration-300
          md:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <Link to="/about">About</Link>
        <Link to="/hosting">Hosting</Link>
        <Link to="/blogs">Blog</Link>
        <Link to="/contact">Contact</Link>
      </ul>
    </nav>
  );
};

export default Header;
