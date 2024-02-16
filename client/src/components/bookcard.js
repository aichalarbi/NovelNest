import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/actions";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((favorite) => favorite._id === book._id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(book._id));
    } else {
      dispatch(addToFavorites(book));
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ width: "18rem" }}>
        <img src={book.image} className="card-img-top" alt={book.title} />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <Link to={`/book/getBook/${book._id}`} className="btn btn-primary">
            Details
          </Link>
          <button onClick={handleToggleFavorite} className="btn btn-primary">
            {isFavorite ? "Remove From Favorites" : "Add To Favorites"}
          </button>
          <Link to={`/book/updateBook/${book._id}`} className="btn btn-primary">
            Edit Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToFavorites, removeFromFavorites } from "../redux/actions";

// const BookCard = ({ book }) => {
//   const dispatch = useDispatch();
//   const favorites = useSelector(state => state.favorites);

//   const isFavorite = favorites.includes(book._id);

//   const handleAddToFavorites = () => {
//     dispatch(addToFavorites(book._id));
//   };

//   const handleRemoveFromFavorites = () => {
//     dispatch(removeFromFavorites(book._id));
//   };

//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card" style={{ width: "18rem" }}>
//         <img src={book.image} className="card-img-top" alt={book.title} />
//         <div className="card-body">
//           <h5 className="card-title">{book.title}</h5>
//           <Link to={`/book/getBook/${book._id}`} className="btn btn-primary">
//             Details
//           </Link>
//           {isFavorite ? (
//             <button onClick={handleRemoveFromFavorites} className="btn btn-danger">
//               Remove From Favorites
//             </button>
//           ) : (
//             <button onClick={handleAddToFavorites} className="btn btn-primary">
//               Add To Favorites
//             </button>
//           )}
//           <Link to={`/`} className="btn btn-primary">
//             Edit Book Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;


