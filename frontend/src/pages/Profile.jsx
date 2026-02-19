import React, { useContext } from "react";
import { FiEdit2 } from "react-icons/fi";
import ProfileEditModal from "../components/ProfileEditModel";
import VerifyEmailModal from "../components/VerifyEmailModal";
import AddressFormModal from "../components/AddressFormModel";
import { ProfileContext } from "../context/ProfileContext";

function Profile() {
  const {
    profile,
    setProfile,
    showVerifyModal,
    setShowVerifyModal,
    verificationCode,
    setVerificationCode,
    pendingEmail,
    setPendingEmail,
    showProfileEdit,
    setShowProfileEdit,
    profileForm,
    setProfileForm,
    addresses,
    setAddresses,
    showAddressModal,
    setShowAddressModal,
    editingIndex,
    setEditingIndex,
    formData,
    setFormData,
    errors,
    setErrors,
    emailError,
    setEmailError,
  } = useContext(ProfileContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    let newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "phone",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAddress = () => {
    if (!validateAddress()) return;

    if (editingIndex !== null) {
      const updated = [...addresses];
      updated[editingIndex] = formData;
      setAddresses(updated);
    } else {
      setAddresses([...addresses, formData]);
    }

    setShowAddressModal(false);
    setFormData({});
    setEditingIndex(null);
  };

  const editAddress = (index) => {
    setFormData(addresses[index]);
    setEditingIndex(index);
    setShowAddressModal(true);
  };

  const deleteAddress = () => {
    if (editingIndex === null) return;
    const updated = addresses.filter((_, index) => index !== editingIndex);
    setAddresses(updated);
    setShowAddressModal(false);
    setEditingIndex(null);
    setFormData({});
  };

  const saveProfile = () => {
    const trimmedEmail = profileForm.email?.trim();

    if (!trimmedEmail) {
      setEmailError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");

    if (trimmedEmail !== profile.email) {
      setPendingEmail(trimmedEmail);
      setShowVerifyModal(true);
      return;
    }

    setProfile({
      ...profile,
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
    });

    setShowProfileEdit(false);
  };

  const confirmEmailChange = () => {
    setProfile({
      ...profile,
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      email: pendingEmail,
    });
    setShowVerifyModal(false);
    setShowProfileEdit(false);
  };

  return (
    <div className="px-6 py-10 relative">
      <h2 className="text-lg font-medium mb-8">Profile</h2>

      <div className="bg-white rounded-xl p-5 mb-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-black">Name</span>
            <FiEdit2
              onClick={() => {
                setProfileForm({
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  email: profile.email,
                });
                setShowProfileEdit(true);
              }}
              className="cursor-pointer text-gray-500"
              size={14}
            />
          </div>
          <p className="mt-2 text-xs text-gray-900">
            {profile.firstName} {profile.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-black">Email</p>
          <p className="mt-2 text-xs text-gray-900">{profile.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="font-semibold text-[13px]">Addresses</h3>
          <button
            onClick={() => {
              setFormData({});
              setEditingIndex(null);
              setShowAddressModal(true);
            }}
            className="text-xs cursor-pointer font-medium hover:underline"
          >
            + Add
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-900">
          {addresses.length === 0 && (
            <p className="text-gray-400 text-xs">No address added yet.</p>
          )}

          {addresses.map((addr, index) => (
            <div key={index} className="relative bg-gray-50 p-3">
              <FiEdit2
                onClick={() => editAddress(index)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                size={13}
              />
              <p>
                {addr.firstName} {addr.lastName}
              </p>
              <p>{addr.address}</p>
              <p>{addr.city}</p>
              <p>{addr.postal}</p>
              <p>{addr.country}</p>
              <p>{addr.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {showVerifyModal ? (
        <VerifyEmailModal
          originalEmail={profile.email}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          confirmEmailChange={confirmEmailChange}
          setShowVerifyModal={setShowVerifyModal}
        />
      ) : (
        showProfileEdit && (
          <ProfileEditModal
            profileForm={profileForm}
            handleProfileChange={handleProfileChange}
            saveProfile={saveProfile}
            setShowProfileEdit={setShowProfileEdit}
            emailError={emailError}
            setEmailError={setEmailError}
          />
        )
      )}

      {showAddressModal && (
        <AddressFormModal
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          setShowAddressModal={setShowAddressModal}
          saveAddress={saveAddress}
          deleteAddress={deleteAddress}
          editingIndex={editingIndex}
        />
      )}
    </div>
  );
}

export default Profile;
