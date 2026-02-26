import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import AddressForm from "../components/AddressForm";
import CheckoutSummary from "../components/CheckoutSummary";
import PolicyLinks from "../components/PolicyLinks";
import { FiLock, FiTruck, FiCreditCard } from "react-icons/fi";

function Checkout() {
  const {
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    setOrders,
    products,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postal: "",
    phone: "",
    country: "Pakistan",

    paymentMethod: "card",
  });

  const [errors, setErrors] = useState({});
  const [saveEmailInfo, setSaveEmailInfo] = useState(false);
  const [saveDeliveryInfo, setSaveDeliveryInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handlePayNow = () => {
    let newErrors = {};
    if (!formData.email?.trim()) {
      newErrors.email = "Please enter your email address";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!formData.city?.trim()) newErrors.city = "Please select your city";
    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address?.trim()) newErrors.address = "Address is required";
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneClean = formData.phone.replace(/[\s-]/g, "");
      if (!/^03\d{9}$/.test(phoneClean)) {
        newErrors.phone = "Enter a valid phone number (03XXXXXXXXX)";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstErrorField}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (formData.paymentMethod === "cod") {
      let subtotal = 0;

      Object.entries(cartItems).forEach(([id, sizes]) => {
        Object.entries(sizes).forEach(([size, qty]) => {
          const product = products.find((p) => p._id === id);
          if (product) subtotal += product.price * qty;
        });
      });

      const calculatedTotal = subtotal + Number(delivery_fee);
      const orderItemsSnapshot = structuredClone(cartItems);

      const newOrder = {
        id: "ORD" + Date.now(),
        date: new Date(),
        status: "Processing",
        items: orderItemsSnapshot,
        total: calculatedTotal,
      };

      setOrders((prev) => [...prev, newOrder]);
      setCartItems({});

      navigate("/orderconfirmation", {
        state: { formData, orderItems: orderItemsSnapshot },
      });

      return;
    }

    console.log("Proceed card payment");
  };

  return (
    <div className="min-h-screen bg-white">
<div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-center gap-2">
          <FiLock className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px] tracking-[0.15em] uppercase text-gray-400 font-medium">
            Secure Checkout
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-0 lg:gap-0">
<div className="px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
<div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-semibold">
                  1
                </div>
                <h2 className="text-[15px] font-semibold text-black">Contact</h2>
              </div>
              <button
                onClick={() => navigate("/signin")}
                className="text-[12px] text-gray-500 hover:text-black underline underline-offset-2 transition cursor-pointer"
              >
                Sign in
              </button>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`checkout-input ${errors.email ? "checkout-input-error" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-[11px] mt-1.5">{errors.email}</p>
            )}

            <label className="flex items-center gap-2 mt-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={saveEmailInfo}
                onChange={() => setSaveEmailInfo((prev) => !prev)}
                className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-black"
              />
              <span className="text-[12px] text-gray-500 group-hover:text-gray-700 transition">
                Email me with news and offers
              </span>
            </label>
          </div>
<div className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-semibold">
                2
              </div>
              <h2 className="text-[15px] font-semibold text-black">Delivery</h2>
            </div>

            <div className="checkout-card">
              <AddressForm
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                showCity={true}
                phoneRequired={true}
              />

              <label className="flex items-center gap-2 mt-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={saveDeliveryInfo}
                  onChange={() => setSaveDeliveryInfo((prev) => !prev)}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-black"
                />
                <span className="text-[12px] text-gray-500 group-hover:text-gray-700 transition">
                  Save this information for next time
                </span>
              </label>
            </div>
          </div>
<div className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-semibold">
                3
              </div>
              <h2 className="text-[15px] font-semibold text-black">Shipping</h2>
            </div>

            <div className="checkout-shipping-box">
              <div className="flex items-center gap-3">
                <FiTruck className="w-4 h-4 text-gray-500" />
                <span className="text-[13px] text-gray-800">Standard Delivery</span>
              </div>
              <span className="text-[13px] font-semibold text-black">
                {currency}{delivery_fee}
              </span>
            </div>
          </div>
<div className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-semibold">
                4
              </div>
              <h2 className="text-[15px] font-semibold text-black">Payment</h2>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className={`checkout-payment-option ${formData.paymentMethod === "card" ? "checkout-payment-active" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <FiCreditCard className="w-4 h-4 text-gray-600" />
                  <span className="text-[13px] text-gray-900">Credit/Debit Card</span>
                </div>
                <div className="flex gap-2 ml-auto">
                  <img src={assets.visa_logo} alt="Visa" className="w-8 h-5 object-contain" />
                  <img src={assets.mastercard_logo} alt="Mastercard" className="w-8 h-5 object-contain" />
                </div>
              </label>

              <label
                className={`checkout-payment-option ${formData.paymentMethod === "cod" ? "checkout-payment-active" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <span className="text-[13px] text-gray-900">Cash on Delivery (COD)</span>
                </div>
              </label>
            </div>
          </div>
<button
            onClick={handlePayNow}
            className="w-full h-[52px] bg-black text-white text-[12px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-gray-900 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <FiLock className="w-3.5 h-3.5" />
            {formData.paymentMethod === "cod" ? "Complete Order" : "Pay Now"}
          </button>
<PolicyLinks />
        </div>
<div className="bg-gray-50 lg:border-l border-t lg:border-t-0 border-gray-100 px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
          <CheckoutSummary cartSnapshot={cartItems} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
