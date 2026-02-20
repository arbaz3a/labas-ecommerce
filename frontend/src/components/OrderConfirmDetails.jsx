import React, { useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { shopcontext } from "../context/shopcontext";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

function OrderConfirmDetails({ formData }) {
  const navigate = useNavigate();
  const { setCartItems } = useContext(shopcontext);

  // clear cart once on mount
  useEffect(() => {
    setCartItems({});
  }, [setCartItems]);

  // stable confirmation id
  const confirmationId = useMemo(
    () => Math.random().toString(36).substring(2, 10).toUpperCase(),
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border flex items-center justify-center text-green-600 font-bold">
          ✓
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Confirmation # {confirmationId}
          </p>

          <h2 className="font-semibold text-lg">
            Thank you, {formData.firstName || "Customer"}!
          </h2>
        </div>
      </div>

      <div className="border rounded-md p-4 bg-gray-50 text-sm">
        <p className="font-medium mb-1">Your order is confirmed</p>
        <p className="text-gray-900 text-xs">
          We will be in touch with you shortly to finalize your order. Your
          purchase is not complete until confirmed by our team.
        </p>
      </div>

      <div className="border rounded-md p-4 text-sm space-y-4">
        <h3 className="text-lg font-semibold">Order details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-sm font-medium mb-1">Contact information</p>
            <p>{formData.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Payment method</p>
            <p>Cash on Delivery (COD)</p>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Shipping address</p>
            <p>
              {formData.firstName} {formData.lastName}
            </p>
            <p>{formData.address}</p>
            {formData.apartment && <p>{formData.apartment}</p>}
            <p>{formData.city}</p>
            <p>{formData.postal}</p>
            <p>{formData.country}</p>
            <p>{formData.phone}</p>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Billing address</p>
            {formData.billingSame ? (
              <p>Same as shipping address</p>
            ) : (
              <>
                <p>
                  {formData.billingFirstName} {formData.billingLastName}
                </p>
                <p>{formData.billingAddress}</p>
                {formData.billingApartment && (
                  <p>{formData.billingApartment}</p>
                )}
                <p>{formData.billingPostal}</p>
                <p>{formData.billingCountry}</p>
                <p>{formData.billingPhone}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 text-gray-700">
          <h2
            className="text-xs text-black font-semibold"
            style={{ letterSpacing: "0.5px" }}
          >
            Need help?
          </h2>

          <a
            href="https://mail.google.com/mail/?view=cm&to=zevylabas@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-black"
          >
            <FaEnvelope size={16} />
          </a>

          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaWhatsapp size={16} />
          </a>
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="bg-black text-white px-4 py-3 rounded-md hover:bg-black/80 text-xs cursor-pointer"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmDetails;
