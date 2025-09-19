
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./loginForm.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; 

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading]=useState(false);
//   const [showPassword, setShowPassword] = useState(false); 
//   const [showNewPassword, setShowNewPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

 
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) {
//       setError("Email is required.");
//       return;
//     }
//     if (!emailPattern.test(email.trim())) {
//       setError("Please enter a valid email address.");
//       setIsLoading(false);
//       return;
//     }

//     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
//     if (!password.trim()) {
//       setError("Password is required.");
//       setIsLoading(false);
//       return;
//     }
//     if (!passwordPattern.test(password.trim())) {
//       setError("Password must be at least 8 characters, include one uppercase, one lowercase, and one special character.");
//      setIsLoading(false);
//       return;
//     }

//     setError("");

//     try {
//       const response = await axios.post(
//         "https://amalgamateauthenticationapi.azurewebsites.net/api/Account/signin",
//         {
//           email: email.trim(),
//           password: password.trim(),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response?.status === 200) {
//         localStorage.setItem("token", response.data.token); 
//          toast.success("Login Successful");
        
//         navigate("/DashBoard"); 
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-row">
//           <label>Email:</label>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="form-row">
//           <label>Password:</label>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {error && <p className="error">{error}</p>}

//         <button type="submit">LOGIN</button>
//       </form>

//       <div className="signup-section">
//         <p>Don't have an account?</p>
//         <button onClick={() => navigate("/Signup")} className="signup-btn">
//           Signup
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/auth";
import "./loginForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email is required.");
      setIsLoading(false);
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!password.trim()) {
      setError("Password is required.");
      setIsLoading(false);
      return;
    }
    if (!passwordPattern.test(password.trim())) {
      setError("Password must be at least 8 characters, include one uppercase, one lowercase, and one special character.");
      setIsLoading(false);
      return;
    }

    setError("");
    
    try {
      const credentials = {
        email: email.trim(),
        password: password.trim()
      };

      const response = await login(credentials);

      if (response.success) {
        localStorage.setItem("token", response.token); 
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("userData", JSON.stringify(response.data)); 
        toast.success("Login Successful!");
        setIsLoading(false);
        navigate("/dashBoard"); 
      }
      else {
        setError(response.message || "Login failed.");
        toast.error(response.message || "Login failed.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("login error :--",err.response || err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-row">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-row password-field">
          <label>Password:</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "LOGIN"}
        </button>
      </form>

      <div className="signup-section">
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/Signup")} className="signup-btn">
          Signup
        </button>
      </div>
</div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
