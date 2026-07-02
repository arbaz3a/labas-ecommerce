import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div>
      <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5 text-gray-900">
        Newsletter
      </h3>
      <p className="text-[13px] mb-5 text-gray-500 leading-relaxed">
        Subscribe to get the latest updates and offers.
      </p>

      <form onSubmit={handleSubmit} className="relative w-full max-w-xs mb-6">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full py-2.5 pr-10 bg-transparent text-[13px] outline-none transition border-b border-gray-200 text-black focus:border-black placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors cursor-pointer"
          aria-label="Subscribe"
        >
          <FiSend className="w-4 h-4" />
        </button>
      </form>

      <div className="flex items-center gap-3">
        {[
          { icon: FaFacebookF, href: "https://facebook.com" },
          { icon: FaTwitter, href: "https://twitter.com" },
          { icon: FaInstagram, href: "https://instagram.com" },
          { icon: FaLinkedinIn, href: "https://linkedin.com" },
          { icon: FaWhatsapp, href: "https://wa.me/1234567890" },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all"
          >
            <Icon className="w-3.5 h-3.5" />
          </a>
        ))}
      </div>

      <div className="mt-6 text-[12px] space-y-1.5 text-gray-500">
        <p>
          <a
            href="tel:+923000000000"
            className="hover:text-black transition-colors duration-200"
          >
            +92 3000-000000
          </a>
        </p>
        <p>
          <a
            href="mailto:labasapparel@gmail.com"
            className="hover:text-black transition-colors duration-200"
          >
            labasapparel@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default Newsletter;
