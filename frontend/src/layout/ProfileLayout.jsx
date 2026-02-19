import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import { ProfileProvider } from "../context/ProfileContext";

function ProfileLayout({ children }) {
  return (
    <ProfileProvider>
      <div className="bg-[#f6f6f6] flex flex-col">
        <ProfileHeader />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </ProfileProvider>
  );
}

export default ProfileLayout;
