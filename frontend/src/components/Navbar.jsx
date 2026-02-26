import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiX, FiChevronRight, FiSearch, FiUser, FiShoppingBag, FiHeart, FiArrowLeft } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { megaMenuData } from "../assets/frontend_assets/assets";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const { setShowSearch, cartCount } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileView, setMobileView] = useState(null);
  const navigate = useNavigate();
  const menuTimeout = useRef(null);

  const navCategories = ["Women", "Men", "Shoes", "Watches", "Fragrances"];

  const handleMenuEnter = (cat) => {
    clearTimeout(menuTimeout.current);
    setActiveMenu(cat);
  };

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 200);
  };

  useEffect(() => {
    return () => clearTimeout(menuTimeout.current);
  }, []);

  const closeMobile = () => {
    setVisible(false);
    setTimeout(() => setMobileView(null), 300);
  };

  const getSubcategories = (cat) => {
    const data = megaMenuData[cat];
    if (!data) return [];
    if (data.subcategories) return data.subcategories;
    if (data.groups) return Object.values(data.groups).flat();
    return [];
  };


  const renderMegaContent = (cat) => {
    const data = megaMenuData[cat];
    if (!data) return null;


    if (data.subcategories) {
      return (
        <div className="flex flex-col gap-1">
          {data.subcategories.map((sub) => (
            <Link
              key={sub}
              to={`/shop/${cat.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setActiveMenu(null)}
              className="text-[13px] py-1 text-gray-500 hover:text-black transition w-fit"
            >
              {sub}
            </Link>
          ))}
        </div>
      );
    }


    if (data.groups) {
      return (
        <div className="flex gap-20">
          {Object.entries(data.groups).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-[13px] font-semibold mb-2 text-black">{group}</h4>
              <div className="flex flex-col gap-1">
                {items.map((sub) => (
                  <Link
                    key={sub}
                    to={`/shop/${cat.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setActiveMenu(null)}
                    className="text-[13px] py-1 text-gray-500 hover:text-black transition w-fit"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-gray-200/80">
        <div className="page-wrapper flex items-center justify-between h-[56px]">
          <div className="flex items-center gap-3 w-[120px]">
            <button
              className="lg:hidden p-1"
              onClick={() => setVisible(true)}
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setShowSearch(true)}
              className="hidden lg:block p-1 text-gray-600 hover:text-black transition cursor-pointer"
              aria-label="Search"
            >
              <FiSearch className="w-[18px] h-[18px]" />
            </button>
          </div>
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl font-medium tracking-[0.35em]"
            style={{ color: "#111" }}
          >
            LABAS
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSearch(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-black transition cursor-pointer"
              aria-label="Search"
            >
              <FiSearch className="w-[18px] h-[18px]" />
            </button>
            <button onClick={() => navigate("/wishlist")} className="p-2 text-gray-600 hover:text-black transition hidden sm:block" aria-label="Wishlist">
              <FiHeart className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={() => user ? navigate("/profile") : navigate("/signin")}
              className="p-2 text-gray-600 hover:text-black transition"
              aria-label="Profile"
            >
              <FiUser className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={() => setShowCartDrawer(true)}
              className="relative p-2 text-gray-600 hover:text-black transition"
              aria-label="Cart"
            >
              <FiShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -bottom-0.5 size-4 text-[9px] rounded-full grid place-items-center font-semibold bg-black text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="hidden lg:block border-t border-gray-100">
          <div className="flex items-center justify-center gap-10 h-[44px]">
            {navCategories.map((cat) => (
              <div
                key={cat}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMenuEnter(cat)}
                onMouseLeave={handleMenuLeave}
              >
                <NavLink
                  to={`/shop/${cat.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-[12px] tracking-[0.2em] uppercase transition-colors duration-200 ${isActive || activeMenu === cat
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                    }`
                  }
                  style={activeMenu === cat ? { borderBottom: "1px solid #000", paddingBottom: "2px" } : {}}
                >
                  {cat}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              className="absolute left-0 right-0 z-40 bg-white"
              style={{ borderBottom: "1px solid #eee" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => handleMenuEnter(activeMenu)}
              onMouseLeave={handleMenuLeave}
            >
              <div className="page-wrapper py-5">
                {renderMegaContent(activeMenu)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {showCartDrawer && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setShowCartDrawer(false)} />
            <CartDrawer onClose={() => setShowCartDrawer(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.div
              className="fixed top-0 left-0 h-screen z-50 w-[80%] max-w-sm bg-white shadow-2xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-center justify-between px-6 h-[56px] border-b border-gray-200">
                <h2 className="text-[13px] font-semibold tracking-[0.2em] uppercase">Menu</h2>
                <button onClick={closeMobile} className="p-1 text-gray-600 hover:text-black" aria-label="Close menu">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto h-[calc(100vh-56px)]">
                <AnimatePresence mode="wait">
                  {mobileView === null ? (
                    <motion.div
                      key="main"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {navCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setMobileView(cat)}
                          className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-100 text-left cursor-pointer"
                        >
                          <span className="text-[13px] font-semibold tracking-[0.15em] uppercase text-black">
                            {cat}
                          </span>
                          <FiChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                      ))}
                      <button
                        onClick={() => { navigate("/wishlist"); closeMobile(); }}
                        className="w-full flex items-center gap-3 px-6 py-4 border-b border-gray-100 text-left cursor-pointer"
                      >
                        <FiHeart className="w-4 h-4 text-gray-600" />
                        <span className="text-[13px] font-medium tracking-[0.1em] uppercase text-gray-700">Wishlist</span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={mobileView}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => setMobileView(null)}
                        className="w-full flex items-center gap-2 px-6 py-3 border-b border-gray-100 text-left cursor-pointer"
                      >
                        <FiArrowLeft className="w-4 h-4 text-gray-500" />
                        <span className="text-[11px] tracking-[0.15em] uppercase text-gray-500">Back</span>
                      </button>

                      <div className="px-6 pt-5 pb-3">
                        <h3 className="text-[15px] font-bold tracking-[0.1em] uppercase text-black">
                          {mobileView}
                        </h3>
                      </div>

                      {getSubcategories(mobileView).map((sub) => (
                        <Link
                          key={sub}
                          to={`/shop/${mobileView.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={closeMobile}
                          className="block px-6 py-3 text-sm text-gray-500 hover:text-black transition"
                        >
                          {sub}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <SearchOverlay />
    </>
  );
}
