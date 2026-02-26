import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function OurPolicy() {
  return (
    <div className="page-wrapper py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-8 rounded-xl text-center bg-gray-50 border border-gray-100">
          <img src={assets.return_product_icon} alt="Exchange Policy" className="w-12 mx-auto mb-4 opacity-60" />
          <h3 className="text-lg font-semibold text-black">Easy Exchange</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Hassle-free exchange policy within 7 days of purchase.
          </p>
        </div>

        <div className="p-8 rounded-xl text-center bg-gray-50 border border-gray-100">
          <img src={assets.quality_policy_icon} alt="Quality" className="w-12 mx-auto mb-4 opacity-60" />
          <h3 className="text-lg font-semibold text-black">Premium Quality</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Every product is carefully checked for top-notch quality.
          </p>
        </div>

        <div className="p-8 rounded-xl text-center bg-gray-50 border border-gray-100">
          <img src={assets.support_img} alt="Support" className="w-12 mx-auto mb-4 opacity-60" />
          <h3 className="text-lg font-semibold text-black">24/7 Support</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Our support team is always available to help you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;
