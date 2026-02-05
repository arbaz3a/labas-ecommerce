import React, { useContext } from "react";
import { shopcontext } from "../context/shopcontext";
import { FiTrash2, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CartDrawer({ onClose }) {
  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    removeFromCart,
    addToCart,
  } = useContext(shopcontext);
  const navigate = useNavigate();

  // flatten cart for display: [{ id, size, qty }]
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
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col
                 w-[90vw] sm:max-w-sm font-sans tracking-wider"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold tracking-widest">Shopping Cart</h2>
        <button onClick={onClose} className="cursor-pointer p-2 rounded-lg hover:bg-gray-100">
          <FiX size={22} />
        </button>
      </div>

      {/* cart items */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 mt-12 text-base tracking-wider"
            >
              Your cart is empty
            </motion.div>
          ) : (
            items.map((item) => {
              const product = products.find((p) => p._id === item.id);
              if (!product) return null;

              return (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 items-start border-b border-gray-200 pb-4 mb-4"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-19 h-23 object-cover rounded"
                  />

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
                      <div>
                        <h3 className="text-sm font-semibold tracking-wider">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-600 tracking-wider mt-0.5">
                          <span className="text-gray-900 font-bold mr-1 text-xs">
                            Size:
                          </span>
                          {item.size}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-600 hover:text-red-600 transition cursor-pointer"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1">
                        <button
                          className="w-6 h-6 flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition cursor-pointer text-gray-600"
                          onClick={() => addToCart(item.id, item.size, -1)}
                        >
                          −
                        </button>

                        <span className="min-w-5 text-center font-normal text-sm select-none">
                          {item.qty}
                        </span>

                        <button
                          className="w-6 h-6 flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition cursor-pointer text-gray-600"
                          onClick={() => addToCart(item.id, item.size, 1)}
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xs font-semibold tracking-wider">
                        {currency}
                        {(product.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* ORDER SUMMARY */}
      {items.length > 0 && (
        <div className="px-6 py-4 border-t text-xs tracking-wider">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium ">
              Subtotal ({items.length} items)
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
              navigate("/cart-checkout");
            }}
            className="w-full mt-4 py-3 bg-black cursor-pointer text-white text-xs tracking-widest hover:opacity-90 transition"
          >
            CHECKOUT
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default CartDrawer;
