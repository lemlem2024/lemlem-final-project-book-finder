import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../services/api";

function BookList() {
  const [searchTerm, setSearchTerm] = useState("harry potter"); // Default search
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") return;

      const fetchBooks = async () => {
        setLoading(true);
        const data = await searchBooks(searchTerm);
        setBooks(data);
        setLoading(false);
      };

      fetchBooks();
    }, 500); // Debounce delay: 500ms

    return () => clearTimeout(delayDebounce); // Cleanup
  }, [searchTerm]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Book Finder</h1>

      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />

      <button onClick={() => navigate("/books/new")}>Create New Book</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {books.length === 0 ? (
            <p>No results found.</p>
          ) : (
            books.map((book) => (
              <li key={book.id} style={{ margin: "1rem 0" }}>
                {book.volumeInfo.title}
                <button
                  onClick={() => navigate(`/books/${book.id}`)}
                  style={{ marginLeft: "1rem" }}
                >
                  Edit
                </button>
                <button style={{ marginLeft: "0.5rem" }}>Delete</button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default BookList;
