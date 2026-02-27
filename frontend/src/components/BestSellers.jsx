import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "./ProductCard";

function BestSellers() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller === true);
    setBestSeller(bestProducts.slice(0, 8));
  }, [products]);

  return (
    <div className="page-wrapper py-16">
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
        <div className="text-center mb-10">
          <span className="text-[11px] tracking-[0.3em] uppercase font-light text-gray-400">
            Most Loved
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-2 mb-3 text-black">
            Best Sellers
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Our most loved products, chosen by customers for quality, comfort,
            and timeless style.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {bestSeller.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              productId={item.productId}
              name={item.name}
              price={item.price}
              image={item.image}
              category={item.category}
              subCategory={item.subCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
