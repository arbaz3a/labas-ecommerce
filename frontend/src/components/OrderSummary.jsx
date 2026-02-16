import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="px-6 py-4 border-t text-xs tracking-wider">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">
          Subtotal <span className="px-1">&middot;</span>{items.length} items
        </span>

        <span className="w-20 text-left font-medium">
          {currency}
          {subtotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Delivery</span>

        <span className="w-20 text-left font-medium">
          {currency}
          {Number(delivery_fee).toFixed(2)}
        </span>
      </div>

      <div className="h-px bg-gray-200 my-2" />

      <div className="flex justify-between items-center text-sm font-semibold">
        <span>Total</span>

        <span className="w-20 text-left">
          {currency}
          {total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={() => {
          onClose();
          navigate("/checkout");
        }}
        className="w-full mt-4 py-3 bg-black cursor-pointer text-white text-xs tracking-widest hover:opacity-90 transition"
      >
        CHECKOUT
      </button>
    </div>
  );
}

export default OrderSummary;
