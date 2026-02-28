import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";
import SizeChart from "./SizeChart";

function ProductInfo({
  productdata,
  currency,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  openDesc,
  setOpenDesc,
  openCare,
  setOpenCare,
}) {
  const { addToCart, toggleWishlist, isInWishlist } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSizeChart, setShowSizeChart] = useState(false);

  const wishlisted = isInWishlist(productdata._id);

  const handleWishlist = () => {
    if (!user) {
      toast.dismiss();
      toast("Please sign in to add to wishlist", {
        type: "info",
        toastId: "wishlist-auth",
      });
      navigate("/signin");
      return;
    }
    toggleWishlist(productdata._id);
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <p className="text-xs uppercase tracking-widest text-gray-500">
        {productdata.category} · {productdata.subCategory}
      </p>

      <h1 className="text-3xl tracking-widest font-semibold leading-snug select-none">
        {productdata.name}
      </h1>

      {productdata.productId && (
        <p
          className="text-sm tracking-widest text-gray-500 font-medium uppercase"
          style={{ marginTop: "-12px" }}
        >
          {productdata.productId}
        </p>
      )}

      <p className="text-xl font-medium">
        {currency}
        {productdata.price.toLocaleString("en-PK", {
          minimumFractionDigits: 2,
        })}
      </p>

      {productdata.sizes && productdata.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
              Size
            </p>
            {productdata.category !== "Watches" &&
              productdata.category !== "Fragrances" && (
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-black transition cursor-pointer"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 7h6m-6 4h3m-3 4h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                  Size Guide
                </button>
              )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {productdata.sizes.map((size) => (
              <button
                key={size}
                onClick={() =>
                  setSelectedSize((prev) => (prev === size ? null : size))
                }
                className={`px-4 uppercase py-2.5 text-xs transition cursor-pointer outline-none border ${
                  selectedSize === size
                    ? "bg-black text-white border-black cursor-default"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => {
            toast.dismiss();

            // only require size if product has sizes
            if (
              productdata.sizes &&
              productdata.sizes.length > 0 &&
              !selectedSize
            ) {
              toast("Please select a size", {
                type: "error",
                toastId: "size-error-toast",
              });
              return;
            }

            addToCart(productdata._id, selectedSize || "One Size", quantity);
            toast("Added to cart", {
              type: "success",
              toastId: "cart-success",
            });
          }}
          className="flex-1 py-3.5 bg-black text-white uppercase text-[12px] tracking-[0.15em] font-medium hover:opacity-90 cursor-pointer transition"
        >
          Add to Cart
        </button>

        <button
          onClick={handleWishlist}
          className={`w-14 flex items-center justify-center border transition cursor-pointer ${
            wishlisted
              ? "bg-gray-100 border-black text-black"
              : "border-gray-300 text-gray-400 hover:border-black hover:text-black"
          }`}
          aria-label="Add to wishlist"
        >
          <FiHeart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="border-t pt-2">
        <button
          onClick={() => setOpenDesc(!openDesc)}
          className="w-full flex justify-between items-center text-sm font-medium cursor-pointer py-1"
        >
          <span>Description</span>
          <span className="text-lg">{openDesc ? "−" : "+"}</span>
        </button>
        <div
          className={`grid transition-all duration-300 ease-in-out ${openDesc ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <p className="text-sm text-gray-600 leading-relaxed">
              {productdata.description}
            </p>
          </div>
        </div>
      </div>
      {productdata.careInstructions &&
        productdata.careInstructions.length > 0 && (
          <div className="border-t pt-2">
            <button
              onClick={() => setOpenCare(!openCare)}
              className="w-full flex justify-between items-center text-sm font-medium cursor-pointer py-1"
            >
              <span>Care Instructions</span>
              <span className="text-lg">{openCare ? "−" : "+"}</span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${openCare ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <ul className="text-sm text-gray-600 list-disc ml-5">
                  {productdata.careInstructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      <SizeChart
        isOpen={showSizeChart}
        onClose={() => setShowSizeChart(false)}
        category={productdata.category}
        subCategory={productdata.subCategory}
      />
    </div>
  );
}

export default ProductInfo;
