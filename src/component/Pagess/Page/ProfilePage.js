import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "../../../api/auth";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    bio: "",
    avatar: "/blank.jpg",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedData = { ...userData };

      const response = await updateProfile(updatedData, token);

      localStorage.setItem("userData", JSON.stringify(response.data || updatedData));
      setUserData(response.data || updatedData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err.response || err);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h2>Profile Details</h2>

      <div className="upload-section">
        <img src={userData.avatar || "/blank.jpg"} alt="Profile" className="profile-image" />
        {isEditing && <input type="file" accept="image/*" onChange={handleFileChange} />}
      </div>

      <div className="profile-form">
        <label>Name:</label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} disabled={!isEditing} />

        <label>Phone:</label>
        <input type="text" name="phone" value={userData.phone} onChange={handleChange} disabled={!isEditing} />

        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={userData.dateOfBirth ? userData.dateOfBirth.split("T")[0] : ""} onChange={handleChange} disabled={!isEditing} />

        <label>Bio:</label>
        <textarea name="bio" value={userData.bio} onChange={handleChange} disabled={!isEditing}></textarea>

        <div className="buttons">
          {isEditing ? (
            <button onClick={handleSave}>{isLoading ? "Saving..." : "Save"}</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}


