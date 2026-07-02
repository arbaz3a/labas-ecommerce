import React from "react";
import { Link } from "react-router-dom";
import Newsletter from "./NewsLetter";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black border-t border-gray-100 mt-17">
      <div className="page-wrapper pt-16 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-bold tracking-[0.3em] mb-5">
              LABAS
            </h2>
            <p className="text-[13px] leading-relaxed text-gray-500 max-w-xs">
              Crafted with passion, designed for the modern individual. Premium
              Pakistani fashion for those who demand timeless elegance.
            </p>
          </div>
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-6 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {[
                { label: "Home", to: "/" },
                { label: "Shop", to: "/shop" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-gray-500 hover:text-black transition-colors duration-200 relative group inline-block"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-6 text-gray-900">
              Customer Care
            </h3>
            <ul className="space-y-3.5">
              {["Exchange Policy", "Privacy Policy", "Terms of Service", "FAQ"].map((item) => (
                <li key={item}>
                  <span className="text-[13px] text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer relative group inline-block">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Newsletter />
        </div>
      </div>
      <div className="border-t border-gray-50">
        <div className="page-wrapper py-5">
          <p className="text-center text-[11px] text-gray-400 tracking-wider">
            © {currentYear} LABAS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
