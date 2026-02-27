import { createContext, useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";

export const ShopContext = createContext();

const ShopProvider = (props) => {
  const currency = "Rs ";
  const delivery_fee = 199;

  const { user, token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to load products:", err.message);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch wishlist from API when user logs in
  useEffect(() => {
    if (!user || !token) {
      setWishlist([]);
      return;
    }
    const fetchWishlist = async () => {
      try {
        const { data } = await api.get("/wishlist");
        setWishlist(data.products.map((p) => (typeof p === "object" ? p._id : p)));
      } catch {
        setWishlist([]);
      }
    };
    fetchWishlist();
  }, [user, token]);

  // Fetch orders from API when user logs in
  useEffect(() => {
    if (!user || !token) {
      setOrders([]);
      return;
    }
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data.orders);
      } catch {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user, token]);

  const toggleWishlist = async (productId) => {
    if (!user) return;

    const isWished = wishlist.includes(productId);

    // Optimistic update
    if (isWished) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
    } else {
      setWishlist((prev) => [...prev, productId]);
    }

    try {
      if (isWished) {
        await api.delete(`/wishlist/${productId}`);
      } else {
        await api.post("/wishlist", { productId });
      }
    } catch {
      // Revert on error
      if (isWished) {
        setWishlist((prev) => [...prev, productId]);
      } else {
        setWishlist((prev) => prev.filter((id) => id !== productId));
      }
    }
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
    productsLoading,
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
