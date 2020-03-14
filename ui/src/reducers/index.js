import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import imageCardReducer from "./imageCardReducer";

export default combineReducers({
  form: formReducer,
  imageCards: imageCardReducer
});
