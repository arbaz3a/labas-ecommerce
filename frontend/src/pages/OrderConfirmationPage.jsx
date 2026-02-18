import { useLocation } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import PopupMessage from "../components/PopupMessage";

function OrderConfirmationPage() {
  const { state } = useLocation();
  const formData = state?.formData || {};

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] font-sans tracking-wider">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-4 px-5 py-10">

        {/* LEFT */}
        <div className="bg-white p-10 rounded-lg shadow-sm space-y-6 relative">
          <OrderConfirmation formData={formData} />
          <PopupMessage />
        </div>

        {/* RIGHT */}
        <CheckoutOrderSummary />

      </div>
    </div>
  );
}

export default OrderConfirmationPage;
