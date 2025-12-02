import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-white text-black h-10 flex items-center justify-end px-4 md:px-10 border-b border-gray-200">

      <div className="flex items-center space-x-4 text-lg">

        {/* Social Icons */}
        <FaFacebookF className="cursor-pointer hover:text-(--primary-color)" />
        <FaInstagram className="cursor-pointer hover:text-(--primary-color)" />
        <FaYoutube className="cursor-pointer hover:text-(--primary-color)" />
        <FaTiktok className="cursor-pointer hover:text-(--primary-color)" />
        <FaLinkedin className="cursor-pointer hover:text-(--primary-color)" />

        {/* Language Dropdown */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <FaGlobe />
          <select className="bg-transparent text-sm outline-none cursor-pointer">
            <option>English</option>
            <option>Deutsch</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>

    </div>
  );
};

export default AnnouncementBar;
