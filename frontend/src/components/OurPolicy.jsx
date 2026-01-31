import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function OurPolicy() {
  return (
    <div className="my-20 px-4 sm:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

        {/* Exchange Policy */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
          <img
            src={assets.return_product_icon}
            alt="Exchange Policy"
            className="w-14 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">
            Easy Exchange
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Hassle-free exchange policy within 7 days of purchase for a smooth
            shopping experience.
          </p>
        </div>

        {/* Quality Policy */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
          <img
            src={assets.quality_policy_icon}
            alt="Quality Assurance"
            className="w-14 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">
            Premium Quality
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Every product is carefully checked to ensure top-notch quality and
            durability.
          </p>
        </div>

        {/* Support Policy */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
          <img
            src={assets.support_img}
            alt="Customer Support"
            className="w-14 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">
            24/7 Support
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Our support team is always available to help you anytime, anywhere.
          </p>
        </div>

      </div>
    </div>
  );
}

export default OurPolicy;
