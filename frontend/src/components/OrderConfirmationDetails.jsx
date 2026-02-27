import React, { useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FiMail, FiMessageCircle } from "react-icons/fi";

function OrderConfirmationDetails({ formData }) {
  const navigate = useNavigate();
  const { setCartItems } = useContext(ShopContext);

  useEffect(() => {
    setCartItems({});
  }, [setCartItems]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div>
            <h2 className="text-xl font-semibold text-black">
              Thank you, {formData.firstName || "Customer"}!
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
        <p className="text-[14px] font-medium text-black mb-1">Your order is confirmed</p>
        <p className="text-[13px] text-gray-500 leading-relaxed">
          We will be in touch with you shortly to finalize your order. Your
          purchase is not complete until confirmed by our team.
        </p>
      </div>
      <div className="space-y-5">
        <h3 className="text-[13px] font-semibold tracking-[0.15em] uppercase text-gray-400">
          Order Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium mb-2">
              Contact
            </p>
            <p className="text-[13px] text-gray-800">{formData.email}</p>
            {formData.phone && (
              <p className="text-[13px] text-gray-800 mt-0.5">{formData.phone}</p>
            )}
          </div>
          <div>
            <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium mb-2">
              Payment
            </p>
            <p className="text-[13px] text-gray-800">
              {formData.paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium mb-2">
              Shipping Address
            </p>
            <div className="text-[13px] text-gray-800 leading-relaxed">
              <p className="font-medium">{formData.firstName} {formData.lastName}</p>
              <p>{formData.address}</p>
              {formData.apartment && <p>{formData.apartment}</p>}
              <p>{formData.city}{formData.postal ? `, ${formData.postal}` : ""}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-100" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-medium text-gray-500">Need help?</span>
          <a
            href="https://mail.google.com/mail/?view=cm&to=contact@labas.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-400 transition"
          >
            <FiMail className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-400 transition"
          >
            <FiMessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="h-11 px-8 bg-black text-white text-[12px] font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-gray-900 transition-colors cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationDetails;
