import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row">
        {/* left content section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex items-center px-6 sm:px-10 lg:px-14 py-14"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
              New Collection
            </p>

            <h1 className="prata-regular text-4xl md:text-5xl leading-tight mb-6">
              Latest Arrivals
            </h1>

            <p className="text-sm md:text-base text-gray-500 mb-8 max-w-md">
              Hand-picked styles made with premium materials. Discover pieces
              designed to elevate your everyday fashion.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-md bg-gray-900 text-white text-sm md:text-base font-medium hover:bg-gray-800 transition hover:cursor-pointer"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>

        {/* right image section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2"
        >
          <img
            src={assets.hero_img}
            alt="Main product"
            className="w-full h-[280px] sm:h-[320px] md:h-[360px] object-cover rounded-xl px-2"
          />
          <div className="grid grid-cols-2 gap-1 p-2">
            <img
              src={assets.hero_img}
              alt="Product 2"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src={assets.hero_img}
              alt="Product 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}