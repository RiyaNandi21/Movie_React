 import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (!firstName || !lastName || !email || !address || !password || !confirm) {
      setError("All fields are required");
      return;
    }

   const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(firstName)) {
      setError("First name can contain only letters");
      return;
    }

    if (!namePattern.test(lastName)) {
      setError("Last name can contain only letters");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    
    const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if(!passwordPattern.test(password)){
      setError("Please enter a strong password");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const userData = { firstName, lastName, email, address, password };
    localStorage.setItem("user", JSON.stringify(userData));

    
    navigate("/login");
  };

  return (
    <div className="container signup-box">
      <h2>Sign Up</h2>
      <br />

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label>First Name: </label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Last Name: </label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Email: </label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Address: </label>
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Confirm Password: </label>
          <input
            type="password"
            placeholder="Re-enter Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      {}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Already a user?{" "}
        <Link to="/login" className="switch-btn signup-switch">
          Login
        </Link>
      </p>
    </div>
  );
}
