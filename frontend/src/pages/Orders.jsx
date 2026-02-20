import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { shopcontext } from "../context/shopcontext";

function Orders() {
  const navigate = useNavigate();
  const { orders, products, currency } = useContext(shopcontext);

  // status color styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Ready to Ship":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // create product lookup map for performance
  const productMap = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p._id] = p;
    });
    return map;
  }, [products]);

  return (
    <div className="py-10 px-6 bg-[#f6f6f6]">
      <h2 className="text-lg font-medium mb-8">Orders</h2>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-lg shadow-sm">
          <p className="font-medium text-lg">No orders yet</p>

          <p className="text-xs text-gray-600 mt-5">
            Go to{" "}
            <span
              onClick={() => navigate("/shop")}
              className="underline cursor-pointer text-black hover:text-gray-700"
            >
              store
            </span>{" "}
            to place your first order.
          </p>
        </div>
      ) : (
        <div className="space-y-4 w-full px-2 sm:px-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="w-full bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Order #{order.id}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium ${getStatusStyle(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {Object.entries(order.items || {}).map(([id, sizes]) =>
                  Object.entries(sizes).map(([size, qty]) => {
                    const product = productMap[id];
                    if (!product) return null;

                    return (
                      <div
                        key={`${id}-${size}`}
                        className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-gray-100"
                      >
                        <img
                          src={product.image?.[0]}
                          alt={product.name}
                          className="w-12 h-16 sm:w-16 sm:h-20 object-cover rounded-lg shrink-0"
                        />

                        <div className="flex-1">
                          <h3 className="text-xs sm:text-sm font-medium">
                            {product.name}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-gray-700 mt-0.5">
                            Size: {size}{" "}
                            <span className="px-1 text-sm">&middot;</span> Qty:{" "}
                            {qty}
                          </p>
                        </div>
                      </div>
                    );
                  }),
                )}
              </div>

              <div className="flex justify-end pt-2">
                <p className="text-xs sm:text-sm font-semibold tracking-wider">
                  Total: {currency}
                  {Number(order.total || 0).toFixed(2)}
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
