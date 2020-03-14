import _ from "lodash";
import {
  FETCH_IMAGE_CARD,
  FETCH_IMAGE_CARDS,
  CREATE_IMAGE_CARD,
  EDIT_IMAGE_CARD,
  DELETE_IMAGE_CARD
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_IMAGE_CARD:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_IMAGE_CARDS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case CREATE_IMAGE_CARD:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_IMAGE_CARD:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_IMAGE_CARD:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
