import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiX, FiUser } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import cryptonite from "../../../public/logos/cryptonitelogoupdated.png";
import SearchOverlay from "../common/SearchOverlay";
import { setupAutoLogout } from "../../utils/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === "/";
  const textColor = isHome ? "text-white" : "text-black";
  const hoverColor = "hover:text-green-400";
  const borderColor = isHome ? "border-white" : "border-black";
  const activeClass = "text-green-400";
  const isActive = (path) => location.pathname === path;

  /* ================= AUTH ================= */
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access");
      setIsLoggedIn(!!token);
      if (token) setupAutoLogout();
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  /* ================= CART ================= */
  useEffect(() => {
    const getCartCount = () => {
      setCartCount(Number(localStorage.getItem("cartCount")) || 0);
    };

    getCartCount();
    window.addEventListener("storage", getCartCount);
    return () => window.removeEventListener("storage", getCartCount);
  }, []);

  return (
    <>
      {/* HEADER */}
      <nav
        className={`
          absolute top-10 left-0 w-full
          px-4 md:px-10 h-20
          flex items-center justify-between
          bg-transparent z-50
          ${textColor}
        `}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src={cryptonite} alt="Logo" className="h-10 object-contain" />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center space-x-10 text-[16px] font-medium">
          {[
            { name: "About", path: "/about" },
            { name: "Hosting", path: "/hosting" },
            { name: "Calculator", path: "/calculator" },
            { name: "Shop", path: "/shop" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${hoverColor} ${isActive(item.path) ? activeClass : ""}`}
            >
              {item.name}
            </Link>
          ))}

          {/* HOW IT WORKS */}
          <div className="relative group">
            <span
              className={`${hoverColor} cursor-pointer ${
                location.pathname === "/blogs" ? activeClass : ""
              }`}
            >
              How it Works
            </span>

            <div
              className="
              absolute left-0 mt-3 w-44
              bg-white text-black border border-white/10 rounded-lg
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all z-50
            "
            >
              <Link
                to="/blogs"
                className="block px-4 py-2 hover:bg-green-500/10 hover:text-green-400"
              >
                Blogs
              </Link>
              <Link
                to="/#faq"
                className="block px-4 py-2 hover:bg-green-500/10 hover:text-green-400"
              >
                FAQ
              </Link>
            </div>
          </div>
        </ul>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center space-x-6 text-xl">
          <FiSearch
            className={`cursor-pointer ${hoverColor}`}
            onClick={() => setSearchOpen(true)}
          />

          <Link to="/cart" className="relative">
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <Link to="/dashboard" className="text-2xl">
              <FiUser />
            </Link>
          ) : (
            <Link
              to="/login"
              className={`px-5 py-2 rounded-full text-sm font-semibold border ${borderColor}
                hover:bg-green-500 hover:border-green-500 hover:text-black transition`}
            >
              Sign in
            </Link>
          )}
        </div>

        {/* MOBILE ICONS */}
        <div className="md:hidden flex items-center gap-4 text-2xl">
          <FiSearch onClick={() => setSearchOpen(true)} />
          <GiHamburgerMenu onClick={() => setIsOpen(true)} />
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0b0f0e]
          transform transition-transform z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
          <img src={cryptonite} alt="Logo" className="h-8" />
          <FiX className="text-2xl text-white" onClick={() => setIsOpen(false)} />
        </div>

        <nav className="flex flex-col px-6 py-8 space-y-6 text-lg text-white">
          {[
            { name: "About", path: "/about" },
            { name: "Hosting", path: "/hosting" },
            { name: "Calculator", path: "/calculator" },
            { name: "Shop", path: "/shop" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`border-b border-white/10 pb-2 ${
                isActive(item.path) ? activeClass : "hover:text-green-400"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4">
            <p className="text-sm text-gray-400 mb-2">How it Works</p>
            <Link
              to="/blogs"
              onClick={() => setIsOpen(false)}
              className="block pb-2 hover:text-green-400"
            >
              Blogs
            </Link>
            <Link
              to="/#faq"
              onClick={() => setIsOpen(false)}
              className="block pb-2 hover:text-green-400"
            >
              FAQ
            </Link>
          </div>
        </nav>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
