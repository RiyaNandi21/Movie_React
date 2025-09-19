
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Body from "./BodyPage";
// import "./DashBoardPage.css";

// import GoToTop from "../../GoToTop";

// export default function DashBoard() {

//   return (
//     <div>
//         <>
//           <Body />
//           <GoToTop />
//         </>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { getMovies } from "../../../api/movie";

export default function DashBoardPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await getMovies({ page: 1, limit: 10 }); 
        setMovies(res.data);
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading movies...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🎬 Movies Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={movie.posterUrl || "https://via.placeholder.com/300x450.png?text=No+Image"}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-600">{movie.genre?.join(", ")}</p>
              <p className="text-sm mt-2 line-clamp-3">{movie.description}</p>
              <p className="text-yellow-600 font-bold mt-2">⭐ {movie.rating}</p>
              <p className="text-xs text-gray-500">Released: {movie.releaseDate?.split("T")[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
