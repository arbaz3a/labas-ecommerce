import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUtils";

export default function TrendingSection() {
  const { products } = useContext(ShopContext);
  const featured = products.filter((p) => p.bestseller).slice(0, 3);

  if (featured.length < 2) return null;

  return (
    <section className="page-wrapper py-16">
      <div className="text-center mb-10">
        <span className="text-[11px] tracking-[0.3em] uppercase font-light text-gray-400">
          Curated For You
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-2 text-black">
          The Edit
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link to={`/product/${featured[0].productId || featured[0]._id}`}>
            <div className="relative group aspect-[3/4] rounded-xl overflow-hidden cursor-pointer">
              <img
                src={getImageUrl(featured[0].image[0])}
                alt={featured[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm font-light text-white">
                  {featured[0].name}
                </p>
                <p className="text-xs mt-1 text-white/70">Shop Now →</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-rows-2 gap-4">
          {featured.slice(1, 3).map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to={`/product/${product.productId || product._id}`}>
                <div className="relative group aspect-[16/9] md:aspect-auto md:h-full rounded-xl overflow-hidden cursor-pointer">
                  <img
                    src={getImageUrl(product.image[0])}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-sm font-light text-white">
                      {product.name}
                    </p>
                    <p className="text-xs mt-1 text-white/70">Shop Now →</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
