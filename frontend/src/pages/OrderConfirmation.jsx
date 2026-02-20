import { useLocation } from "react-router-dom";
import OrderConfirmDetails from "../components/OrderConfirmDetails";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import PopupMessage from "../components/PopupMessage";
import { useContext } from "react";
import { shopcontext } from "../context/shopcontext";

function OrderConfirmation() {
  const { state } = useLocation();
  const { products } = useContext(shopcontext);

  const formData = state?.formData || {};
  const orderItems = state?.orderItems || {};

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] font-sans tracking-wider">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-4 px-5 py-10">
        {/* LEFT */}
        <div className="bg-white p-10 rounded-lg shadow-sm space-y-6 relative">
          <OrderConfirmDetails
            formData={formData}
            orderItems={orderItems}
            products={products}
          />
          <PopupMessage />
        </div>

        {/* RIGHT */}
        <CheckoutOrderSummary cartSnapshot={orderItems} />
      </div>
    </div>
  );
}

export default OrderConfirmation;
