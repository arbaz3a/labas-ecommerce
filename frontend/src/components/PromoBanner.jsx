import React from "react";

export default function PromoBanner() {
    return (
        <div className="overflow-hidden py-3 bg-gray-50 border-y border-gray-200">
            <div className="animate-marquee flex items-center gap-12 whitespace-nowrap w-max">
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="flex items-center gap-12">
                        <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-light text-gray-500">
                            Free Shipping on Orders Over Rs. 3,000
                        </span>
                        <span className="text-gray-300">✦</span>
                        <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-light text-gray-500">
                            Premium Quality Guaranteed
                        </span>
                        <span className="text-gray-300">✦</span>
                        <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-light text-gray-500">
                            Easy Returns Within 7 Days
                        </span>
                        <span className="text-gray-300">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
