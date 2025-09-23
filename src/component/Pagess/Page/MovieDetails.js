import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, deleteMovieById } from "../../../api/movie";
import "./MovieDetails.css";

export default function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(id);
        setMovie(res.data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      const token = localStorage.getItem("token");
      await deleteMovieById(id, token);
      alert("Movie deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete movie!");
    }
  };

  if (loading) return <p className="loading">Loading movie...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p>No movie found.</p>;

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch")) {
      return url.replace("watch?v=", "embed/");
    }
     else if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url;
  };

  return (
    <div className="movie-details">
      {/* <div className="poster-container">
        {playTrailer && movie.trailerUrl ? (
          <iframe
            src={getEmbedUrl(movie.trailerUrl)}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <img
              src={movie.posterUrl || "https://via.placeholder.com/300x450.png?text=No+Image"}
              alt={movie.title}
              className="poster"
            />
            {movie.trailerUrl && (
              <button className="play-btn" onClick={() => setPlayTrailer(true)}>
                ▶
              </button>
            )}
          </>
        )}
      </div> */}

      <div
        className="poster-container"
        onMouseEnter={() => setPlayTrailer(true)}
        onMouseLeave={() => setPlayTrailer(false)}
      >
        {playTrailer && movie.trailerUrl ? (
          <iframe
            src={getEmbedUrl(movie.trailerUrl)}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={movie.posterUrl || "https://via.placeholder.com/300x450.png?text=No+Image"}
            alt={movie.title}
            className="poster"
          />
        )}
      </div>

      <div className="movie-info">
        <button onClick={() => navigate(-1)} className="back-btn">Back</button>
        <h1>{movie.title}</h1>
        <p><strong>Description:</strong> {movie.description}</p>
        <p><strong>Genre:</strong> {movie.genre?.join(", ")}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Cast:</strong> {movie.cast?.map(c => `${c.name} (${c.role})`).join(", ")}</p>
        <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
        <p><strong>Release Date:</strong> {movie.releaseDate?.split("T")[0]}</p>
        <p><strong>Language:</strong> {movie.language}</p>
        <p><strong>Country:</strong> {movie.country}</p>
        <p><strong>Budget:</strong> ${movie.budget}</p>
        <p><strong>Box Office:</strong> ${movie.boxOffice}</p>
        <p><strong>Status:</strong> {movie.status}</p>
        <div className="movie-actions">
          <button onClick={() => navigate(`/movies/${movie._id}/edit`)} className="edit-btn">Edit Movie</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}
