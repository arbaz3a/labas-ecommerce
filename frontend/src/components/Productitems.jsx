import React, { useContext } from "react";
import { shopcontext } from "../context/shopcontext";
import { Link } from "react-router-dom";

function Productitems({ id, image, name, price, category, subCategory }) {
  const { currency } = useContext(shopcontext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="ease-in-out transition hover:scale-110"
          src={image[0]}
          alt="product-image"
        />
      </div>
      <p className="pt-3 pb-0.5 text-sm md:text-base font-light tracking-wide text-gray-800 line-clamp-none wrap-break-word">
        {name}
      </p>
      <p className="text-[11px] text-gray-500 mt-0.5">
        {category} • {subCategory}
      </p>
      <p className="text-[12px] text-gray-600 mt-1">
        {currency}
        {price.toFixed(2)}
      </p>
    </Link>
  );
}

export default Productitems;
