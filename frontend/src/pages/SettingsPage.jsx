import React from "react";

function SettingsPage() {
  return (
    <div className="py-10 px-6">
      <h2 className="text-2xl font-semibold mb-8">Settings</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
        <div>
          <h3 className="font-medium mb-2">Sign out everywhere</h3>
          <p className="text-sm text-gray-600">
            If you've lost a device or have security concerns, log out
            everywhere to ensure the security of your account.
          </p>
        </div>

        <button className="border px-4 py-2 rounded-md">
          Sign out everywhere
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
