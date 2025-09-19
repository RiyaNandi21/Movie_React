
import React, { useState } from "react";
import "./DashBoard.css";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./Footer";
import GoToTop from "../../GoToTop";
import Dash from "../../Task2/Dash";

import ProfilePage from "../Page/ProfilePage";
import ChangePassword from "../Page/ChangePassword";
import AddMoviePage from "../Page/AddMoviePage";
// import MovieDetails from "./components/Pagess/MovieDetails";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dash");

 const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} 
      isOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      
      <div className="main">
        <Header toggleSidebar={toggleSidebar} />
        <div className="content">
          {activeTab === "dash" && <Dash />}
          {activeTab === "profile" && <ProfilePage />}
          {activeTab === "ChangePassword" && <ChangePassword />}
          {activeTab === "AddMoviePage" && <AddMoviePage />}
          

        </div>
        <GoToTop />
        <Footer />
      </div>
    </div>
  );
}

