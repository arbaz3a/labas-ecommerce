import React, { useContext, useState, useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { FiX, FiSearch, FiArrowRight } from "react-icons/fi";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const TRENDING_TAGS = ["Jackets", "Watches", "Cotton Shirts", "Sneakers"];
const MAX_RESULTS = 3;

function SearchOverlay() {
  const { products, search, setSearch, showSearch, setShowSearch, currency } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [showSearch]);

  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSearch]);

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    const query = search.toLowerCase();
    const filtered = (products || []).filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.subCategory.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
    );

    setTotalResults(filtered.length);
    setSearchResults(filtered.slice(0, MAX_RESULTS));
  }, [search, products]);

  const handleClose = () => {
    setShowSearch(false);
    setSearch("");
  };

  const handleTagClick = (tag) => {
    setSearch(tag);
  };

  const handleViewAll = () => {
    handleClose();
    navigate(`/shop?search=${encodeURIComponent(search)}`);
  };

  const handleProductClick = (id) => {
    handleClose();
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && showSearch) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showSearch]);

  return (
    <AnimatePresence>
      {showSearch && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-white/98 backdrop-blur-sm"
            onClick={handleClose}
          />
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-10 z-50 p-2 text-gray-400 hover:text-black transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <FiX className="w-6 h-6" />
          </button>
          <motion.div
            className="relative z-10 flex flex-col items-center pt-[15vh] px-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-5 font-medium self-start max-w-[600px] w-full mx-auto">
              SEARCH
            </p>
            <div className="relative w-full max-w-[600px]">
              <div className="flex items-center gap-3">
                <FiSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full text-xl sm:text-2xl font-light outline-none py-2 bg-transparent text-black placeholder:text-gray-300"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-black transition cursor-pointer"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="h-px w-full bg-gray-900 mt-1" />
            </div>
            <div className="w-full max-w-[600px] mt-8">
              {search.trim() ? (

                <div>
                  {searchResults.length > 0 ? (
                    <>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 font-medium mb-5">
                        {totalResults} {totalResults === 1 ? "RESULT" : "RESULTS"}
                      </p>

                      <div className="flex flex-col gap-1">
                        {searchResults.map((product) => (
                          <button
                            key={product._id}
                            onClick={() => handleProductClick(product._id)}
                            className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-left w-full group"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={product.image[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium">
                                {product.category}
                              </span>
                              <span className="text-sm font-medium text-black truncate group-hover:underline">
                                {product.name}
                              </span>
                              <span className="text-sm text-gray-500 mt-0.5">
                                {currency}
                                {product.price.toLocaleString("en-PK")}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {totalResults > MAX_RESULTS && (
                        <button
                          onClick={handleViewAll}
                          className="flex items-center gap-2 mt-6 text-[11px] tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 transition-opacity cursor-pointer"
                        >
                          VIEW ALL RESULTS
                          <FiArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-400">
                      No products found for "{search}"
                    </p>
                  )}
                </div>
              ) : (

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <HiOutlineTrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400 font-medium">
                      TRENDING
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="px-4 py-2 border border-gray-200 text-sm text-gray-700 hover:border-black hover:text-black transition-all rounded-full cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchOverlay;
