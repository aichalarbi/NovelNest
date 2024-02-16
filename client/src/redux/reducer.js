import { LOGIN, LOGOUT, REGISTER, GET_AUTH_USER, SET_USER_IMAGE, GET_BOOKS, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./actiontypes";

const initialAuthState = {
  user: null,
  image: null,
  msg: null,
  token: localStorage.getItem("token"),
  books: [],
  favorites: [],
};

const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        msg: action.payload.msg,
        token: action.payload.token,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: null, msg: null };
    case GET_AUTH_USER:
      return { ...state, user: action.payload.user };
    case SET_USER_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    case GET_BOOKS:
      return { ...state, books: action.payload.result };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;

