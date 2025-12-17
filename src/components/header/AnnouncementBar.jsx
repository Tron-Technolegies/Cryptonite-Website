import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-black text-white h-10 flex items-center px-4 md:px-10">
      <div className="flex items-center space-x-4 text-sm flex-1">
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-white" />
          <span className="hidden md:inline">+49 941 20083376</span>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-white" />
          <span className="hidden md:inline">office@cryptonite.at</span>
        </div>
      </div>

      {/* RIGHT : SOCIALS + LANGUAGE */}
      <div className="flex items-center space-x-4 text-lg">
        {/* Social Icons */}
        <FaFacebookF className="cursor-pointer hover:text-green-500" />
        <FaInstagram className="cursor-pointer hover:text-green-500" />
        <FaYoutube className="cursor-pointer hover:text-green-500" />
        <FaTiktok className="cursor-pointer hover:text-green-500" />
        <FaLinkedin className="cursor-pointer hover:text-green-500" />

        {/* Language */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <FaGlobe />
          <select className="bg-black text-white text-sm outline-none cursor-pointer hidden sm:block">
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
