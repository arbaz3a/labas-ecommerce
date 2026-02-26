import React, { useMemo, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function CheckoutSummary({ cartSnapshot }) {
  const { cartItems, products, currency, delivery_fee } =
    useContext(ShopContext);

  const sourceCart = cartSnapshot ?? cartItems ?? {};

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
    <div className="sticky top-10">
      <h2 className="text-[13px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-6">
        Order Summary
      </h2>
<div className="space-y-4 mb-6">
        {items.map((item) => {
          const product = products.find((p) => p._id === item.id);
          if (!product) return null;

          return (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4 items-start"
            >
<div className="relative flex-shrink-0">
                <div className="w-14 h-[72px] rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black text-white text-[10px] font-semibold flex items-center justify-center">
                  {item.qty}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-gray-900 leading-tight truncate">
                  {product.name}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                  <span>Size: {item.size}</span>
                  <span>·</span>
                  <span>Qty: {item.qty}</span>
                </div>
              </div>

              <p className="text-[13px] font-medium text-gray-900 flex-shrink-0">
                {currency}
                {(product.price * item.qty).toLocaleString("en-PK")}
              </p>
            </div>
          );
        })}
      </div>
<div className="h-px bg-gray-200 my-5" />
<div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-500">Subtotal</span>
          <span className="text-[13px] font-medium text-gray-900">
            {currency}
            {subtotal.toLocaleString("en-PK")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-500">Shipping</span>
          <span className="text-[13px] font-medium text-gray-900">
            {currency}
            {Number(delivery_fee).toLocaleString("en-PK")}
          </span>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-5" />

      <div className="flex justify-between items-center">
        <span className="text-[15px] font-semibold text-black">Total</span>
        <span className="text-[15px] font-semibold text-black">
          {currency}
          {total.toLocaleString("en-PK")}
        </span>
      </div>
    </div>
  );
}

export default CheckoutSummary;
