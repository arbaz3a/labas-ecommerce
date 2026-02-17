import React, { useContext, useMemo } from "react";
import { shopcontext } from "../context/shopcontext";

function CheckoutOrderSummary() {
  const { cartItems, products, currency, delivery_fee } =
    useContext(shopcontext);

  // flatten cart items
  const items = useMemo(() => {
    const arr = [];
    Object.entries(cartItems).forEach(([id, sizes]) => {
      Object.entries(sizes).forEach(([size, qty]) => {
        arr.push({ id, size, qty });
      });
    });
    return arr;
  }, [cartItems]);

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p._id === item.id);
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);

  const total = subtotal + Number(delivery_fee);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-10">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => {
          const product = products.find((p) => p._id === item.id);
          if (!product) return null;
          return (
            <div
              key={`${item.id}-${item.size}`}
              className="grid grid-cols-[auto_1fr_auto] gap-2 py-1 items-start border-b border-gray-200"
            >
              {/* Image */}
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-14 h-18 object-cover rounded"
              />

              {/* Info */}
              <div className="flex flex-col">
                <p className="text-sm font-medium wrap-break-word leading-snug">
                  {product.name}
                </p>

                <p className="text-xs text-gray-700 mt-1">
                  <span className="font-medium text-black">Size:</span>{" "}
                  {item.size}
                  <span className="mx-2">•</span>
                  <span className="font-medium text-black">Item:</span>{" "}
                  {item.qty}
                </p>
              </div>

              {/* Price */}
              <p className="text-sm font-medium whitespace-nowrap">
                {currency}
                {(product.price * item.qty).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mb-2 text-sm">
        <span>Subtotal</span>
        <span>
          {currency}
          {subtotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between mb-4 text-sm">
        <span>Shipping</span>
        <span>
          {currency}
          {Number(delivery_fee).toFixed(2)}
        </span>
      </div>

      <div className="border-t pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>
          {currency}
          {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default CheckoutOrderSummary;
