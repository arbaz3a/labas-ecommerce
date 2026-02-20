import React from "react";

function Settings() {
  return (
    <div className="py-8 md:py-10 px-4 sm:px-6 md:px-10">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 md:mb-8">
        Settings
      </h2>

      <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-medium mb-2 text-base sm:text-lg">
              Logout your account
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Log out of your account securely from this device.
            </p>
          </div>
          <button className="w-full sm:w-auto px-2 py-2 rounded-md border cursor-pointer border-black text-xs font-medium hover:bg-black hover:text-white transition-all duration-200">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
