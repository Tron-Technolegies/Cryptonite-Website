import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiX, FiUser, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import cryptonite from "../../../public/logos/cryptonitelogoupdated.png";
import SearchOverlay from "../common/SearchOverlay";
import { setupAutoLogout } from "../../utils/auth";
import { blogPosts } from "../../utils/blogs";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileHowOpen, setMobileHowOpen] = useState(false);

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
          absolute top-0 left-0 w-full
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
            // { name: "Blogs", path: "/blogs" },
            { name: "Shop", path: "/shop" },
            { name: "Bundle Products", path: "/bundles" },
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
            <span className={`flex items-center gap-1 cursor-pointer ${hoverColor}`}>
              How it Works
              <FiChevronDown className="text-sm mt-[2px]" />
            </span>

            <div
              className="
      absolute left-0 mt-3 w-80
      bg-white text-black shadow-lg rounded-lg
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all z-50"
            >
              {blogPosts.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.id}`}
                  className="block px-4 py-2 text-sm leading-snug hover:bg-green-500/10 hover:text-green-400"
                >
                  {blog.title}
                </Link>
              ))}

              <div className="border-t border-gray-200 my-1" />

              <Link
                to="/#faq"
                className="block px-4 py-2 text-sm hover:bg-green-500/10 hover:text-green-400"
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

        <nav className="flex flex-col px-6 py-8 space-y-5 text-lg text-white">
          {[
            { name: "About", path: "/about" },
            { name: "Hosting", path: "/hosting" },
            { name: "Calculator", path: "/calculator" },
            // { name: "Blogs", path: "/blogs" },
            { name: "Shop", path: "/shop" },
            { name: "Bundle Products", path: "/bundles" },
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

          {/* HOW IT WORKS - MOBILE DROPDOWN */}
          <div className="pt-4">
            {/* TOGGLE */}
            <button
              onClick={() => setMobileHowOpen((prev) => !prev)}
              className="w-full flex items-center justify-between text-lg text-white mb-2"
            >
              <span>How it Works</span>
              {mobileHowOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {/* DROPDOWN CONTENT */}
            {mobileHowOpen && (
              <div className="pl-2 space-y-2">
                {blogPosts.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blogs/${blog.id}`}
                    onClick={() => {
                      setMobileHowOpen(false);
                      setIsOpen(false);
                    }}
                    className="block text-sm border-t border-white/10 pt-2 text-white"
                  >
                    {blog.title}
                  </Link>
                ))}

                <Link
                  to="/#faq"
                  onClick={() => {
                    setMobileHowOpen(false);
                    setIsOpen(false);
                  }}
                  className="block text-md border-t border-white/10 pt-2 text-white hover:text-green-400"
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE AUTH */}
          {!isLoggedIn && (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center px-4 py-2 rounded-full border border-white hover:bg-green-500 hover:text-black"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
