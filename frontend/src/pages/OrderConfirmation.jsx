import { useLocation } from "react-router-dom";
import OrderConfirmationDetails from "../components/OrderConfirmationDetails";
import CheckoutSummary from "../components/CheckoutSummary";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function OrderConfirmation() {
  const { state } = useLocation();
  const { products } = useContext(ShopContext);

  const formData = state?.formData || {};
  const orderItems = state?.orderItems || {};

  return (
    <div className="min-h-screen bg-white">
<div className="bg-green-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-center gap-2">
          <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[11px] font-bold">✓</span>
          <span className="text-[12px] tracking-[0.1em] font-medium text-green-700">
            Order Confirmed
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
<div className="px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
          <OrderConfirmationDetails formData={formData} orderItems={orderItems} products={products} />
        </div>
<div className="bg-gray-50 lg:border-l border-t lg:border-t-0 border-gray-100 px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
          <CheckoutSummary cartSnapshot={orderItems} />
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
