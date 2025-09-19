
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header.js";
// import Body from "./Body.js";
// import Footer from "./Footer.js";

// import GoToTop from "../GoToTop.jsx";
// import Product from "../../pages/product.js";

// export default function DashBoard() {
//   const [user, setUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) {
//       navigate("/signup");
//     } else {
//       setUser(storedUser);
//     }
//   }, [navigate]);

//   return (
//     <div>
//       {user && (
//         <>
//           <Header user={user} setSearchTerm={setSearchTerm} />
//           <Body searchTerm={searchTerm}/>
//           <GoToTop/>
//           <Footer />
//         </>
//       )}
//     </div>
//   );
// }
// export default function Dash(){
//   return(
//     <div> 
//       <Body />
//       <GoToTop />
//     </div>
//   );
// } 

import { useEffect, useState } from "react";
import { getMovies, getTopRatedMovies, getLatestMovies, getMoviesByGenre } from "../../api/movie";
import { useNavigate } from "react-router-dom";
import GoToTop from "../GoToTop";
import "./Dash.css";

export default function DashboardPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [genre, setGenre] = useState("");

  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      let res;

      if (filter === "top-rated") {
        res = await getTopRatedMovies();
      } else if (filter === "latest") {
        res = await getLatestMovies();
      } else if (filter === "genre" && genre) {
        res = await getMoviesByGenre(genre);
      } else {
        res = await getMovies({ search });
      }

      setMovies(res.data || res); 
    } catch (err) {
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filter, genre]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  if (loading) return <p className="loading">Loading movies...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard">
      {/* Search */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Filter Dropdown */}
      <div className="filter-bar">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Movies</option>
          <option value="top-rated">Top Rated</option>
          <option value="latest">Latest</option>
          <option value="genre">By Genre</option>
        </select>

        {filter === "genre" && (
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
          </select>
        )}
      </div>

      {/* Movies Grid */}
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <img
              src={movie.posterUrl || "https://via.placeholder.com/300x450.png?text=No+Image"}
              alt={movie.title}
            />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p className="genre">{movie.genre?.join(", ")}</p>
              <p className="rating">⭐ {movie.rating}</p>

              <button
                className="view-btn"
                onClick={() => navigate(`movies/${movie._id}`)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      <GoToTop />
    </div>
  );
}
