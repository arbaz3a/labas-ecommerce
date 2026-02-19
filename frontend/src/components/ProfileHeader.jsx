import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

function ProfileHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isOrders = location.pathname === "/orders";
  const isProfile = location.pathname === "/profile";

  return (
    <div className="bg-white flex py-7 items-center justify-between relative">
      {/* brand, orders and profile */}
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

      <div className="relative">
        <img
          src={assets.profile_icon}
          alt="profile"
          className="w-5 cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-4 w-64 bg-white border rounded-xl shadow-lg p-4 text-sm z-50">
            <div className="mb-3 text-gray-600">unknownbyte1@gmail.com</div>

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
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
