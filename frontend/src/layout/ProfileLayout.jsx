import React from "react";
import ProfileHeader from "../components/ProfileHeader";

function ProfileLayout({ children }) {
  return (
    <div className="bg-[#f6f6f6] flex flex-col">
      <ProfileHeader />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export default ProfileLayout;
