//import "./DashboardPage.css";
import { useNavigate } from "react-router-dom";

export default function Body() {
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      details: "A novel about the American dream and the roaring 1920s.",
      image: "https://m.media-amazon.com/images/I/71FTb9X6wsL.jpg"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      details: "A timeless story of racial injustice and childhood innocence.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDLgWykF_lUlwF4Hu9Q-2S3NDd1gYkiugk1w&s"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      details: "A dystopian novel about surveillance and freedom.",
      image: "https://m.media-amazon.com/images/I/71kXYs4tCvL.jpg"
    },
    {
      id: 4,
      title: "The fault in our stars",
      author: "John Green",
      details: "A romantic classic exploring love and societal expectations.",
      image: "https://m.media-amazon.com/images/I/817tHNcyAgL._UF1000,1000_QL80_.jpg"
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      details: "A romantic classic exploring love and societal expectations.",
      image: "https://m.media-amazon.com/images/I/81Scutrtj4L._UF1000,1000_QL80_.jpg"
    },
    {
      id: 6,
      title: "Geetanjali",
      author: "Rabindranath Tagore",
      details: "A collection of spiritual poems that won him the Nobel Prize.",
      image: "https://m.media-amazon.com/images/I/61lVN6+UjuL._UF894,1000_QL80_.jpg"
    }
  ];

  const handleViewMore = (id) => {
    navigate(`/product?id=${id}`);
  };

  return (
    <main>
      <h1 style={{ textAlign: "center", marginTop: "20px", color: "#335379ff" }}>
        Available Books
      </h1>

      <div className="card-container">
        {books.map((book) => (
          <div className="card" key={book.id}>
            <img src={book.image} alt={book.title} />
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.details}</p>
            <button
              onClick={() => handleViewMore(book.id)}
              style={{
                backgroundColor: "#335379ff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              View More
            </button>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
    </main>
  );
}
