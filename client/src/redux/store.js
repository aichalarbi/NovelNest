import { createStore, applyMiddleware } from "redux";
import booksReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

const middleware = [thunk];

const store = createStore(
  booksReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
