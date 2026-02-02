import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
export const shopcontext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs ";
  const delivery_fee = "199";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <shopcontext.Provider value={value}>{props.children}</shopcontext.Provider>
  );
};

export default ShopContextProvider;
