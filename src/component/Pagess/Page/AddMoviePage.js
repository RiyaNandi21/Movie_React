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
                <label>Title<span className="required">*</span></label>
                <input name="title" value={movie.title} onChange={handleChange} placeholder="Title" required />

                <label>Description<span className="required">*</span></label>
                <textarea name="description" value={movie.description} onChange={handleChange} placeholder="Description" required />

                <label>Genres (comma separated)<span className="required">*</span></label>
                <input name="genre" value={movie.genre.join(",")} onChange={handleGenreChange} placeholder="Genres" required />

                <label>Director<span className="required">*</span></label>
                <input name="director" value={movie.director} onChange={handleChange} placeholder="Director" required />
                
                <h4>Cast<span className="required">*</span></h4>

            {movie.cast.map((c, index) => (
                <div key={index} className="cast-section">
                <label>Actor Name<span className="required">*</span></label>
                <input
                value={c.name}
                onChange={(e) => handleCastChange(index, "name", e.target.value)}
                placeholder="Actor Name"
                required
                />

               <label>Role<span className="required">*</span></label>
               <input
                value={c.role}
                onChange={(e) => handleCastChange(index, "role", e.target.value)}
                placeholder="Role"
                required
                />
              </div>
             ))}
             <button type="button" onClick={addCast}>Add Cast</button>
             <br></br>

                <label>Rating<span className="required">*</span></label>
                <input name="rating" value={movie.rating} onChange={handleChange} placeholder="Rating" type="number" step="0.1" required />

                <label>Duration (min)<span className="required">*</span></label>
                <input name="duration" value={movie.duration} onChange={handleChange} placeholder="Duration (min)" type="number" />

                <label>Release Date<span className="required">*</span></label>
                <input name="releaseDate" value={movie.releaseDate} onChange={handleChange} type="date" required />

                <label>Language<span className="required">*</span></label>
                <input name="language" value={movie.language} onChange={handleChange} placeholder="Language" required />

                <label>Country<span className="required">*</span></label>
                <input name="country" value={movie.country} onChange={handleChange} placeholder="Country" />

                <label>Poster URL<span className="required">*</span></label>
                <input name="posterUrl" value={movie.posterUrl} onChange={handleChange} placeholder="Poster URL" />

                <label>Trailer URL<span className="required">*</span></label>
                <input name="trailerUrl" value={movie.trailerUrl} onChange={handleChange} placeholder="Trailer URL" />

                <label>Budget</label>
                <input name="budget" value={movie.budget} onChange={handleChange} placeholder="Budget" type="number" />

                <label>Box Office</label>
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
                <br></br>
                <label>IMDB ID<span className="required">*</span></label>
                <input name="imdbId" value={movie.imdbId} onChange={handleChange} placeholder="IMDB ID" />

                <label>Status</label>
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
