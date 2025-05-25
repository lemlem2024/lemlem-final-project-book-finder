import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/:id" element={<BookForm />} />
        <Route path="*" element={<Navigate to="/books" />} />
      </Routes>
    </Router>
  );
}

export default App;
