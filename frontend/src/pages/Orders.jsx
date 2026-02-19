import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { shopcontext } from "../context/shopcontext";

function Orders() {
  const navigate = useNavigate();
  const { cartItems, products } = useContext(shopcontext);

  const items = [];

  Object.entries(cartItems).forEach(([id, sizes]) => {
    Object.entries(sizes).forEach(([size, qty]) => {
      const product = products.find((p) => p._id === id);
      if (product) {
        items.push({ ...product, size, qty });
      }
    });
  });

  return (
    <div className="py-10 px-6">
      <h2 className="text-lg font-medium mb-8">Profile</h2>
      {items.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-lg">
          <p className="font-medium text-lg">No orders yet</p>

          <p className="text-xs text-gray-600 mt-5">
            Go to{" "}
            <span
              onClick={() => navigate("/shop")}
              className="underline cursor-pointer text-black hover:text-gray-700"
            >
              store
            </span>{" "}
            to place an order.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[80px_1fr_auto] border-b gap-4 border-b-gray-200 pb-2"
            >
              <div className="w-20 h-25">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-xs text-gray-900 mb-1">Size: {item.size}</p>
                <p className="text-xs text-gray-900">Qty: {item.qty}</p>
                <p className="text-xs text-gray-700 mt-1">
                  Ordered on: {new Date().toLocaleDateString()}
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
