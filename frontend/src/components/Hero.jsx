import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 gap-y-2 pt-2 lg:grid-cols-2 min-h-[520px]">

        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center px-8 sm:px-12 lg:px-16"
        >
          <span className="text-xs tracking-[0.25em] text-gray-400 mb-4">
            NEW SEASON
          </span>

          <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900 mb-6">
            Modern <br /> Essentials
          </h1>

          <p className="text-gray-500 max-w-md mb-10 text-sm sm:text-base">
            Discover refined silhouettes crafted from premium materials and
            designed for timeless everyday wear.
          </p>

          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ x: 6 }}
              className="text-sm cursor-pointer uppercase tracking-widest font-medium border-b border-gray-900 pb-1"
            >
              Shop Collection
            </motion.button>

            <span className="text-xs text-gray-400 uppercase tracking-widest">
              2026
            </span>
          </div>
        </motion.div>

        {/* RIGHT — IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src={assets.hero_img}
            alt="Hero Fashion"
            className="w-full h-full object-cover"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

      </div>
    </section>
  );
}
