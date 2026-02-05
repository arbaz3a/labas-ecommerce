import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";

function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-9 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-12 pb-12 border-b border-gray-200">

          {/* Brand Logo + Description */}
          <div className="flex flex-col">
            <img src={assets.logo} alt="site_logo" className="w-36 mb-5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium products to inspire your style and elevate your everyday look. Explore curated collections of clothing, shoes, and watches, crafted with quality and timeless elegance. Enjoy a shopping experience blending sophistication with modern trends and a touch of luxury.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-gray-900 transition">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-900 transition">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-900 transition">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Customer Care</h3>
            <ul className="space-y-3">
              <li className="hover:text-gray-900 transition cursor-pointer">FAQ</li>
              <li className="hover:text-gray-900 transition cursor-pointer">Returns</li>
              <li className="hover:text-gray-900 transition cursor-pointer">Shipping</li>
              <li className="hover:text-gray-900 transition cursor-pointer">Support</li>
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <Newsletter />
          </div>
        </div>

        {/* Copy Right Section */}
        <div className="pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ZevyLabas
        </div>
      </div>
    </footer>
  );
}

export default Footer;
