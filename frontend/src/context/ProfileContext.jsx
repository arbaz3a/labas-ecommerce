import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "unknownbyte1@gmail.com",
  });

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "unknownbyte1@gmail.com",
  });

  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");

  return (
    <ProfileContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
