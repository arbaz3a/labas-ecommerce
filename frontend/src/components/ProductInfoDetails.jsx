import React, { useContext } from "react";
import { shopcontext } from "../context/shopcontext";
import { toast } from "react-toastify";

function ProductInfoDetails({
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
  const { addToCart } = useContext(shopcontext);
  return (
    <div className="flex-1 flex flex-col gap-6">
      <p className="text-xs uppercase tracking-widest text-gray-500">
        {productdata.category} / {productdata.subCategory}
      </p>

      <h1 className="text-3xl tracking-widest font-semibold leading-snug select-none">
        {productdata.name}
      </h1>

      <p className="text-xl font-medium">
        {currency}
        {productdata.price.toFixed(2)}
      </p>

      <div>
        <p className="text-sm font-medium mb-2 uppercase tracking-widest">
          Size
        </p>
        <div className="flex gap-2 flex-wrap">
          {productdata.sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                setSelectedSize((prev) => (prev === size ? null : size))
              }
              className={`px-3 py-2 text-xs rounded-xs transition cursor-pointer outline-none border ${
                selectedSize === size
                  ? "bg-black text-white border-black cursor-default"
                  : "border-gray-300 hover:border-gray-200 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 uppercase tracking-widest">
          Quantity
        </p>
        <div className="inline-flex items-center gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center text-lg cursor-pointer border border-gray-100 hover:bg-gray-100 transition"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>

          <span className="min-w-6 text-center font-medium select-none">
            {quantity}
          </span>

          <button
            className="w-8 h-8 flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => setQuantity((q) => Math.min(9, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={() => {
            // remove any existing toast first
            toast.dismiss();

            // show error if size not selected
            if (!selectedSize) {
              toast("Please select a size", {
                type: "error",
                toastId: "size-error-toast",
              });
              return;
            }

            // cart logic
            addToCart(productdata._id, selectedSize, quantity);
          }}
          className="w-full py-3 bg-black text-white uppercase text-sm tracking-wide hover:opacity-90 cursor-pointer"
        >
          Add
        </button>

        <button className="w-full py-3 border border-black text-black uppercase text-sm tracking-wide hover:bg-gray-100 hover:text-black transition cursor-pointer">
          Buy It Now
        </button>
      </div>

      <div className="border-t pt-2">
        <button
          onClick={() => setOpenDesc(!openDesc)}
          className="w-full flex justify-between items-center text-sm font-medium cursor-pointer"
        >
          <span>Description</span>
          <span className="text-lg">{openDesc ? "-" : "+"}</span>
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            openDesc
              ? "grid-rows-[1fr] opacity-100 mt-3"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-sm text-gray-600 leading-relaxed">
              {productdata.description}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-2">
        <button
          onClick={() => setOpenCare(!openCare)}
          className="w-full flex justify-between items-center text-sm font-medium cursor-pointer"
        >
          <span>Care Instructions</span>
          <span className="text-lg">{openCare ? "−" : "+"}</span>
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            openCare
              ? "grid-rows-[1fr] opacity-100 mt-3"
              : "grid-rows-[0fr] opacity-0"
          }`}
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
    </div>
  );
}

export default ProductInfoDetails;
