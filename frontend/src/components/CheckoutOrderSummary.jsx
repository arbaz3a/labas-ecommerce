import React, { useMemo, useContext } from "react";
import { shopcontext } from "../context/shopcontext";

function CheckoutOrderSummary({ cartSnapshot }) {
  const { cartItems, products, currency, delivery_fee } =
    useContext(shopcontext);

  // choose snapshot OR live cart safely
  const sourceCart = cartSnapshot ?? cartItems ?? {};

  // flatten cart structure → array
  const items = useMemo(() => {
    const arr = [];

    Object.entries(sourceCart).forEach(([id, sizes]) => {
      Object.entries(sizes).forEach(([size, qty]) => {
        arr.push({ id, size, qty });
      });
    });

    return arr;
  }, [sourceCart]);

  const subtotal = useMemo(() => {
    let sum = 0;

    items.forEach((item) => {
      const product = products.find((p) => p._id === item.id);
      if (product) sum += product.price * item.qty;
    });

    return sum;
  }, [items, products]);

  const total = subtotal + Number(delivery_fee);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm h-fit sticky top-4 sm:top-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 sm:space-y-4 mb-6">
        {items.map((item) => {
          const product = products.find((p) => p._id === item.id);
          if (!product) return null;

          return (
            <div
              key={`${item.id}-${item.size}`}
              className="grid grid-cols-[auto_1fr_auto] gap-2 items-start border-b border-gray-200 py-1 sm:py-2"
            >
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="w-12 h-16 object-cover rounded"
              />

              <div className="flex flex-col text-xs">
                <p className="font-medium text-sm leading-snug wrap-break-word">
                  {product.name}
                </p>

                <div className="flex flex-col sm:flex-row text-gray-700 mt-1 gap-1 sm:gap-2">
                  <span className="flex gap-1">
                    <span className="font-medium text-black">Size:</span>
                    <span>{item.size}</span>
                  </span>

                  <span className="hidden sm:inline">•</span>

                  <span className="flex gap-1">
                    <span className="font-medium text-black">Item:</span>
                    <span>{item.qty}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {currency}
                {(product.price * item.qty).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mb-2 text-xs sm:text-sm">
        <span>Subtotal</span>
        <span>
          {currency}
          {subtotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between mb-4 text-xs sm:text-sm">
        <span>Shipping</span>
        <span>
          {currency}
          {Number(delivery_fee).toFixed(2)}
        </span>
      </div>

      <div className="border-t pt-4 flex justify-between font-semibold text-sm sm:text-base">
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
