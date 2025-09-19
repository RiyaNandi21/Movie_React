import axios from "axios";
import { API } from "./index";

export const register = async (details) => {
  try {
    const response = await axios.post(`${API}/auth/register`, details, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response ?.data || error.message);
    throw error;
  }
};


export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API}/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


export const updateProfile= async (updatedData,token)=>{
    try{
     const response=await axios.put(`${API}/auth/profile`,updatedData,{
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
     });
     return response.data;
    }
    catch (error){
        console.error("Update profile error:",error.response?.data || error.message);
        throw error;
    }
}

export const ChangePassword = async (data, token) => {
     try{
        const response=await axios.put(`${API}/auth/changepassword`,data,{
         headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
         }
        });
        return response.data;
     }
     catch(error){
        console.error("Change Password error:",error.response?.data || error.message);
        throw error;
     }
}

export const logout= async (token) => {
  try{
    const response=await axios.post(`${API}/auth/logout`,{},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    }
    catch(error){
      console.error("Logout failed :",error.response || error.message);
  }
  finally{
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    // localStorage.removeItem("userId");
  }
};
