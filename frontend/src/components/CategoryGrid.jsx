import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/frontend_assets/assets";

const categories = [
    { name: "Women", path: "/shop/women", image: assets.category_women },
    { name: "Men", path: "/shop/men", image: assets.category_men },
    { name: "Shoes", path: "/shop/shoes", image: assets.category_shoes },
    { name: "Watches", path: "/shop/watches", image: assets.category_watches },
    { name: "Fragrances", path: "/shop/fragrances", image: assets.category_fragrances },
];

export default function CategoryGrid() {
    return (
        <section className="page-wrapper py-16">
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-3">
                    Shop by Category
                </h2>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Explore our curated collections designed for every style and occasion
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((cat, i) => (
                    <Link to={cat.path} key={cat.name}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />

                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                                <h3 className="text-lg sm:text-xl font-semibold tracking-wider text-white">
                                    {cat.name}
                                </h3>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
