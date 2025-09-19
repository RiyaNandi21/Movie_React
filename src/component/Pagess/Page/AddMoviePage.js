import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addMovie } from "../../../api/movie";
import "./AddMoviePage.css"; 

export default function AddMoviePage() {
    const [movie, setMovie] = useState({
        title: "",
        description: "",
        genre: [],
        director: "",
        cast: [{ name: "", role: "" }],
        rating: "",
        duration: "",
        releaseDate: "",
        language: "",
        country: "",
        posterUrl: "",
        trailerUrl: "",
        budget: "",
        boxOffice: "",
        awards: [{ name: "", year: "", category: "" }],
        imdbId: "",
        status: "active"
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenreChange = (e) => {
        setMovie((prev) => ({ ...prev, genre: e.target.value.split(",") }));
    };

    const handleCastChange = (index, field, value) => {
        const newCast = [...movie.cast];
        newCast[index][field] = value;
        setMovie((prev) => ({ ...prev, cast: newCast }));
    };

    const handleAwardChange = (index, field, value) => {
        const newAwards = [...movie.awards];
        newAwards[index][field] = value;
        setMovie((prev) => ({ ...prev, awards: newAwards }));
    };

    const addCast = () => {
        setMovie((prev) => ({
            ...prev,
            cast: [...prev.cast, { name: "", role: "" }]
        }));
    };

    const addAward = () => {
        setMovie((prev) => ({
            ...prev,
            awards: [...prev.awards, { name: "", year: "", category: "" }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMovie(movie, token);
            toast.success("Movie added successfully!");
            setMovie({
                title: "",
                description: "",
                genre: [],
                director: "",
                cast: [{ name: "", role: "" }],
                rating: "",
                duration: "",
                releaseDate: "",
                language: "",
                country: "",
                posterUrl: "",
                trailerUrl: "",
                budget: "",
                boxOffice: "",
                awards: [{ name: "", year: "", category: "" }],
                imdbId: "",
                status: "active"
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add movie.");
        }
    };

    return (
        <div className="add-movie-page">
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" value={movie.title} onChange={handleChange} placeholder="Title" required />
                <textarea name="description" value={movie.description} onChange={handleChange} placeholder="Description" required />
                <input name="genre" value={movie.genre.join(",")} onChange={handleGenreChange} placeholder="Genres (comma separated)" />
                <input name="director" value={movie.director} onChange={handleChange} placeholder="Director" />
                
                <h4>Cast</h4>
                {movie.cast.map((c, index) => (
                    <div key={index}>
                        <input value={c.name} onChange={(e) => handleCastChange(index, "name", e.target.value)} placeholder="Actor Name" />
                        <input value={c.role} onChange={(e) => handleCastChange(index, "role", e.target.value)} placeholder="Role" />
                    </div>
                ))}
                <button type="button" onClick={addCast}>Add Cast</button>

                <input name="rating" value={movie.rating} onChange={handleChange} placeholder="Rating" type="number" step="0.1" />
                <input name="duration" value={movie.duration} onChange={handleChange} placeholder="Duration (min)" type="number" />
                <input name="releaseDate" value={movie.releaseDate} onChange={handleChange} type="date" />
                <input name="language" value={movie.language} onChange={handleChange} placeholder="Language" />
                <input name="country" value={movie.country} onChange={handleChange} placeholder="Country" />
                <input name="posterUrl" value={movie.posterUrl} onChange={handleChange} placeholder="Poster URL" />
                <input name="trailerUrl" value={movie.trailerUrl} onChange={handleChange} placeholder="Trailer URL" />
                <input name="budget" value={movie.budget} onChange={handleChange} placeholder="Budget" type="number" />
                <input name="boxOffice" value={movie.boxOffice} onChange={handleChange} placeholder="Box Office" type="number" />
                
                <h4>Awards</h4>
                {movie.awards.map((a, index) => (
                    <div key={index}>
                        <input value={a.name} onChange={(e) => handleAwardChange(index, "name", e.target.value)} placeholder="Award Name" />
                        <input value={a.year} onChange={(e) => handleAwardChange(index, "year", e.target.value)} placeholder="Year" type="number" />
                        <input value={a.category} onChange={(e) => handleAwardChange(index, "category", e.target.value)} placeholder="Category" />
                    </div>
                ))}
                <button type="button" onClick={addAward}>Add Award</button>

                <input name="imdbId" value={movie.imdbId} onChange={handleChange} placeholder="IMDB ID" />
                <select name="status" value={movie.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button className="movie_submit" type="submit">Add Movie</button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
}
