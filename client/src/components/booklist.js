import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./bookcard";
import NavBar from "./navbar";
import BookDetails from "./details";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, get_auth_user } from "../redux/actions";

const BookList = () => {
  
  
  const dispatch = useDispatch()
  const books = useSelector((state)=> state.books)
  
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(()=>{
    setFilteredBooks(books)
  }, [books])
  

  useEffect(()=> {
    dispatch(getBooks())
  }, [])

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
        { books &&
        filteredBooks.map((book) => (
          <div className="col mb-4" key={book._id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
