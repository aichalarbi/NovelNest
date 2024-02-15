import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './details.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/book/getBook/${id}`)
      .then((response) => setBook(response.data.book))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <img src={book.image} alt={book.title} />
      <Link to="/">Back to Home</Link>
      
    </div>
  );
};

export default BookDetails;
