import React, { useContext, useState, useMemo } from "react";
import { shopcontext } from "../context/shopcontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import AddressForm from "../components/AddressForm";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import PopupMessage from "../components/PopupMessage";

function Checkout() {
  const { currency, delivery_fee } = useContext(shopcontext);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: false });
  };

  const handlePayNow = () => {
    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "phone",
    ];

    let newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
                className="text-xs cursor-pointer text-gray-800"
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
              } rounded-md px-5 py-3 mb-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
            />

            <label className="flex items-center gap-1 mb-1 text-xs">
              <input
                type="checkbox"
                checked={saveEmailInfo}
                onChange={() => setSaveEmailInfo(!saveEmailInfo)}
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
                onChange={() => setSaveDeliveryInfo(!saveDeliveryInfo)}
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

          {/* Payment Options */}
          <div className="flex flex-col gap-1 mb-3">
            <h2
              className="text-lg font-semibold mb-2 tracking-wider"
              style={{ letterSpacing: "0.5px" }}
            >
              Payment Method
            </h2>
            {/* Option 1: credit and debit*/}
            <label
              className={`flex items-center gap-3 border border-gray-300 rounded-md p-2 text-gray-700 cursor-pointer transition-colors ${
                formData.paymentMethod === "card" ? "bg-gray-200" : "bg-white"
              }`}
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
            {/* Option 2: cod */}
            <label
              className={`flex items-center gap-3 border border-gray-300 rounded-md p-2 text-gray-700 cursor-pointer transition-colors ${
                formData.paymentMethod === "cod" ? "bg-gray-200" : "bg-white"
              }`}
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

          {/* Billing Address */}
          <h2
            className="text-lg font-semibold mb-2 tracking-wider"
            style={{ letterSpacing: "0.5px" }}
          >
            Billing address
          </h2>

          {/* Option 1: same as shipping */}
          <div
            className={`border border-gray-300 rounded-md p-2 mb-1 text-gray-700 cursor-pointer transition-colors ${
              formData.billingSame ? "bg-gray-200" : "bg-white"
            }`}
          >
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="billingSame"
                checked={formData.billingSame}
                onChange={() => setFormData({ ...formData, billingSame: true })}
              />
              <span className="text-gray-900 text-sm">
                Same as shipping address
              </span>
            </label>
          </div>

          {/* Option 2: different billing address */}
          <div
            className={`border border-gray-300 rounded-md py-2 px-1 mb-6 text-gray-700 cursor-pointer transition-colors ${
              !formData.billingSame ? "bg-gray-100" : "bg-white"
            }`}
          >
            <label className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                name="billingSame"
                checked={!formData.billingSame}
                onChange={() =>
                  setFormData({ ...formData, billingSame: false })
                }
              />
              <span className="text-gray-900 text-sm">
                Use a different billing address
              </span>
            </label>

            {/* Smooth slide-down billing form */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                !formData.billingSame
                  ? "max-h-250 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
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

          {/* Pay Now */}
          <button
            onClick={handlePayNow}
            className="cursor-pointer w-full py-4 bg-black text-white font-semibold rounded-md hover:opacity-90 transition text-sm"
          >
            Pay now
          </button>
          {/* POPUP Message*/}
          <PopupMessage />
        </div>

        {/* RIGHT SIDE */}
        <CheckoutOrderSummary />
      </div>
    </div>
  );
}

export default Checkout;
