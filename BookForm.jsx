import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data with string keys to match URL params
const mockBookData = {
  1: {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "Classic novel",
  },
  2: {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "American classic",
  },
};

function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
  });

  // Load book data if editing
  useEffect(() => {
    if (isEdit) {
      const existingBook = mockBookData[id];
      if (existingBook) {
        setBook(existingBook);
      } else {
        alert("Book not found");
        navigate("/books");
      }
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      console.log("Updated Book:", book);
    } else {
      console.log("Created Book:", book);
    }
    navigate("/books");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{isEdit ? "Edit Book" : "Create New Book"}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Title:</label>
          <br />
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Author:</label>
          <br />
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            rows="4"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
