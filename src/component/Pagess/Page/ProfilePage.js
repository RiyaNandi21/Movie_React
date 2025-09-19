// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./ProfilePage.css";

// export default function ProfilePage() {
//   const [isLoading,setIsLoading]=useState(true);
//   const [userData, setUserData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const storedData = localStorage.getItem("userData");
//     if (storedData) {
//       setUserData(JSON.parse(storedData));
//     }
//     setTimeout(() =>{
//       setIsLoading(false);
//     },3000);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     const newAddress = { ...userData.addresses[0], [name]: value };
//     setUserData((prevData) => ({
//       ...prevData,
//       addresses: [newAddress],
//     }));
//   };

//   const handleSave = async () => {
//     setError("");
//     setIsLoading(true);
//     try {
//       const updatedUserData = {
//         ...userData,
//         addresses: [
//           {
//             addressLine: userData.addresses[0].addressLine,
//             city: userData.addresses[0].city,
//             state: userData.addresses[0].state,
//             zipcode: userData.addresses[0].zipcode,
//             country: userData.addresses[0].country,
//           },
//         ],
//       };

//       const response = await axios.put(
//         "https://amalgamateauthenticationapi.azurewebsites.net/api/Account/update-user",
//         updatedUserData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setIsEditing(false);
//         alert("Profile updated successfully!");
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err.response || err);
//       setError(err.response?.data?.error || "Failed to update profile.");
//     }finally{
//       setIsLoading(false);
//     }
//   };

//   return (

//     <div className="profile-page">
//       <h2>Profile Details</h2>
//       <div className="profile-form">
//         <label>First Name:</label>
//         <input
//           type="text"
//           name="firstName"
//           value={userData.firstName || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Middle Name:</label>
//         <input
//           type="text"
//           name="middleName"
//           value={userData.middleName || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Last Name:</label>
//         <input
//           type="text"
//           name="lastName"
//           value={userData.lastName || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           value={userData.username || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Date of Birth:</label>
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={
//             userData.dateOfBirth ? userData.dateOfBirth.split("T")[0] : ""
//           }
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Gender:</label>
//         <select
//           name="gender"
//           value={userData.gender || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Address Line:</label>
//         <input
//           type="text"
//           name="addressLine"
//           value={userData.addresses?.[0]?.addressLine || ""}
//           onChange={handleAddressChange}
//           disabled={!isEditing}
//         />

//         <label>City:</label>
//         <input
//           type="text"
//           name="city"
//           value={userData.addresses?.[0]?.city || ""}
//           onChange={handleAddressChange}
//           disabled={!isEditing}
//         />

//         <label>State:</label>
//         <input
//           type="text"
//           name="state"
//           value={userData.addresses?.[0]?.state || ""}
//           onChange={handleAddressChange}
//           disabled={!isEditing}
//         />

//         <label>Zipcode:</label>
//         <input
//           type="text"
//           name="zipcode"
//           value={userData.addresses?.[0]?.zipcode || ""}
//           onChange={handleAddressChange}
//           disabled={!isEditing}
//         />

//         <label>Country:</label>
//         <input
//           type="text"
//           name="country"
//           value={userData.addresses?.[0]?.country || ""}
//           onChange={handleAddressChange}
//           disabled={!isEditing}
//         />

//         {error && <p className="error">{error}</p>}

//         <div className="buttons">
//           {isEditing ? (
//             <button type="button" onClick={handleSave} disabled={isLoading}>
//              {isLoading ? "Saving..." : "Save"}
//             </button>
//           ) : (
//             <button type="button" onClick={() => setIsEditing(true)}>
//               Edit
//             </button>
//           )}
//         </div>
//       </div>
//     </div>

//   );
// }
// 
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { updateProfile } from "../../../api/auth";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ProfilePage.css";

// export default function ProfilePage() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [userData, setUserData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [profileImage, setProfileImage] = useState("/blank.jpg");

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");

//   console.log("selectedCountry ---- ", selectedCountry);
//   console.log("selectedState ----", selectedState);
//   console.log("selectedCity ---", selectedCity);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const storedData = localStorage.getItem("userData");
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setUserData(parsedData);
//       setProfileImage(parsedData.photos || "/blank.jpg");

//       const addr = parsedData.addresses?.[0];
//       console.log("addr value", addr);
//       if (addr) {
//         setSelectedCountry(addr.country || "");
//         setSelectedState(addr.state || "");
//         setSelectedCity(addr.city || "");
//       }
//     }
//     setTimeout(() => setIsLoading(false), 1000);
//   }, []);

//   useEffect(() => {
//     axios
//       .post(
//         "https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-all-countries"
//       )
//       .then((res) => {
//         setCountries(res.data);
//         console.log("res from country api -- ", res);
//       })
//       .catch((err) => toast.error("Failed to load countries"));
//   }, []);

//   useEffect(() => {
//     if (!selectedCountry) return;     
//     setStates([]);
//     // setSelectedState("");
//     setCities([]);
//     // setSelectedCity("");

//     axios
//       .get(
//         `https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-state?countryName=${selectedCountry}`
//       )
//       .then((res) => setStates(res.data.state || []))
//       .catch((err) => toast.error("Failed to load states"));
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (!selectedCountry || !selectedState) return;
//     // setCities([]);
//     // setSelectedCity("");

//     axios
//       .post(
//         "https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-cities-in-a-state",
//         {
//           country: selectedCountry,
//           state: selectedState,
//         }
//       )
//       .then((res) => setCities(res.data.cities || []))
//       .catch((err) => console.error("Cities fetch error:", err));
//   }, [selectedState]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddressChange = (name, value) => {
//     const newAddress = { ...userData.addresses?.[0], [name]: value };
//     setUserData((prev) => ({
//       ...prev,
//       addresses: [newAddress],
//     }));
//   };

//   const handleSave = async () => {
//     setError("");
//     setIsLoading(true);
//     try {
//       const updatedUserData = {
//         ...userData,
//         addresses: [
//           {
//             addressLine: userData.addresses?.[0]?.addressLine || "",
//             city: selectedCity,
//             state: selectedState,
//             zipcode: userData.addresses?.[0]?.zipcode || "",
//             country: selectedCountry,
//           },
//         ],
//         photos: userData.photos && userData.photos.startsWith("http")
//     ? userData.photos
//     : "",
//       };


//       const response = await updateProfile(updatedUserData,token);

//       if (response.status === 200) {
//         setIsEditing(false);
//         toast.success("Profile updated successfully!");
//         localStorage.setItem("userData", JSON.stringify(response));
//         setUserData(response);
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err.response || err);
//       setError(err.response?.data?.error || "Failed to update profile.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       toast.error("Please select a file first!");
//       return;
//     }
//     if (!selectedFile.type.startsWith("image/")) {
//       toast.error("Only image files are allowed.");
//       return;
//     }

//     if (selectedFile.size > 5 * 1024 * 1024) {
//       toast.error("File size should be less than 5MB.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(selectedFile);
//     reader.onloadend = async () => {
//       const base64Image = reader.result.split(",")[1];
//       console.log("base64image ---- ", base64Image);

//       try {
//         const response = await axios.post(
//           "https://amalgamateauthenticationapi.azurewebsites.net/api/Upload/user-profile-image",
//           {
//             userId: userData.userId,
//             base64Image: base64Image,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200 || response.status === 201) {
//           toast.success("Profile image uploaded successfully!");
//           // const imageUrl=response.data.imageUrl;
//           const updatedUserData = {
//             ...userData,
//             // photos: imageUrl,
//             photos:reader.result,
//           };
//           setUserData(updatedUserData);
//           // setProfileImage(imageUrl);
//           setProfileImage(reader.result);
//           localStorage.setItem("userData", JSON.stringify(updatedUserData));
//         }
//       } catch (error) {
//         console.error("Upload failed:", error);
//         toast.error("Failed to upload image.");
//       }
//     };
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const address = userData.addresses?.[0] || {};

//   return (
//     <div className="profile-page">
//       <h2>Profile Details</h2>

//       <div className="upload-section">
//         <img
//           src={profileImage || "/blank.jpg"}
//           alt="Profile"
//           className="profile-image"
//         />
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <button onClick={handleUpload}>Upload Picture</button>
//       </div>

//       <div className="profile-form">
//         <label>First Name:</label>
//         <input
//           type="text"
//           name="firstName"
//           value={userData.firstName || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Middle Name:</label>
//         <input
//           type="text"
//           name="middleName"
//           value={userData.middleName || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Last Name:</label>
//         <input
//           type="text"
//           name="lastName"
//           value={userData.lastName || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           value={userData.username || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Date of Birth:</label>
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={userData.dateOfBirth ? userData.dateOfBirth.split("T")[0] : ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />

//         <label>Gender:</label>
//         <select
//           name="gender"
//           value={userData.gender || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Address Line:</label>
//         <input
//           type="text"
//           name="addressLine"
//           value={address.addressLine || ""}
//           onChange={(e) => handleAddressChange("addressLine", e.target.value)}
//           disabled={!isEditing}
//         />

//         <label>Country:</label>
//         <select
//           value={selectedCountry}
//           onChange={(e) => setSelectedCountry(e.target.value)}
//           disabled={!isEditing}
//         >
//           <option value="">Select Country</option>
//           {countries.map((c) => (
//             <option key={c.value} value={c.value}>
//               {c.label}
//             </option>
//           ))}
//         </select>

//         <label>State:</label>
//         <select
//           value={selectedState}
//           onChange={(e) => setSelectedState(e.target.value)}
//           disabled={!isEditing || !states.length}
//         >
//           <option value="">Select State</option>
//           {states.map((s) => (
//             <option key={s.value} value={s.value}>
//               {s.label}
//             </option>
//           ))}
//         </select>

//         <label>City:</label>
//         <select
//           value={selectedCity}
//           onChange={(e) => setSelectedCity(e.target.value)}
//           disabled={!isEditing || !cities.length}
//         >
//           <option value="">Select City</option>
//           {cities.map((c) => (
//             <option key={c.value} value={c.value}>
//               {c.label}
//             </option>
//           ))}
//         </select>

//         <label>Zipcode:</label>
//         <input
//           type="text"
//           name="zipcode"
//           value={address.zipcode || ""}
//           onChange={(e) => handleAddressChange("zipcode", e.target.value)}
//           disabled={!isEditing}
//         />

//         {error && <p className="error">{error}</p>}

//         <div className="buttons">
//           {isEditing ? (
//             <button type="button" onClick={handleSave} disabled={isLoading}>
//               {isLoading ? "Saving..." : "Save"}
//             </button>
//           ) : (
//             <button type="button" onClick={() => setIsEditing(true)}>
//               Edit
//             </button>
//           )}
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }


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


