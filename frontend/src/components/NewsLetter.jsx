import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

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
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
        />
        <button
          type="submit"
          className="px-2 py-1 text-sm cursor-pointer rounded-full bg-gray-800 text-white font-semibold hover:bg-black transition transform hover:-translate-y-1"
        >
          Subscribe
        </button>
      </form>

      {/* social icons and links */}
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

      {/* contact info */}
      <div className="mt-4 text-gray-700 text-sm space-y-1">
        <p>Phone: <a href="tel:+92377826576" className="hover:text-gray-900">+92 3000-000000</a></p>
        <p>Email: <a href="mailto:contact@zevylabas.com" className="hover:text-gray-900">contact@zevylabas.com</a></p>
      </div>
    </div>
  );
}

export default Newsletter;
