import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ProfileContext } from "../context/ProfileContext";

function ProfileHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useContext(ProfileContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const isOrders = location.pathname === "/orders";
  const isProfile = location.pathname === "/profile";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white flex py-7 px-2 items-center justify-between relative">
      <div className="flex items-center gap-5">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl tracking-widest cursor-pointer font-semibold"
        >
          Zevylabas
        </h1>

        <div className="flex gap-5 text-xs font-medium">
          <button
            onClick={() => navigate("/orders")}
            className={`transition-all ${
              isOrders
                ? "border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={`transition-all ${
              isProfile
                ? "border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {/* dropdown sction on profile click */}
      <div className="relative" ref={dropdownRef}>
        <img
          src={assets.profile_icon}
          alt="profile"
          className="w-5 cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        <div
          className={`absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-xl p-4 text-sm z-50
          transform transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="mb-3 text-gray-600 break-all">{profile.email}</div>

          <div
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="py-2 cursor-pointer hover:underline"
          >
            Profile
          </div>

          <div
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
            className="py-2 cursor-pointer hover:underline"
          >
            Settings
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
