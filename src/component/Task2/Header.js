import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ user, setSearchTerm }) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = () => {
    setSearchTerm(input);
  };

  return (
    <header
      style={{
        position:"fixed",
        top:0,
        width:"100%",
        background: "#6d97caff",
      //  padding: "10px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex:1000
      }}
    >
      <h2 style={{ flex: 1 }}>
        Welcome, {user?.firstName} {user?.lastName}
      </h2>

      <div style={{ flex: 2, textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search books..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "8px",
            width: "60%",
            borderRadius: "5px",
            border: "none",
            maxWidth: "300px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 15px",
            marginLeft: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "white",
            color: "#6d97caff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <div style={{ flex: 1, textAlign: "right" }}>
        <button
          onClick={handleLogout}
          style={{
            background: "white",
            color: "#6d97caff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
