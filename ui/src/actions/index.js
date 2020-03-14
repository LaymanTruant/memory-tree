import apis from "../apis/apis";
import {
  FETCH_IMAGE_CARD,
  FETCH_IMAGE_CARDS,
  CREATE_IMAGE_CARD,
  EDIT_IMAGE_CARD,
  DELETE_IMAGE_CARD
} from "./types";
import history from "../history";

export const fetchImageCard = id => async dispatch => {
  const response = await apis.get(`/api/image-cards/${id}`);
  dispatch({ type: FETCH_IMAGE_CARD, payload: response.data });
};

export const fetchImageCards = () => async dispatch => {
  const response = await apis.get("/api/image-cards");
  dispatch({ type: FETCH_IMAGE_CARDS, payload: response.data });
};

export const createImageCard = imageCard => async dispatch => {
  const formData = new FormData();
  formData.append("file", imageCard.image);

  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  const response1 = await apis.post("/api/images/", formData, config);
  imageCard.image = response1.data;
  console.log(imageCard);
  // imageCard.image.id = this.uploadImage(imageCard.image);
  imageCard.firstDayOfWork += "T00:00:00Z";
  imageCard.lastDayOfWork += "T00:00:00Z";
  console.log(imageCard);
  const response2 = await apis.post("/api/image-cards", imageCard);

  dispatch({ type: CREATE_IMAGE_CARD, payload: response2.data });
  history.push("/");
};

export const editImageCard = (id, imageCard, image) => async dispatch => {
  if (image) {
    // imageCard.image.id = uploadImage(image);
  }
  //TODO
  const response = await apis.put(`/api/image-cards/${id}`, {
    ...imageCard,
    createdBy: "default-account"
  });

  dispatch({ type: EDIT_IMAGE_CARD, payload: response.data });
  history.push("/");
};

export const deleteImageCard = id => async dispatch => {
  await apis.delete(`/api/image-cards/${id}`);

  dispatch({ type: DELETE_IMAGE_CARD, payload: id });
  history.push("/");
};

// const uploadImage = image => async dispatch => {
//   const config = {
//     headers: {
//       "content-type": "multipart/form-data"
//     }
//   };
//   const response = await apis.post("/api/images/", image, config);
//   return response.data.id;
// };
