import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiTwitter,
} from "react-icons/fi";
import cryptoniteLogo from "../../../public/logos/cryptonitelogoupdated.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* LOGO + DESCRIPTION */}
          <div>
            <img src={cryptoniteLogo} alt="Cryptonite Logo" className="h-12 w-auto mb-4" />
            <p className="text-white leading-relaxed text-sm max-w-xs">
              Professional cryptocurrency mining solutions with premium hosting and support.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center space-x-4 mt-6 text-xl">
              <FiTwitter className="cursor-pointer hover:text-(--primary-color)" />
              <FiFacebook className="cursor-pointer hover:text-(--primary-color)" />
              <FiInstagram className="cursor-pointer hover:text-(--primary-color)" />
              <FiYoutube className="cursor-pointer hover:text-(--primary-color)" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">QUICK LINKS</h3>

            <ul className="space-y-2 text-white text-sm">
              <li className="hover:text-(--primary-color) cursor-pointer">Home</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Equipment</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Hosting</li>
              <li className="hover:text-(--primary-color) cursor-pointer">About Us</li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">SERVICES</h3>

            <ul className="space-y-2 text-white text-sm">
              <li className="hover:text-(--primary-color) cursor-pointer">ASIC Mining</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Hosting Solutions</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Mining</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Consultation</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Maintenance</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">CONTACT</h3>

            <ul className="space-y-3 text-white text-sm">
              <li className="flex items-center gap-2">
                <FiPhone className="text-(--primary-color)" /> +49 94120083376
              </li>

              <li className="flex items-center gap-2">
                <FiMail className="text-(--primary-color)" /> office@cryptonite.at
              </li>

              <li className="flex items-center gap-2">
                <FiMapPin className="text-(--primary-color)" /> Austria
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 border-t border-gray-700 pt-5 flex flex-col md:flex-row justify-between text-white text-sm">
          {/* LEFT COPYRIGHT */}
          <p>© 2025 Cryptonite Mining. All rights reserved.</p>

          {/* RIGHT LINKS */}
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="hover:text-(--primary-color) cursor-pointer">Privacy Policy</span>
            <span className="hover:text-(--primary-color) cursor-pointer">Terms of Service</span>
            <span className="hover:text-(--primary-color) cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
