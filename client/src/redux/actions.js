import { GET_BOOKS } from "./actiontypes";
import axios from "axios";
import { LOGIN, LOGOUT, REGISTER, GET_AUTH_USER,SET_USER_IMAGE,ADD_TO_FAVORITES , REMOVE_FROM_FAVORITES} from "./actiontypes";



export const addToFavorites = (bookId) => ({
  type: ADD_TO_FAVORITES,
  payload: bookId,
});

export const removeFromFavorites = (bookId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: bookId,
});

export const register = (newUser) => async (dispatch) => {
  try {
    const res = await axios.post("/users/register", newUser);
    dispatch({ type: REGISTER, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/users/login", formData);
    dispatch({ type: LOGIN, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const get_auth_user = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        autorisation: localStorage.getItem("token"),
      },
    };
    const res = await axios.get("/users/isAuth", config);
    dispatch({ type: GET_AUTH_USER, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
export const fetchUserImage = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/uploads/images/${userId}`);
    const imageURL = response.data.imageURL;
    dispatch({ type: SET_USER_IMAGE, payload: imageURL });
  } catch (error) {
    console.error('Error fetching user image:', error);
  }
};

export const getBooks = () => (dispatch) => {
  axios
    .get("/book/getAllBooks")
    .then((res) => dispatch({ type: GET_BOOKS, payload: res.data }))
    .catch((err) => console.error(err));
};
