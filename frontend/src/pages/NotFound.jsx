import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1
        className="text-[60px] md:text-[80px] font-bold text-black leading-none mb-4"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        404
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        The page you are looking for doesn't exist or has been moved.
      </p>
    </div>
  );
}
