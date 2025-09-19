import { API } from "./index";
import axios from "axios";

export const addMovie = async (movieData, token) => {
    try {
        const response = await axios.post(`${API}/movies`, movieData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Add movie error:", error.response || error.message);
        throw error;
    }
};

export const getMovies = async (params = {}) => {
  try {
    const response = await axios.get(`${API}/movies`, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getMovieById = async (id) => {
  const res = await axios.get(`${API}/movies/${id}`);
  return res.data;
};

export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${API}/movies/top-rated`);
    return response.data;
  } catch (error) {
    console.error("Top Rated error:", error.response?.data || error.message);
    throw error;
  }
};

export const getLatestMovies = async () => {
  try {
    const response = await axios.get(`${API}/movies/latest`);
    return response.data;
  } catch (error) {
    console.error("Latest Movies error:", error.response?.data || error.message);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`${API}/movies/genres`);
    return response.data;
  } catch (error) {
    console.error("Genres error:", error.response?.data || error.message);
    throw error;
  }
};

export const getMoviesByGenre = async (genre) => {
  try {
    const response = await axios.get(`${API}/movies/genre/${genre}`);
    return response.data;
  } catch (error) {
    console.error("Movies by Genre error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateMovieById = async (id, movieData, token) => {
  try {
    const response = await axios.put(`${API}/movies/${id}`, movieData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Update movie error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteMovieById=async(id,token) =>{
    return await axios.delete(`${API}/movies/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
  };
