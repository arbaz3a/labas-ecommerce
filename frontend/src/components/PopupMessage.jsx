import React, { useState } from "react";

function PopupMessage() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

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

  const handleOpen = (link) => {
    setPopupTitle(link.name);
    setPopupMessage(link.message);
    setShowPopup(true);
  };

  const handleClose = () => setShowPopup(false);

  return (
    <>
      {/* Links */}
      <div className="flex justify-center gap-5 mt-1 flex-wrap text-xs text-gray-500">
        {popupmessages.map((link, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpen(link);
            }}
            className="hover:opacity-80 underline text-black"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleClose}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg transform transition-all duration-300 scale-95 opacity-0 animate-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
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
    </>
  );
}

export default PopupMessage;
