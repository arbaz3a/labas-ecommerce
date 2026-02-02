import React, { useContext } from "react";
import { shopcontext } from "../context/shopcontext";
import { FiX } from "react-icons/fi";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(shopcontext);

  return (
    <div className="relative w-full max-w-md">
      <div
        className={`flex items-center gap-3 transition-all duration-300 ease-in-out
        ${showSearch ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="WHAT ARE YOU LOOKING FOR?"
          className="w-full text-sm uppercase tracking-wide outline-none py-2 bg-transparent"
        />

        <button
          onClick={() => (setShowSearch(false), setSearch(''))}
          className="shrink-0 text-gray-500 hover:text-black transition cursor-pointer"
        >
          <FiX className="text-xl" />
        </button>

        {/* underline */}
        <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300" />
      </div>
    </div>
  );
}

export default SearchBar;
