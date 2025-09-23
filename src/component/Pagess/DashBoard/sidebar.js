import React from "react";
import "./sidebar.css";

export default function Sidebar({ activeTab, setActiveTab, isOpen, closeSidebar }) {
  const handleClick = (tab) => {
    setActiveTab(tab);
     closeSidebar(); 
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* <h3>Menu</h3> */}
      <br>
      </br>
      <br></br>
      <br></br>
      <button
        className={activeTab === "dash" ? "active" : ""}
        onClick={() => handleClick("dash")}
      >
        Dashboard
      </button>
      <button
        className={activeTab === "profile" ? "active" : ""}
        onClick={() => handleClick("profile")}
      >
        Profile Details
      </button>
      <button
        className={activeTab === "ChangePassword" ? "active" : ""}
        onClick={() => handleClick("ChangePassword")}
      >
        Change Password
      </button>
      <button
        className={activeTab === "AddMoviePage" ? "active" : ""}
        onClick={() => handleClick("AddMoviePage")}
      >
        Add Movie
      </button>
    </div>
  );
}
