import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./bookcard";
import NavBar from "./navbar";
import BookDetails from "./details";
import { Route, Routes } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/book/getAllBooks")
      .then((response) => {
        console.log(response.data.result);
        if (response.data) {
          setBooks(response.data.result);
          setFilteredBooks(response.data.result);
        } else {
          console.error(
            "Books array not found in response data:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleFilter = (title) => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      <NavBar handleFilter={handleFilter} />
      <Routes>
        <Route
          path="/book/getBook/:id"
          element={<BookDetails initialBooks={books} />}
        />
      </Routes>
      <div className="row row-cols-md-4">
        {filteredBooks.map((book) => (
          <div className="col mb-4" key={book._id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
