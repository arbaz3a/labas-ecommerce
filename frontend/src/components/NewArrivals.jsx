import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "./ProductCard";

function NewArrivals() {
  const { products } = useContext(ShopContext);
  const [latestproduct, setlatestproducts] = useState([]);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => b.date - a.date);
    setlatestproducts(sorted.slice(0, 8));
  }, [products]);

  return (
    <div className="page-wrapper py-16">
      <div className="text-center mb-10">
        <span className="text-[11px] tracking-[0.3em] uppercase font-light text-gray-400">
          Just Dropped
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-2 mb-3 text-black">
          New Arrivals
        </h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Discover our newest arrivals, crafted with premium quality and modern
          elegance for your everyday style.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {latestproduct.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            category={item.category}
            subCategory={item.subCategory}
          />
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
