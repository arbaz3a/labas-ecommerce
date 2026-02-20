import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const shopcontext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs ";
  const delivery_fee = "199";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);

  // ================= ADD TO CART =================
  const addToCart = (itemID, itemSize, quantity = 1) => {
    if (!itemID || !itemSize) return;

    setCartItems((prev) => {
      let cartData = structuredClone(prev);

      if (!cartData[itemID]) cartData[itemID] = {};

      let currentQty = cartData[itemID][itemSize] || 0;
      let newQty = currentQty + quantity;

      cartData[itemID][itemSize] = Math.min(9, Math.max(1, newQty));

      return cartData;
    });
  };

  // ================= REMOVE FROM CART =================
  const removeFromCart = (itemID, itemSize) => {
    setCartItems((prev) => {
      let cartData = structuredClone(prev);

      if (cartData[itemID]?.[itemSize]) {
        delete cartData[itemID][itemSize];

        if (Object.keys(cartData[itemID]).length === 0) {
          delete cartData[itemID];
        }
      }

      return cartData;
    });
  };

  // ================= CART COUNT =================
  useEffect(() => {
    let totalCount = 0;

    Object.values(cartItems).forEach((sizes) => {
      Object.values(sizes).forEach((qty) => {
        totalCount += qty;
      });
    });

    setCartCount(totalCount);
  }, [cartItems]);

  // ================= CONTEXT VALUE =================
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    cartCount,
    orders,
    setOrders,
    setCartItems,
  };

  return (
    <shopcontext.Provider value={value}>{props.children}</shopcontext.Provider>
  );
};

export default ShopContextProvider;
