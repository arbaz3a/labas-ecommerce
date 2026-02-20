import React, { useContext, useState } from "react";
import { shopcontext } from "../context/shopcontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import AddressForm from "../components/AddressForm";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import PopupMessage from "../components/PopupMessage";

function Checkout() {
  const {
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    setOrders,
    products,
  } = useContext(shopcontext);

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

    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingPostal: "",
    billingPhone: "",
    billingCountry: "Pakistan",

    paymentMethod: "card",
    billingSame: true,
  });

  const [errors, setErrors] = useState({});
  const [saveEmailInfo, setSaveEmailInfo] = useState(false);
  const [saveDeliveryInfo, setSaveDeliveryInfo] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // ================= PAYMENT =================
  const handlePayNow = () => {
    let newErrors = {};

    // EMAIL VALIDATION
    if (!formData.email?.trim()) {
      newErrors.email = "Please enter your email address";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // SHIPPING VALIDATION
    ["city", "firstName", "lastName", "address", "phone"].forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // BILLING VALIDATION
    if (!formData.billingSame) {
      ["billingFirstName", "billingLastName", "billingAddress"].forEach(
        (field) => {
          if (!formData[field]?.trim()) {
            newErrors[field] = "This field is required";
          }
        },
      );
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ================= COD ORDER =================
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
    <div className="relative min-h-screen bg-[#f5f5f5] font-sans tracking-wider">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-4 px-5 py-10">
        {/* LEFT SIDE */}
        <div className="bg-white p-10 rounded-lg shadow-sm space-y-6 relative">
          {/* Contact */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2
                className="text-lg font-semibold tracking-wider"
                style={{ letterSpacing: "0.5px" }}
              >
                Contact
              </h2>

              <p
                className="text-xs cursor-pointer text-gray-800 underline"
                onClick={() => navigate("/login")}
              >
                Sign in
              </p>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
            />

            {errors.email && (
              <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
            )}

            <label className="flex items-center gap-1 mb-1 mt-1 text-xs">
              <input
                type="checkbox"
                checked={saveEmailInfo}
                onChange={() => setSaveEmailInfo((prev) => !prev)}
                className="cursor-pointer"
              />
              <span>Email me with news and offers</span>
            </label>
          </div>

          {/* Delivery */}
          <h2
            className="text-lg font-semibold mb-2 tracking-wider"
            style={{ letterSpacing: "0.5px" }}
          >
            Delivery
          </h2>

          <div className="border-gray-300 border rounded-md px-2 py-4">
            <AddressForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              showCity={true}
              phoneRequired={true}
            />

            <label className="flex items-center gap-1 mt-2 text-xs">
              <input
                type="checkbox"
                checked={saveDeliveryInfo}
                onChange={() => setSaveDeliveryInfo((prev) => !prev)}
                className="cursor-pointer"
              />
              <span>Save this information for next time</span>
            </label>
          </div>

          {/* Shipping */}
          <div>
            <h2
              className="text-lg font-semibold mb-2 tracking-wider"
              style={{ letterSpacing: "0.5px" }}
            >
              Shipping Method
            </h2>

            <div className="border border-gray-300 rounded-md p-2 bg-gray-200 flex justify-between mb-6 text-sm">
              <span className="text-gray-800">Standard Delivery</span>
              <span className="font-medium text-gray-800">
                {currency}
                {delivery_fee}
              </span>
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col gap-1 mb-3">
            <h2
              className="text-lg font-semibold mb-2 tracking-wider"
              style={{ letterSpacing: "0.5px" }}
            >
              Payment Method
            </h2>

            <label
              className={`flex items-center gap-3 border border-gray-300 rounded-md p-2 cursor-pointer ${formData.paymentMethod === "card" ? "bg-gray-200" : "bg-white"}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              <span className="text-gray-900 text-sm">Credit/Debit Card</span>
              <div className="flex gap-2 ml-auto">
                <img src={assets.visa_logo} alt="Visa" className="w-8 h-5" />
                <img
                  src={assets.mastercard_logo}
                  alt="Mastercard"
                  className="w-8 h-5"
                />
              </div>
            </label>

            <label
              className={`flex items-center gap-3 border border-gray-300 rounded-md p-2 cursor-pointer ${formData.paymentMethod === "cod" ? "bg-gray-200" : "bg-white"}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              <span className="text-gray-900 text-sm">
                Cash on Delivery (COD)
              </span>
            </label>
          </div>

          {/* Billing */}
          <h2
            className="text-lg font-semibold mb-2 tracking-wider"
            style={{ letterSpacing: "0.5px" }}
          >
            Billing address
          </h2>

          <div
            className={`border border-gray-300 rounded-md p-2 mb-1 ${formData.billingSame ? "bg-gray-200" : "bg-white"}`}
          >
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={formData.billingSame}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, billingSame: true }))
                }
              />
              <span className="text-gray-900 text-sm">
                Same as shipping address
              </span>
            </label>
          </div>

          <div
            className={`border border-gray-300 rounded-md py-2 px-1 mb-6 ${!formData.billingSame ? "bg-gray-100" : "bg-white"}`}
          >
            <label className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                checked={!formData.billingSame}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, billingSame: false }))
                }
              />
              <span className="text-gray-900 text-sm">
                Use a different billing address
              </span>
            </label>

            <div
              className={`overflow-hidden transition-all duration-500 ${!formData.billingSame ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <AddressForm
                prefix="billing"
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                showCity={false}
                phoneRequired={false}
              />
            </div>
          </div>

          <button
            onClick={handlePayNow}
            className="cursor-pointer w-full py-4 bg-black text-white font-semibold rounded-md hover:opacity-90 transition text-sm"
          >
            {formData.paymentMethod === "cod" ? "Complete order" : "Pay now"}
          </button>

          <PopupMessage />
        </div>

        {/* RIGHT SIDE */}
        <CheckoutOrderSummary cartSnapshot={cartItems} />
      </div>
    </div>
  );
}

export default Checkout;
