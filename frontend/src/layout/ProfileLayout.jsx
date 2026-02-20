import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import { ProfileProvider } from "../context/ProfileContext";
import PopupMessage from "../components/PopupMessage";

function ProfileLayout({ children }) {
  return (
    <ProfileProvider>
      <div className="flex flex-col">
        <ProfileHeader />
        <div className="flex-1 flex flex-col">{children}</div>
        <div className="mt-3">
          <PopupMessage />
        </div>
      </div>
    </ProfileProvider>
  );
}

export default ProfileLayout;
