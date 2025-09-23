
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

import "./First.css";
import { register } from "../../../api/auth";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm,setConfirm]=useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bio, setBio] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !name || !password || !confirm || !phone || !dateOfBirth ||!bio) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email.");
      setIsLoading(false);
      return;
    }

    setError("");
    try {
      const details={
        name,
        email,
        password,
        role:"user",
        phone,
        dateOfBirth,
        bio
      };
      const response = await register(details);

      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId",response.data._id);
        localStorage.setItem("userData",JSON.stringify(response.data));
        toast.success("Signup Successful!");
        setIsLoading(false); 
        navigate("/dashboard");
      }
      else {
        setError(response.message || "Signup failed.");
        toast.error(response.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err.response || err);
      setError(err.response?.data?.message || "Failed to submit. Please try again.");
      toast.error(err.response?.data?.message || "Failed to submit. Please try again."); 
      setIsLoading(false);
    }
  };

  return (
    <div>
    <div className="first-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-icon" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

       
        <div className="password-wrapper">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <span className="toggle-icon" onClick={() => setShowConfirm((prev) => !prev)}>
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
         <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}</button>
      </form>
      <br></br>
       <div className="login-link">
           Already registered?   <Link to="/">    Login</Link>
      </div>
    </div>
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
</div>
    );
}
