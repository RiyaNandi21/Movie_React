
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./Next.css";

// export default function Next() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const userId=localStorage.getItem("userId");

//   const prevData = location.state?.userData || {};
//   //const [userId,setuserId]=useState("");
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState(""); 
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [addressLine, setAddressLine] = useState("");
//   const [city, setCity] = useState("");
//   const [stateField, setStateField] = useState("");
//   const [zipcode, setZipcode] = useState("");
//   const [country, setCountry] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
  

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!firstName || !lastName || !username || !dob || !gender || !addressLine || !city || !stateField || !zipcode || !country) {
//       setError("All fields are required.");
//       setIsLoading(true);
//       return;
//     }

//     setError("");

// const dobIso = new Date(dob).toISOString();

//     const userData = {
//       ...prevData,
//       userId:userId,
//       firstName: firstName.trim(),
//       middleName: middleName.trim(),
//       lastName: lastName.trim(),
//       username: username.trim(),
//       // dateOfBirth: dob,
//       dateOfBirth: dobIso,
//       gender: gender,
//       formProgress: "completed",
//       addresses: [
//         {
//           addressLine: addressLine.trim(),
//           city: city.trim(),
//           state: stateField.trim(),
//           zipcode: zipcode.trim(),
//           country: country.trim()
//         }
//       ]
//     };

//     try {
//       const response = await axios.put(
//         "https://amalgamateauthenticationapi.azurewebsites.net/api/Account/update-user",
//         userData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
            
//           }
//         }
//       );

//       if (response.status === 200) {
//         localStorage.setItem("userData", JSON.stringify(userData));
//         toast.success("Signup Successful!");
//         setIsLoading(false); 
//         navigate("/Dashboard");
//       }
//     } catch (err) {
//       console.error("Personal details error:", err.response || err);
//       setError(err.response?.data?.message || "Failed to submit. Please try again.");
//       toast.error(err.response?.data?.message || "Failed to submit. Please try again."); // ✅ Added
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//     <div className="next-container">
//       <h2>Personal Details</h2>
//       <form onSubmit={handleSignup}>
//         <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//         <input type="text" placeholder="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
//         <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//         <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
//         <select value={gender} onChange={(e) => setGender(e.target.value)}>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <input type="text" placeholder="Address Line" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
//         <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
//         <input type="text" placeholder="State" value={stateField} onChange={(e) => setStateField(e.target.value)} />
//         <input type="text" placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
//         <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
//         {error && <p className="error">{error}</p>}
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Signing up..." : "Signup"}</button>
//       </form>
//     </div>
//     <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Next.css";

export default function Next() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [addressLine, setAddressLine] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    axios
      .post("https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-all-countries")
      .then(res => setCountries(res.data))
      .catch(err => toast.error("Failed to load countries"));
  }, []);

  
  useEffect(() => {
    if (!selectedCountry) return;
    setStates([]);
    setSelectedState("");
    setCities([]);
    setSelectedCity("");
    axios
      .get(`https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-state?countryName=${selectedCountry}`)
      .then(res => setStates(res.data.state))
      .catch(err => toast.error("Failed to load states"));
  }, [selectedCountry]);

  
  useEffect(() => {
    if (!selectedCountry || !selectedState) return;
    setCities([]);
    setSelectedCity("");
   axios.post(
  "https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-cities-in-a-state",
  { country: selectedCountry, state: selectedState }
)
 .then(res => setCities(res.data.cities || []))
      .catch(err => console.error("Cities fetch error:", err));
  }, [selectedCountry, selectedState]);


  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !dob || !gender || !addressLine || !selectedCountry || !selectedState || !selectedCity || !zipcode) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setIsLoading(true);

    const dobIso = new Date(dob).toISOString();
    const userData = {
      userId,
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      dateOfBirth: dobIso,
      gender,
      formProgress: "completed",
      addresses: [
        {
          addressLine: addressLine.trim(),
          city: selectedCity,
          state: selectedState,
          zipcode: zipcode.trim(),
          country: selectedCountry
        }
      ]
    };

    try {
      const response = await axios.put(
        "https://amalgamateauthenticationapi.azurewebsites.net/api/Account/update-user",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success("Signup Successful!");
        navigate("/Dashboard");
      }
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.message || "Failed to submit. Please try again.");
      toast.error(err.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="next-container">
      <h2>Personal Details</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input type="text" placeholder="Middle Name" value={middleName} onChange={e => setMiddleName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" placeholder="Address Line" value={addressLine} onChange={e => setAddressLine(e.target.value)} />

        <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>

        <select value={selectedState} onChange={e => setSelectedState(e.target.value)} disabled={!states.length}>
          <option value="">Select State</option>
          {states.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!cities.length}>
          <option value="">Select City</option>
          {cities.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>

        <input type="text" placeholder="Zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />

        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>{isLoading ? "Submitting..." : "Signup"}</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
