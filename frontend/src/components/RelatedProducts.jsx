import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { getImageUrl } from "../utils/imageUtils";

function RelatedProducts({ currentProduct }) {
  const { products, currency } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!currentProduct) return;

    let filtered = products.filter(
      (p) =>
        p.subCategory === currentProduct.subCategory &&
        p._id !== currentProduct._id,
    );

    if (filtered.length < 6) {
      filtered = products.filter(
        (p) =>
          p.category === currentProduct.category &&
          p._id !== currentProduct._id,
      );
    }

    setRelated(filtered.slice(0, 6));
  }, [currentProduct, products]);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 mx-6 mb-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-left text-lg md:text-xl font-light tracking-widest">
          You may also like
        </h2>

        <Link
          to="/shop"
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-black transition"
        >
          View more <FiChevronRight />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {related.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product.productId || product._id}`}
            className="group"
          >
            <div
              className="
            border border-gray-200 rounded-md p-3
            transition-all duration-300
            group-hover:-translate-y-0.5
            group-hover:shadow-md
          "
            >
              <div className="overflow-hidden aspect-3/4 bg-gray-50">
                <img
                  src={getImageUrl(product.image[0])}
                  alt={product.name}
                  className="
                h-full w-full object-cover
                transition-transform duration-300
                group-hover:scale-105
              "
                />
              </div>
              <p className="mt-2 text-sm md:text-base font-light tracking-wide text-black line-clamp-none wrap-break-word">
                {product.name}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {product.category} • {product.subCategory}
              </p>
              <p className="text-[12px] text-gray-700 mt-1">
                {currency}
                {product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
