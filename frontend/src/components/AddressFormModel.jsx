import React from "react";
import AddressForm from "../components/AddressForm";

function AddressFormModal({
  formData,
  handleChange,
  errors,
  setShowAddressModal,
  saveAddress,
  deleteAddress,
  editingIndex,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg relative mx-2 sm:mx-0">
        {/* Modal title */}
        <h2 className="text-sm font-semibold mb-4 text-center">
          {editingIndex !== null ? "Edit Address" : "Add Address"}
        </h2>

        {/* Form */}
        <AddressForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6 text-xs">
          {editingIndex !== null ? (
            <button
              onClick={deleteAddress}
              className="text-red-500 hover:underline cursor-pointer"
            >
              Delete
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-3">
            <button
              className="cursor-pointer"
              onClick={() => setShowAddressModal(false)}
            >
              Cancel
            </button>

            <button
              onClick={saveAddress}
              className="bg-black text-white px-6 py-2 rounded-md cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressFormModal;
