import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ width: "18rem" }}>
        <img src={book.image} className="card-img-top" alt={book.title} />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          {/* <p className="card-text">{book.description}</p> */}
          <Link to={`/book/getBook/${book._id}`} className="btn btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
