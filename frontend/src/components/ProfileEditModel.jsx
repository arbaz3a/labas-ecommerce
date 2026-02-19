import React from "react";

function ProfileEditModal({
  profileForm,
  handleProfileChange,
  saveProfile,
  setShowProfileEdit,
  emailError,
  setEmailError,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-sm font-semibold mb-4">Edit Profile</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={profileForm.firstName}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={profileForm.lastName}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={profileForm.email}
              onChange={(e) => {
                handleProfileChange(e);
                if (setEmailError) setEmailError("");
              }}
              className={`w-full px-3 py-2 text-xs rounded-md border ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {emailError && (
              <p className="text-[11px] text-red-500 mt-1">{emailError}</p>
            )}

            <p className="text-[11px] text-gray-500 mt-1">
              This email is used for sign-in and order updates.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 text-xs mt-4">
          <button
            className="cursor-pointer"
            onClick={() => setShowProfileEdit(false)}
          >
            Cancel
          </button>
          <button
            onClick={saveProfile}
            className="bg-black text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditModal;
