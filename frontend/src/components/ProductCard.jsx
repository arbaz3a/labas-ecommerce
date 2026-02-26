import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-toastify";

function ProductCard({ id, image, name, price, category, subCategory }) {
  const { currency, toggleWishlist, isInWishlist } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const hasSecondImage = image && image.length > 1;
  const wishlisted = isInWishlist(id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.dismiss();
      toast("Please sign in to add to wishlist", { type: "info", toastId: "wishlist-auth" });
      navigate("/signin");
      return;
    }
    toggleWishlist(id);
  };

  return (
    <Link
      className="group block"
      to={`/product/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
<div className="relative overflow-hidden aspect-[3/4] bg-[#f5f5f5]">
        <img
          className="w-full h-full object-cover transition-all duration-500"
          src={hovered && hasSecondImage ? image[1] : image[0]}
          alt={name}
        />
<button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition bg-white/80 backdrop-blur-sm ${wishlisted ? "text-black" : "text-gray-400 hover:text-black"
            }`}
        >
          <FiHeart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
        </button>
<div className="absolute bottom-0 left-0 right-0 bg-black/90 flex items-center justify-center h-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <span className="text-[11px] tracking-[0.15em] uppercase text-white font-medium">
            Quick view
          </span>
        </div>
      </div>
<div className="mt-3 text-center">
        <p className="text-[11px] sm:text-[12px] tracking-[0.1em] uppercase leading-snug line-clamp-2 text-gray-800 font-medium">
          {name}
        </p>
        <p className="text-[12px] sm:text-[13px] mt-1 text-gray-500">
          {currency}{price.toLocaleString("en-PK", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
