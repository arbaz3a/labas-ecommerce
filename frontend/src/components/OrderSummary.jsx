import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function OrderSummary({
  items,
  currency,
  subtotal,
  delivery_fee,
  total,
  onClose,
}) {
  const navigate = useNavigate();

  return (
    <div className="border-t border-gray-100 px-6 py-5 flex-shrink-0 bg-white">
      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-500">
            Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
          <span className="text-[13px] font-medium text-gray-900">
            {currency}
            {subtotal.toLocaleString("en-PK")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-500">Delivery</span>
          <span className="text-[13px] font-medium text-gray-900">
            {currency}
            {Number(delivery_fee).toLocaleString("en-PK")}
          </span>
        </div>
      </div>

      <div className="h-px bg-gray-100 my-3" />
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm font-semibold text-black">Total</span>
        <span className="text-sm font-semibold text-black">
          {currency}
          {total.toLocaleString("en-PK")}
        </span>
      </div>
      <button
        onClick={() => {
          onClose();
          navigate("/checkout");
        }}
        className="w-full h-12 bg-black text-white text-[12px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-gray-900 transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        CHECKOUT
      </button>
    </div>
  );
}

export default OrderSummary;
