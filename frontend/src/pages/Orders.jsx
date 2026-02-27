import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FiShoppingBag, FiPackage, FiClock } from "react-icons/fi";
import { getImageUrl } from "../utils/imageUtils";

function Orders() {
  const { orders, currency } = useContext(ShopContext);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
      case "processing":
        return "border border-[#fde68a] text-[#b45309] bg-[#fffbeb]";
      case "shipped":
        return "border border-blue-100 text-blue-700 bg-blue-50/50";
      case "delivered":
        return "border border-green-100 text-green-700 bg-green-50/50";
      case "cancelled":
        return "border border-red-100 text-red-600 bg-red-50/50";
      default:
        return "border border-gray-100 text-gray-600 bg-gray-50/30";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "pending" || status === "processing")
      return <FiClock className="w-3.5 h-3.5" />;
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
            <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-sm bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-100 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <FiPackage className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] sm:text-sm font-bold text-black truncate">
                      ORDER #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-semibold tracking-wider uppercase ${getStatusStyle(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="text-[9px] sm:text-[10px]">{order.status}</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-sm font-semibold tracking-wider uppercase border border-gray-200 text-gray-600 bg-gray-50/50">
                    <span className="text-[9px] sm:text-[10px]">
                      {order.paymentMethod === 'cod' ? 'COD' : 'PAID'} · {order.paymentStatus || 'PENDING'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-5 py-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-start gap-3 min-w-0">
                      <img src={getImageUrl(item.image)} alt={item.name} className="w-10 h-10 object-cover rounded flex-shrink-0 bg-gray-100" />
                      <div className="min-w-0">
                        <p className="text-[13px] sm:text-sm text-gray-800 font-medium leading-snug">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Size: <span className="text-gray-600 font-medium">{item.size}</span> × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-[13px] sm:text-sm font-semibold text-black flex-shrink-0 ml-4">
                      {currency}{(item.price * item.quantity).toLocaleString("en-PK")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-t border-gray-100 bg-gray-50/30">
                <p className="text-[13px] sm:text-sm font-bold text-black uppercase tracking-wider">Total Amount</p>
                <p className="text-sm sm:text-base font-bold text-black">
                  {currency}{Number(order.totalPrice || 0).toLocaleString("en-PK")}
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
