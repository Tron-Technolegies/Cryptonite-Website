import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-(--primary-color) text-3xl font-extrabold">
            CRYPTONITE
          </h2>
          {/* <p className="text-gray-400 mt-2">
            © 2024–{new Date().getFullYear()} NEXMINE.DE
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
          <div>
            <h3 className="font-semibold mb-2 border-b border-(--primary-color) inline-block pb-1">
              Contact
            </h3>
            <p className="text-gray-300 text-sm mt-2">office@intermine.de</p>
            <p className="text-gray-300 text-sm mt-1">+49 941 20083376</p>
            <p className="text-gray-300 text-sm mt-1">Regensburg, Germany</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 border-b border-(--primary-color) inline-block pb-1">
              Menu
            </h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="hover:text-(--primary-color) cursor-pointer">
                Hosting
              </li>
              <li className="hover:text-(--primary-color) cursor-pointer">
                Shop
              </li>
              <li className="hover:text-(--primary-color) cursor-pointer">
                Company
              </li>
              <li className="hover:text-(--primary-color) cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 border-b border-(--primary-color) inline-block pb-1">
              Legal
            </h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="hover:text-(--primary-color) cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-(--primary-color) cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-(--primary-color) cursor-pointer">
                Imprint
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
          Powered by Tron Digital
        </div>
      </div>
    </footer>
  );
};

export default Footer;
