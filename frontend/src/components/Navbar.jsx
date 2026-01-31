import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { FiX, FiChevronLeft } from "react-icons/fi";

function Navbar() {
  const [visible, setvisible] = useState(false);
  return (
    <div className="flex items-center justify-between py-4 px-3 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="site_logo" className="w-32" />
      </Link>
      <ul className="hidden sm:flex gap-3 text-gray-700">
        <NavLink to="/" className="flex flex-col text-sm gap-1 items-center">
          <p>Home</p>
          <hr className="w-1/2 bg-gray-700 hidden border-none h-[1.3px]" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col text-sm gap-1 items-center"
        >
          <p>Collection</p>
          <hr className="w-1/2 bg-gray-700 hidden border-none h-[1.3px]" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col text-sm gap-1 items-center"
        >
          <p>Contact</p>
          <hr className="w-1/2 bg-gray-700 hidden border-none h-[1.3px]" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col text-sm gap-1 items-center"
        >
          <p>About</p>
          <hr className="w-1/2 bg-gray-700 hidden border-none h-[1.3px]" />
        </NavLink>
      </ul>
      <div className="flex gap-4 items-center">
        <img
          src={assets.search_icon}
          alt="search_icon"
          className="w-4 cursor-pointer"
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-4 cursor-pointer"
            alt="profile_icon"
          />
          <div className="group-hover:block hidden dropdown-menu absolute right-0 pt-3">
            <div className="flex flex-col w-36 py-3 px-2.5 gap-1.5 rounded bg-slate-50 text-gray-600">
              <p className="hover:text-black cursor-pointer">My Profile</p>
              <p className="hover:text-black cursor-pointer">Orders</p>
              <p className="hover:text-black cursor-pointer">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-4" />
          <p className="absolute -right-1 -bottom-1 size-3.5 text-[8px] text-white bg-black rounded-full grid place-items-center">
            12
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          onClick={() => setvisible(true)}
          alt="hmaburger_icon"
          className="cursor-pointer w-4 sm:hidden"
        />
      </div>

      {/* drawer hamburger */}
      <div
        className={`fixed top-0 right-0 h-screen z-50 bg-white shadow-2xl
        transition-transform duration-300 ease-in-out
        w-full sm:max-w-sm
        ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <button
            onClick={() => setvisible(false)}
            className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <FiChevronLeft className="text-xl" />
            <span className="font-medium">Back</span>
          </button>

          <button
            onClick={() => setvisible(false)}
            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <FiX className="text-xl text-gray-700" />
          </button>
        </div>
        {/* menu bar */}
        <div className="flex flex-col px-2 py-4 gap-2">
          <NavLink
            to="/"
            onClick={() => setvisible(false)}
            className="px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-black transition"
          >
            Home
          </NavLink>

          <NavLink
            to="/collection"
            onClick={() => setvisible(false)}
            className="px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-black transition"
          >
            Collection
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setvisible(false)}
            className="px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-black transition"
          >
            Contact
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setvisible(false)}
            className="px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-black transition"
          >
            About
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
