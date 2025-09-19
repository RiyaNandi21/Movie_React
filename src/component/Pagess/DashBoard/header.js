import React, { useEffect, useState } from "react";
import "./header.css";
import { logout } from "../../../api/auth";

export default function Header({ toggleSidebar }) {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const name = userData.name || "User";
  const [profileImage, setProfileImage] = useState("/blank.jpg");

  useEffect(() => {
    setProfileImage(userData.avatar || "/blank.jpg");
    const handleStorageChange = () => {
      const updatedData = JSON.parse(localStorage.getItem("userData")) || {};
      setProfileImage(updatedData.avatar || "/blank.jpg");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
   logout();
   window.location.href="/";
  };

  return (
    <div className="header">
      <div className="header-left">
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <img src={profileImage} alt="Profile" className="header-profile-image" />
        <h4>Welcome, {name}!</h4>
      </div>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
