import { useState } from "react";
import { ChangePassword } from "../../../api/auth";
import "./ChangePassword.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading]=useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  setTimeout(() =>{
    setIsLoading(false);
  },3000);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Both fields are required.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      setIsLoading(false);
      return;
    }

    setError("");
    setMessage("");

     try{
      const response = await ChangePassword({userId,currentPassword,newPassword} , token);
      if (response.status === 200) {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="change-password-container">
        <h2>Change Password</h2>
        <form onSubmit={handleSave}>
          
          <div className="input-group">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="eye-icon">
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

         
          <div className="input-group">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span onClick={() => setShowNewPassword(!showNewPassword)} className="eye-icon">
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
          </div>

          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}

         <button type="submit" onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
             </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
