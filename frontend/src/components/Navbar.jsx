import React, { useState, useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiX, FiChevronLeft, FiMenu } from "react-icons/fi";
import { shopcontext } from "../context/shopcontext";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "../components/CartDrawer";

function Navbar() {
  const { setShowSearch, cartCount } = useContext(shopcontext);
  const [visible, setVisible] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between py-4 px-3 font-medium relative">
        <div className="flex items-center gap-1">
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setVisible(true)}
          >
            <FiMenu className="text-2xl text-gray-700" />
          </button>

          <Link to="/">
            <img src={assets.logo} alt="site_logo" className="w-32" />
          </Link>
        </div>

        <ul className="hidden sm:flex gap-5 text-gray-700">
          <NavLink to="/" className="flex flex-col text-sm items-center">
            <p>Home</p>
          </NavLink>

          <NavLink to="/shop" className="flex flex-col text-sm items-center">
            <p>Shop</p>
          </NavLink>

          <NavLink to="/contact" className="flex flex-col text-sm items-center">
            <p>Contact</p>
          </NavLink>

          <NavLink to="/about" className="flex flex-col text-sm items-center">
            <p>About</p>
          </NavLink>
        </ul>

        <div className="flex gap-4 items-center">
          <img
            src={assets.search_icon}
            alt="search_icon"
            onClick={() => {
              navigate("/shop");
              setShowSearch(true);
            }}
            className="w-4 h-4 cursor-pointer sm:hidden"
          />

          <div
            onClick={() => {
              navigate("/shop");
              setShowSearch(true);
            }}
            className="hidden sm:flex items-center border-b border-gray-400 cursor-pointer px-3"
          >
            <span className="text-sm text-gray-600">SEARCH</span>
          </div>

          <img
            src={assets.profile_icon}
            onClick={() => navigate("/profile")}
            className="w-4 cursor-pointer"
            alt="profile_icon"
          />

          <div className="relative">
            <button onClick={() => setShowCartDrawer(true)}>
              <img
                src={assets.cart_icon}
                alt="cart_icon"
                className="w-4 cursor-pointer"
              />
              {cartCount > 0 && (
                <p className="absolute -right-1 -bottom-px size-3 text-[8px] text-white bg-black rounded-full grid place-items-center">
                  {cartCount}
                </p>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCartDrawer && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setShowCartDrawer(false)}
            />

            <CartDrawer
              onClose={() => setShowCartDrawer(false)}
              as={motion.div}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`fixed inset-0 bg-black/10 z-40 transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      />

      <div
        className={`fixed top-0 right-0 h-screen z-50 bg-white shadow-2xl
    w-[86%] sm:max-w-sm
    transform transition-transform duration-500 ease-in-out will-change-transform
    ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <button
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 text-gray-700"
          >
            <FiChevronLeft className="text-xl" />
            <span>Back</span>
          </button>

          <button
            onClick={() => setVisible(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FiX className="text-xl text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col px-2 py-4 gap-2">
          <NavLink
            to="/"
            onClick={() => setVisible(false)}
            className="px-3 py-3 rounded-lg hover:bg-gray-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            onClick={() => setVisible(false)}
            className="px-3 py-3 rounded-lg hover:bg-gray-100"
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setVisible(false)}
            className="px-3 py-3 rounded-lg hover:bg-gray-100"
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setVisible(false)}
            className="px-3 py-3 rounded-lg hover:bg-gray-100"
          >
            About
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
