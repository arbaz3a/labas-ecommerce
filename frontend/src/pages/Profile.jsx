import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut, FiPackage } from "react-icons/fi";
import { toast } from "react-toastify";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.dismiss();
    toast("Profile saved successfully", { type: "success", toastId: "profile-saved" });
  };

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="page-wrapper py-10 max-w-2xl">
<div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-black">
          My Profile
        </h1>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition cursor-pointer"
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
<p className="text-sm text-gray-500 mb-5">{user?.email || "user@example.com"}</p>
<button
        onClick={() => navigate("/orders")}
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-[11px] tracking-[0.15em] uppercase font-medium text-black hover:bg-gray-50 transition cursor-pointer mb-8"
      >
        <FiPackage className="w-4 h-4" />
        My Orders
      </button>
<form onSubmit={handleSave} className="flex flex-col gap-5">
        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2 text-black">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full px-4 py-3 bg-[#F5F4F0] text-sm text-black border-none outline-none placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2 text-black">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. +92 300 1234567"
            className="w-full px-4 py-3 bg-[#F5F4F0] text-sm text-black border-none outline-none placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2 text-black">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Street address"
            className="w-full px-4 py-3 bg-[#F5F4F0] text-sm text-black border-none outline-none placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2 text-black">
            City
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Lahore"
            className="w-full px-4 py-3 bg-[#F5F4F0] text-sm text-black border-none outline-none placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2 text-black">
            State
          </label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="e.g. Punjab"
            className="w-full px-4 py-3 bg-[#F5F4F0] text-sm text-black border-none outline-none placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2 text-black">
            Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            placeholder="e.g. 54000"
            className="w-full px-4 py-3 bg-[#F5F4F0] text-sm text-black border-none outline-none placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-black text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:opacity-90 transition cursor-pointer mt-2"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
