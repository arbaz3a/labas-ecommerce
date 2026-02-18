import React, { useState } from "react";
import AddressForm from "../components/AddressForm";
import { FiEdit2 } from "react-icons/fi";

function ProfilePage() {
  const [showAddressForm, setShowAddressForm] = useState(false);

  return (
    <div className="px-6 py-10">
      <h2 className="text-lg font-medium mb-8">Profile</h2>
      {/* profile card*/}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-black">Name</span>
            <FiEdit2
              className="cursor-pointer text-xs text-gray-500"
              size={12}
            />
          </div>
          <p className="mt-2 text-xs text-gray-900">Unknown User</p>
        </div>

        <div>
          <p className="text-sm text-black">Email</p>
          <p className="mt-2 text-xs text-gray-900">unknownbyte1@gmail.com</p>
        </div>
      </div>

      {/* address card*/}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-sm">Addresses</h3>

          <button
            onClick={() => setShowAddressForm(true)}
            className="text-xs font-medium hover:underline"
          >
            + Add
          </button>
        </div>

        {/* address grid */}
        <div className="grid md:grid-cols-2 gap-10 text-sm text-gray-900">
          <div className="relative">
            <FiEdit2
              className="absolute -right-6 top-0 text-gray-600 cursor-pointer"
              size={12}
            />

            <p className="text-xs">nothing nothing</p>
            <p className="text-xs">work</p>
            <p className="text-xs">lahore</p>
            <p className="text-xs">Lahore 54000</p>
            <p className="text-xs">Pakistan</p>
            <p className="text-xs">+923000000000</p>
          </div>

          {/* second address */}
          <div className="relative">
            <FiEdit2
              className="absolute -right-6 top-0 text-gray-600 cursor-pointer"
              size={12}
            />

            <p className="text-sm">nothing nothing</p>
            <p className="text-sm">work</p>
            <p className="text-sm">lahore</p>
            <p className="text-sm">Lahore 444 54000</p>
            <p className="text-sm">Pakistan</p>
          </div>
        </div>
      </div>

      {/* address modlel */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg relative">
            <button
              onClick={() => setShowAddressForm(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-6">Add address</h2>

            <AddressForm />

            <button className="w-full mt-6 bg-black text-white py-3 rounded-md">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
