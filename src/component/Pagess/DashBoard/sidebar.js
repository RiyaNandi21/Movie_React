// // import React from "react";
// // import "./sidebar.css"; 

// // export default function Sidebar({ activeTab, setActiveTab }) {
// //   return (
// //     <div className="sidebar">
// //       <h3>Menu</h3>
// //       <button
// //         className={activeTab === "dashboard" ? "active" : ""}
// //         onClick={() => setActiveTab("dashboard")}
// //       >
// //         Dashboard
// //       </button>
// //       <button
// //         className={activeTab === "profile" ? "active" : ""}
// //         onClick={() => setActiveTab("profile")}
// //       >
// //         Profile Details
// //       </button>
// //       <button
// //         className={activeTab === "ChangePassword" ? "active" : ""}
// //         onClick={() => setActiveTab("ChangePassword")}
// //       >
// //         Change Password
// //       </button>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import "./sidebar.css";

// export default function Sidebar({ activeTab, setActiveTab }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = (tab) => {
//     setActiveTab(tab);
//     setIsOpen(false); // close sidebar on small screen after clicking
//   };

//   return (
//     <>
      
//       <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
//         ☰
//       </button>

//       <div className={`sidebar ${isOpen ? "open" : ""}`}>
//         }<br></br>
//         <br>
//         </br>
//         <br></br>
//         <button
//           className={activeTab === "dashboard" ? "active" : ""}
//           onClick={() => handleClick("dashboard")}
//         >
//           Dashboard
//         </button>
//         <button
//           className={activeTab === "profile" ? "active" : ""}
//           onClick={() => handleClick("profile")}
//         >
//           Profile Details
//         </button>
//         <button
//           className={activeTab === "ChangePassword" ? "active" : ""}
//           onClick={() => handleClick("ChangePassword")}
//         >
//           Change Password
//         </button>
//       </div>
//     </>
//   );
// }
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
