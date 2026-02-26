import React, { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FiShoppingBag, FiPackage, FiClock } from "react-icons/fi";

function Orders() {
  const navigate = useNavigate();
  const { orders, products, currency } = useContext(ShopContext);

  const productMap = useMemo(() => {
    const map = {};
    products.forEach((p) => { map[p._id] = p; });
    return map;
  }, [products]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing": return "border border-[#fde68a] text-[#b45309] bg-[#fffbeb]";
      case "Ready to Ship": return "border border-blue-100 text-blue-700 bg-blue-50/50";
      case "Delivered": return "border border-green-100 text-green-700 bg-green-50/50";
      case "Confirmed": return "border border-gray-200 text-gray-700 bg-gray-50/80";
      default: return "border border-gray-100 text-gray-600 bg-gray-50/30";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Processing") return <FiClock className="w-3.5 h-3.5" />;
    return <FiPackage className="w-3.5 h-3.5" />;
  };

  return (
    <div className="page-wrapper py-10 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <span>&gt;</span>
        <span className="text-black">My Orders</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-black mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <FiShoppingBag className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">No Orders Yet</h3>
          <p className="text-sm text-gray-500 mb-6">
            Start shopping to see your orders here.
          </p>
          <Link
            to="/shop"
            className="px-8 py-3 bg-black text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:opacity-90 transition"
          >
            Browse Collection
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-sm bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-100 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <FiPackage className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] sm:text-sm font-bold text-black truncate">
                      ORDER #{order.id}
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                      {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm font-semibold tracking-wider uppercase ${getStatusStyle(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="text-[9px] sm:text-[10px]">{order.status.toUpperCase()}</span>
                  </div>
                  {order.paymentMethod === "COD" ? (
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm font-semibold tracking-wider uppercase border border-gray-200 text-gray-500 bg-gray-50/50">
                      <span className="text-[9px] sm:text-[10px]">{order.payment ? "COD · PAID" : "COD · PENDING"}</span>
                    </div>
                  ) : order.paymentMethod && (
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm font-semibold tracking-wider uppercase border border-gray-200 text-gray-500 bg-gray-50/50">
                      <span className="text-[9px] sm:text-[10px]">{order.paymentMethod.toUpperCase()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-4 sm:px-5 py-2">
                {Object.entries(order.items || {}).map(([id, sizes]) =>
                  Object.entries(sizes).map(([size, qty]) => {
                    const product = productMap[id];
                    if (!product) return null;
                    return (
                      <div key={`${id}-${size}`} className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0"></span>
                          <div className="min-w-0">
                            <p className="text-[13px] sm:text-sm text-gray-800 font-medium leading-snug">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              Size: <span className="text-gray-600 font-medium">{size}</span> × {qty}
                            </p>
                          </div>
                        </div>
                        <p className="text-[13px] sm:text-sm font-semibold text-black flex-shrink-0 ml-4">
                          {currency}{(product.price * qty).toLocaleString("en-PK")}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-t border-gray-100 bg-gray-50/30">
                <p className="text-[13px] sm:text-sm font-bold text-black uppercase tracking-wider">Total Amount</p>
                <p className="text-sm sm:text-base font-bold text-black">
                  {currency}{Number(order.total || 0).toLocaleString("en-PK")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
