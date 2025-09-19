import { useLocation } from "react-router-dom";
import "./product.css";
// import Header from "../component/Task2/Header";
// import Footer from "../component/Task2/Footer";
import GoToTop from "../component/GoToTop";
import Header from "../component/Pagess/DashBoard/header";
import Footer from "../component/Pagess/DashBoard/Footer";


export default function Product() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

   // const user=JSON.parse(localStorage.getItem("user"));

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      details: "A novel about the American dream and the roaring 1920s.",
      fullDetails: "The Great Gatsby is a 1925 novel by F. Scott Fitzgerald, set in the Jazz Age on Long Island, that tells the story of mysterious millionaire Jay Gatsby and his obsessive pursuit of his lost love, Daisy Buchanan, narrated by his neighbor Nick Carraway.",
      publicationDate: "April 1925"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      details: "A timeless story of racial injustice and childhood innocence.",
      fullDetails: "To Kill a Mockingbird is Harper Lee's 1960 Pulitzer Prize-winning novel about childhood in the fictional Alabama town of Maycomb during the Great Depression. The story follows siblings Scout and Jem Finch as their widowed lawyer father, Atticus, defends a Black man, Tom Robinson, against a false rape accusation. ",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDLgWykF_lUlwF4Hu9Q-2S3NDd1gYkiugk1w&s",
      publicationDate: "July 1960"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      details: "A dystopian novel about surveillance and freedom.",
      fullDetails: "1984 is a dystopian novel set in a totalitarian society where Big Brother watches every move. The story follows Winston Smith, a man who dares to question the oppressive regime that manipulates truth and controls every aspect of life. The novel explores themes of propaganda, surveillance, censorship, and the consequences of absolute power.",
      image: "https://m.media-amazon.com/images/I/71kXYs4tCvL.jpg",
      publicationDate: "June 1949"
    },
    {
      id: 4,
      title: "The Fault in Our Stars",
      author: "John Green",
      details: "A romantic tale about love and facing terminal illness.",
      fullDetails: "This touching novel tells the story of Hazel Grace Lancaster and Augustus Waters, two teenagers who meet at a cancer support group. Despite facing life-threatening illnesses, they form a deep connection and embark on a journey of love, pain, and self-discovery. The novel sensitively handles themes of mortality, illness, and finding joy amidst suffering.",
      image: "https://m.media-amazon.com/images/I/817tHNcyAgL._UF1000,1000_QL80_.jpg",
      publicationDate: "January 2012"
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      details: "A romantic classic exploring love and societal expectations.",
      fullDetails: "Pride and Prejudice is a classic novel set in 19th-century England, centering on Elizabeth Bennet, a witty and independent-minded young woman, and Mr. Fitzwilliam Darcy, a wealthy but aloof gentleman. The story explores themes of social class, marriage, and morality as Elizabeth navigates romantic entanglements, misunderstandings, and the complexities of human pride and prejudice.",
      image: "https://m.media-amazon.com/images/I/81Scutrtj4L._UF1000,1000_QL80_.jpg",
      publicationDate: "January 28, 1813"
    },
    {
      id: 6,
      title: "Geetanjali",
      author: "Rabindranath Tagore",
      details: "A collection of spiritual poems that won him the Nobel Prize.",
      fullDetails: "Geetanjali is a celebrated collection of poems by Nobel laureate Rabindranath Tagore, expressing profound spiritual thoughts, devotion, and reflections on life and nature. The poems explore the human soul's yearning for divine connection, the beauty of existence, and the impermanence of worldly attachments. Written with lyrical grace, Geetanjali captures a blend of mysticism, love, and philosophical insights, making it one of Tagore’s most cherished works.",
      image: "https://m.media-amazon.com/images/I/61lVN6+UjuL._UF894,1000_QL80_.jpg",
      publicationDate: "August 1910"
    }
  ];

  const book = books.find(b => b.id === parseInt(id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <Header user={user}/> */}
      <Header />
      <div style={{flex:1}}>
      <div className="product-container">
        {book ? (
          <div className="product-details">
            <img src={book.image} alt={book.title} />
            <div className="product-info">
              <h2>{book.title}</h2>
              <h3>Author: {book.author}</h3>
              <p>{book.fullDetails}</p>
              <h3>Publication Date: {book.publicationDate}</h3>
              
            </div>
          </div>
        ) : (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>Book not found!</h2>
        )}
      </div>
      </div>
       <GoToTop />
      <Footer /> 
    </div>
  );
}
