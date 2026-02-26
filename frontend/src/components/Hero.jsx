import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-[85vh] sm:h-[92vh] flex items-end overflow-hidden">
<div className="absolute inset-0">
        <img
          src={assets.hero_1}
          alt="LABAS Fashion"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
      </div>
<div className="relative z-10 w-full flex flex-col items-center text-center pb-14 md:pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-[10px] md:text-[11px] tracking-[0.35em] uppercase mb-4 font-light text-white/70">
            Spring / Summer 2026
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl leading-[1.05] mb-3 text-white" style={{ fontFamily: "'Georgia', serif" }}>
            New Collection
          </h1>

          <p className="text-sm sm:text-base max-w-md mx-auto mb-8 font-light text-white/75">
            Timeless silhouettes reimagined for the modern wardrobe
          </p>

          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium bg-white text-black hover:bg-white/90 transition cursor-pointer"
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
