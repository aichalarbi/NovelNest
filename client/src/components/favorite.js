import React from "react";
import { useSelector } from "react-redux";
import BookCard from "./bookcard";

const Favorite = () => {
  const favorites = useSelector((state) => state.favorites);
  console.log(favorites)

  return (
    <div>
      <h1>Favorite Books</h1>
      <div className="row row-cols-md-4">
        {favorites.map((book) => (
          <div className="col mb-4" key={book._id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
