import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found, please Signup first !!");
      return;
    }
    if (email !== storedUser.email || password !== storedUser.password) {
      setError("Invalid email or password");
      return;
    }
    setError("");
    alert(`welcome, ${storedUser.firstName}`);
    navigate("/Dashboard");
  };

  return (
    <div className="container login-box">
      <h2> Login</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Email: </label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="form-row">
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>

      <p>
        Dont have an account?{" "}
        <Link to="/signup" className="switch-btn login-switch">
          Create Account
        </Link>
      </p>
    </div>
  );
}
