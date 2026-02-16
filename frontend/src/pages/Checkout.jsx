import React, { useContext, useState, useMemo } from "react";
import { shopcontext } from "../context/shopcontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

function Checkout() {
  const { cartItems, products, currency, delivery_fee } =
    useContext(shopcontext);
  const navigate = useNavigate();

  const popupmessages = [
    {
      name: "Terms & Conditions",
      message: `
    By accessing and using <strong>Zevylabas</strong>, you agree to the following terms and conditions. Please read them carefully before placing an order.

    <ul>
      <li>You must be of <strong>legal age</strong> to make a purchase.</li>
      <li>Products must not be used for any <strong>illegal or unauthorized purpose</strong>.</li>
      <li>Prices and product availability may change <strong>without prior notice</strong>.</li>
      <li>We reserve the right to <strong>refuse or cancel orders</strong> if necessary.</li>
      <li>Product colors may slightly vary due to screen settings.</li>
      <li>All website content belongs to <strong>Zevylabas</strong> and cannot be copied.</li>
      <li>Products and services are provided <strong>“as is”</strong> without warranties.</li>
      <li>We are not liable for <strong>indirect or consequential damages</strong>.</li>
      <li>These terms are governed by the <strong>laws of Pakistan</strong>.</li>
    </ul>

    Continued use of our website means you accept any updates to these terms.
    `,
    },
    {
      name: "Shipping",
      message: `
    <strong>Zevylabas</strong> delivers orders across Pakistan within <strong>3–5 working days</strong>, depending on your location. 
    Orders are not processed on Sundays or public holidays, and delivery may be delayed during peak seasons. 
    Please ensure accurate shipping details, as we are not responsible for delays caused by incorrect information.
  `,
    },
    {
      name: "Refund Policy",
      message: `
    All purchases at <strong>Zevylabas</strong> are final. Please review our exchange policy below.

    <ul>
      <li>We do <strong>not offer refunds</strong> under any circumstances.</li>
      <li>Exchanges are allowed within <strong>7 days</strong> of purchase.</li>
      <li>Original receipt and packaging are required.</li>
      <li>Items must be <strong>unused, unwashed, and undamaged</strong>.</li>
      <li>Damaged items must be reported within <strong>3 days</strong>.</li>
      <li>No exchanges during <strong>sales or promotions</strong>.</li>
      <li>Accessories are <strong>not eligible</strong> for exchange.</li>
      <li>Discounted items are exchanged at the <strong>current price</strong>.</li>
      <li>Exchange processing may take up to <strong>3 weeks</strong>.</li>
    </ul>

    To request an exchange, contact <strong>contact@zevylabas.com</strong>.
    `,
    },
    {
      name: "Privacy Policy",
      message: `
    <strong>Zevylabas</strong> respects your privacy and is committed to protecting your personal information.

    <ul>
      <li>We collect information such as name, email, and shipping details.</li>
      <li>Payment details are handled via <strong>secure processors</strong>.</li>
      <li>We do <strong>not sell or share</strong> your personal information.</li>
      <li>Non-personal data may be collected for analytics purposes.</li>
      <li>Cookies are used to improve website performance.</li>
      <li>Information may be disclosed if required by <strong>law</strong>.</li>
      <li>Security measures are implemented to protect your data.</li>
      <li>No online system guarantees <strong>absolute security</strong>.</li>
    </ul>

    By using our website, you consent to this privacy policy.
    `,
    },
    {
      name: "Contact",
      message: `
    We are here to assist you with any questions or concerns.

    <ul>
      <li>Customer support hours: <strong>Monday to Saturday, 10am–6pm</strong>.</li>
      <li>Response time: <strong>24–48 hours</strong>.</li>
      <li>Please provide your <strong>order number</strong> for faster service.</li>
      <li>Email us at <strong>contact@zevylabas.com</strong>.</li>
      <li>Call us at <strong>+92 3000-000000</strong>.</li>
    </ul>

    Thank you for choosing <strong>Zevylabas</strong>.
    `,
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postal: "",
    phone: "",
    paymentMethod: "card",
    billingSame: true,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [saveEmailInfo, setSaveEmailInfo] = useState(false);
  const [saveDeliveryInfo, setSaveDeliveryInfo] = useState(false);

  const items = useMemo(() => {
    const arr = [];
    Object.entries(cartItems).forEach(([id, sizes]) => {
      Object.entries(sizes).forEach(([size, qty]) => {
        arr.push({ id, size, qty });
      });
    });
    return arr;
  }, [cartItems]);

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p._id === item.id);
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);

  const total = subtotal + Number(delivery_fee);

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

    ssetPopupTitle("Order Placed");
    setPopupMessage("Thank you for your purchase.");
    setShowPopup(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] font-sans tracking-wider">
      {/* POPUP Message On Both sides Done and Policies*/}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg transform transition-all duration-300 scale-95 opacity-0 animate-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-lg font-semibold mb-4">{popupTitle}</h2>
            <div
              className="mb-6 text-gray-700 leading-relaxed text-sm 
             [&_ul]:list-disc [&_ul]:pl-5 
             [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: popupMessage }}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-4 px-5 py-10">
        {/* LEFT SIDE */}
        <div className="bg-white p-10 rounded-lg shadow-sm space-y-6 relative">
          {/* Contact */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2
                className="text-lg font-semibold"
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
              } rounded-md px-5 py-4 mb-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
            />

            <label className="flex items-center gap-1 mb-4 text-xs">
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
          <div>
            <h2
              className="text-lg font-semibold mb-2"
              style={{ letterSpacing: "0.5px" }}
            >
              Delivery
            </h2>

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
            >
              <option value="">Select City</option>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Islamabad</option>
              <option>Multan</option>
            </select>

            <select
              name="country"
              defaultValue="Pakistan"
              className={`w-full border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
            >
              <option>Pakistan</option>
            </select>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className={`border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
              />
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
            />

            <input
              type="text"
              name="apartment"
              placeholder="Apartment, suite, etc. (optional)"
              value={formData.apartment}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
            />

            <input
              type="text"
              name="postal"
              placeholder="Postal code (optional)"
              value={formData.postal}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
            />

            <div className="relative mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors`}
              />
              <span
                className="absolute right-3 top-2 text-gray-400 cursor-pointer"
                title="We may contact you for order details"
              >
                ?
              </span>
            </div>

            <label className="flex items-center gap-1 mb-4 text-xs">
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
              className="text-lg font-semibold mb-2"
              style={{ letterSpacing: "0.5px" }}
            >
              Shipping Method
            </h2>
            <div className="border border-gray-300 rounded-md p-3 bg-gray-200 flex justify-between mb-6 text-sm">
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
              className="text-lg font-semibold mb-2"
              style={{ letterSpacing: "0.5px" }}
            >
              Payment Method
            </h2>
            <label
              className={`flex items-center gap-3 border border-gray-300 rounded-md p-3 text-gray-700 cursor-pointer transition-colors ${
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

            <label
              className={`flex items-center gap-3 border border-gray-300 rounded-md p-3 text-gray-700 cursor-pointer transition-colors ${
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
            className="text-lg font-semibold mb-2"
            style={{ letterSpacing: "0.5px" }}
          >
            Billing address
          </h2>

          {/* Option 1: Same as shipping */}
          <div
            className={`border border-gray-300 rounded-md p-3 mb-1 text-gray-700 cursor-pointer transition-colors ${
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

          {/* Option 2: Different billing address */}
          <div className="border border-gray-300 rounded-md p-3 mb-6 text-gray-700 cursor-pointer transition-colors">
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
              <select
                name="billingCountry"
                defaultValue="Pakistan"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
              >
                <option>Pakistan</option>
              </select>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  name="billingFirstName"
                  placeholder="First name"
                  value={formData.billingFirstName || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
                />
                <input
                  type="text"
                  name="billingLastName"
                  placeholder="Last name"
                  value={formData.billingLastName || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
                />
              </div>

              <input
                type="text"
                name="billingAddress"
                placeholder="Address"
                value={formData.billingAddress || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
              />

              <input
                type="text"
                name="billingApartment"
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.billingApartment || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
              />

              <input
                type="text"
                name="billingPostal"
                placeholder="Postal code (optional)"
                value={formData.billingPostal || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
              />

              <div className="w-full">
                <input
                  type="text"
                  name="billingPhone"
                  placeholder="Phone (optional)"
                  value={formData.billingPhone || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Pay Now */}
          <button
            onClick={handlePayNow}
            className="cursor-pointer w-full py-4 bg-black text-white font-semibold rounded-md hover:opacity-90 transition text-sm"
          >
            Pay now
          </button>

          {/* Bottom Links */}
          <div className="flex justify-center gap-6 mt-6 flex-wrap text-xs text-gray-500">
            {popupmessages.map((link, index) => (
              <a
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPopupTitle(link.name);
                  setPopupMessage(link.message);
                  setShowPopup(true);
                }}
                className="hover:opacity-80 underline text-black"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-10">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {items.map((item) => {
              const product = products.find((p) => p._id === item.id);
              if (!product) return null;
              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="grid grid-cols-[auto_1fr_auto] gap-3 items-start"
                >
                  {/* Image */}
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded"
                  />

                  {/* Info */}
                  <div className="flex flex-col">
                    <p className="text-sm font-medium wrap-break-word leading-snug">
                      {product.name}
                    </p>

                    <p className="text-xs text-gray-700 mt-1">
                      <span className="font-medium text-black">Size:</span> {item.size}
                      <span className="mx-2">•</span>
                      <span className="font-medium text-black">Item:</span> {item.qty}
                    </p>
                  </div>

                  {/* Price */}
                  <p className="text-sm font-medium whitespace-nowrap">
                    {currency}
                    {(product.price * item.qty).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            <span>
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between mb-4 text-sm">
            <span>Shipping</span>
            <span>
              {currency}
              {Number(delivery_fee).toFixed(2)}
            </span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>
              {currency}
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
