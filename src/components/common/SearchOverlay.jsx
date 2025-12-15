import React, { useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <form
        onSubmit={handleSearch}
        className="bg-[#0b0f0e] w-[90%] max-w-xl p-6 rounded-xl shadow-xl"
      >
        <div className="flex items-center gap-4 border border-white/20 rounded-lg px-4 py-3">
          <FiSearch className="text-white text-xl" />
          <input
            autoFocus
            type="text"
            placeholder="Search mining machines..."
            className="flex-1 bg-transparent text-white outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FiX
            className="text-white text-xl cursor-pointer"
            onClick={onClose}
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-full bg-green-500 text-black py-2 rounded-lg font-semibold hover:bg-green-400"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchOverlay;
