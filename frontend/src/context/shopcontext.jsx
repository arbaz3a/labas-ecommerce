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

  // add to cart
  const addToCart = (itemID, itemSize, quantity = 1) => {
    if (!itemID || !itemSize) return;

    let cartData = structuredClone(cartItems);

    if (cartData[itemID]) {
      if (cartData[itemID][itemSize]) {
        // update quantity with limits
        let newQty = cartData[itemID][itemSize] + quantity;
        cartData[itemID][itemSize] = Math.min(9, Math.max(1, newQty));
      } else {
        cartData[itemID][itemSize] = Math.min(9, Math.max(1, quantity));
      }
    } else {
      cartData[itemID] = {};
      cartData[itemID][itemSize] = Math.min(9, Math.max(1, quantity));
    }

    setCartItems(cartData);
  };

  // remove item from cart
  const removeFromCart = (itemID, itemSize) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemID] && cartData[itemID][itemSize]) {
      delete cartData[itemID][itemSize];
      if (Object.keys(cartData[itemID]).length === 0) {
        delete cartData[itemID];
      }
      setCartItems(cartData);
    }
  };

  
  // // update cart count based on unique size + product name

  // useEffect(() => {
  //   let totalCount = 0;
  //   Object.values(cartItems).forEach((sizes) => {
  //     totalCount += Object.keys(sizes).length; // count each size once
  //   });
  //   setCartCount(totalCount);
  // }, [cartItems]);


  // update cart count based on total number of items,
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
  };

  return (
    <shopcontext.Provider value={value}>{props.children}</shopcontext.Provider>
  );
};

export default ShopContextProvider;
