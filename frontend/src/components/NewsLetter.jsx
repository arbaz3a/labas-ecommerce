import React, { useState } from "react";
import { FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
      <p className="text-gray-600 text-sm mb-4">
        Subscribe to get the latest updates and offers.
      </p>

      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="
            w-full px-4 py-2 pr-12
            border-b-2 border-gray-300 bg-transparent text-gray-700
            focus:outline-none focus:border-gray-400 transition
          "
        />
        <button
          type="submit"
          className="
            absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900
            transition cursor-pointer"
        >
          <FaEnvelope size={20} weight="bold" />
        </button>
      </form>

      <div className="flex space-x-4 mt-6 text-gray-700">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
          <FaLinkedinIn />
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
          <FaWhatsapp />
        </a>
      </div>

      <div className="mt-4 text-gray-700 text-sm space-y-1">
        <p>Phone: <a href="tel:+92377826576" className="hover:text-gray-900">+92 3000-000000</a></p>
        <p>Email: <a href="mailto:contact@zevylabas.com" className="hover:text-gray-900">contact@zevylabas.com</a></p>
      </div>
    </div>
  );
}

export default Newsletter;
