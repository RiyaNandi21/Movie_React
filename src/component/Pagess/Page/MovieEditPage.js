import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, updateMovieById } from "../../../api/movie";
import "./MovieEditPage.css";

export default function MovieEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(id);
        setFormData(res.data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await updateMovieById(id, formData, token);
      alert("Movie updated successfully!");
      navigate(`/dashboard/movies/${id}`); 
    } catch (err) {
      console.error(err);
      alert("Failed to update movie.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-edit">
       <button onClick={() => navigate(-1)} className="back-btn"> Back</button>
      <h1>Edit Movie</h1>
      <label>Title:</label>
      <input
        type="text"
        value={formData.title || ""}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <label>Description:</label>
      <textarea
        value={formData.description || ""}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <label>Genre (comma separated):</label>
      <input
        type="text"
        value={formData.genre?.join(", ") || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            genre: e.target.value.split(",").map((g) => g.trim()),
          })
        }
      />

      <label>Director:</label>
      <input
        type="text"
        value={formData.director || ""}
        onChange={(e) =>
          setFormData({ ...formData, director: e.target.value })
        }
      />

      <label>Cast (name-role; separated by ; ):</label>
      <input
        type="text"
        value={
          formData.cast?.map((c) => `${c.name}-${c.role}`).join("; ") || ""
        }
        onChange={(e) =>
          setFormData({
            ...formData,
            cast: e.target.value.split(";").map((c) => {
              const [name, role] = c.split("-");
              return { name: name?.trim(), role: role?.trim() };
            }),
          })
        }
      />

      <label>Rating:</label>
      <input
        type="number"
        step="0.1"
        value={formData.rating || ""}
        onChange={(e) =>
          setFormData({ ...formData, rating: parseFloat(e.target.value) })
        }
      />

      <label>Release Date:</label>
      <input
        type="date"
        value={formData.releaseDate?.split("T")[0] || ""}
        onChange={(e) =>
          setFormData({ ...formData, releaseDate: e.target.value })
        }
      />

      <label>Language:</label>
      <input
        type="text"
        value={formData.language || ""}
        onChange={(e) =>
          setFormData({ ...formData, language: e.target.value })
        }
      />

      <label>Country:</label>
      <input
        type="text"
        value={formData.country || ""}
        onChange={(e) =>
          setFormData({ ...formData, country: e.target.value })
        }
      />

      <label>Budget:</label>
      <input
        type="number"
        value={formData.budget || ""}
        onChange={(e) =>
          setFormData({ ...formData, budget: parseFloat(e.target.value) })
        }
      />

      <label>Box Office:</label>
      <input
        type="number"
        value={formData.boxOffice || ""}
        onChange={(e) =>
          setFormData({ ...formData, boxOffice: parseFloat(e.target.value) })
        }
      />

      <label>Status:</label>
      <select
        value={formData.status || ""}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <label>Poster URL:</label>
      <input
        type="text"
        value={formData.posterUrl || ""}
        onChange={(e) =>
          setFormData({ ...formData, posterUrl: e.target.value })
        }
      />

      <button onClick={handleUpdate} className="update-btn">
        Update Movie
      </button>
       {/* <button onClick={navigate="/-1"} className="back-btn">
        Back
      </button> */}
    </div>
  );
}
