import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiTrash2, FiX, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";

function CartDrawer({ onClose }) {
  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    removeFromCart,
    addToCart,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const items = [];
  Object.entries(cartItems).forEach(([id, sizes]) => {
    Object.entries(sizes).forEach(([size, qty]) => {
      items.push({ id, size, qty });
    });
  });

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p._id === item.id);
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);

  const total = subtotal + Number(delivery_fee);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 right-0 h-full z-50 bg-white flex flex-col
                 w-[92vw] sm:max-w-[420px] font-sans"
      style={{ boxShadow: "-8px 0 30px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center justify-between px-6 h-[60px] border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <FiShoppingBag className="w-[18px] h-[18px] text-gray-800" />
          <h2 className="text-[13px] font-semibold tracking-[0.2em] uppercase text-black">
            Your Bag
          </h2>
          {items.length > 0 && (
            <span className="text-[11px] text-gray-400 font-medium">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close cart"
        >
          <FiX className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-hide">
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <FiShoppingBag className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">Your bag is empty</p>
              <p className="text-xs text-gray-400">Add items to get started</p>
            </motion.div>
          ) : (
            items.map((item, index) => {
              const product = products.find((p) => p._id === item.id);
              if (!product) return null;

              return (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="flex gap-4 items-start pb-5 mb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="w-[72px] h-[90px] rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-[13px] font-medium text-gray-900 leading-tight truncate">
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Size: <span className="text-gray-600">{item.size}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-gray-200 rounded-full overflow-hidden">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer text-sm"
                          onClick={() => addToCart(item.id, item.size, -1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-[13px] font-medium text-gray-900 select-none">
                          {item.qty}
                        </span>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer text-sm"
                          onClick={() => addToCart(item.id, item.size, 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-[13px] font-semibold text-gray-900">
                        {currency}
                        {(product.price * item.qty).toLocaleString("en-PK")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
      {items.length > 0 && (
        <OrderSummary
          items={items}
          currency={currency}
          subtotal={subtotal}
          delivery_fee={delivery_fee}
          total={total}
          onClose={onClose}
        />
      )}
    </motion.div>
  );
}

export default CartDrawer;
