import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopProvider = (props) => {
  const currency = "Rs ";
  const delivery_fee = "199";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("labas_wishlist")) || [];
    } catch { return []; }
  });
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem("labas_wishlist", JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);
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
  useEffect(() => {
    let totalCount = 0;

    Object.values(cartItems).forEach((sizes) => {
      Object.values(sizes).forEach((qty) => {
        totalCount += qty;
      });
    });

    setCartCount(totalCount);
  }, [cartItems]);
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
    wishlist,
    toggleWishlist,
    isInWishlist,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopProvider;
